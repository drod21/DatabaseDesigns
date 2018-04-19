// React Imports
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import React, { Component, PureComponent } from 'react';

// Material UI Imports
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import Select from 'material-ui/Select';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Tabs, { Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

// Local
import { addItem, getItems, editItem, removeItem } from '../actions/items'
import { getAllEmployees, addEmployee, editEmployee, removeEmployee } from '../actions/employees'
import decoder from 'jwt-decode'
import Header from './header'

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

function TabContainer(props) {
  return (
    <Typography component="div" style={{ margin: 10 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class Dashboard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      item_name: '',
      item_id: getRandomInt(927),
      dept: '',
      type: '',
      description: '',
      price_public: '',
      price_private: '',
      addNewItem: false,
      addNewEmployee: false,
      checked: [],
      empChecked: [],
      disableCheckboxes: false,
      disableEmpCheckboxes: false,
      index: '',
      empRole: '',
      currentTab: 'change_items',
      eid: '',
      active: 1,
      email: '',
      emp_name: '',
      emp_pw: ''
    }
    this.props.getItems()
    this.props.getAllEmployees()
  }

  componentDidMount() {
    const jwt = window.localStorage.getItem('jwt')
    if(jwt) {
      this.setState({ empRole: decoder(jwt).role })
    } else {
      this.context.router.history.push('/login');
    }
  }
  
  handleChangeTab = (event, value) => {
    this.resetState(value);
  }

  handleDelete = () => {
    this.props.removeItem(this.state.item_id)
    this.resetState()
  }

  handleEmpDelete = () => {
    this.props.removeEmployee(this.state.eid)
    this.resetState()
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleEmpAdd = () => {
    this.setState({ addNewEmployee: !this.state.addNewEmployee })
  }

  handleAddItem = () => {
    this.setState({ addNewItem: !this.state.addNewItem })
  }

  handleEmpCheck = (name) => (event) => {
    const checked = this.state.empChecked
    const index = name
    const emp = this.props.employees[index]
    const dept = emp.WorksIns[0].department_dept_id
    const deptMap = { 23: 'Electronics', 26: 'Home Goods', 21: 'Video Games', 25: 'Movies' }
    checked[index] = event.target.checked
    this.setState({
      empChecked: checked,
      disableEmpCheckboxes: event.target.checked,
      emp_name: emp.emp_name,
      eid: emp.eid,
      dept: deptMap[dept],
      email: emp.email,
      active: emp.active,
      index: index
    })
  }

  handleCheck = (name) => (event) => {
    const checked = this.state.checked
    const index = name
    const item = this.props.items[index]
    const dept = item.SoldIn.department_dept_id
    const deptMap = { 23: 'Electronics', 26: 'Home Goods', 21: 'Video Games', 25: 'Movies' }
    checked[index] = event.target.checked
    
    this.setState({ 
      checked: checked, 
      disableCheckboxes: true,
      item_name: item.item_name,
      item_id: item.item_id,
      dept: deptMap[dept],
      type: item.type,
      description: item.description,
      price_public: item.price_public,
      price_private: item.price_private,
      index: index
     })
  }

  handleEmployeeSubmit = () => {
    const { eid, emp_name, dept, email, emp_pw, addNewEmployee, active } = this.state
    const deptMap = { 'electronics': 23, 'home goods': 26, 'video games': 21, 'movies': 25 }
    const utcDate = new Date()
    const date = new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate())
    const employee = {
      emp_name,
      email,
      emp_pw,
      created_at: date,
      updated_at: date,
      eid: eid,
      active,
      dept: deptMap[dept.toLowerCase()]
    }

    if(addNewEmployee)
      this.props.addEmployee(employee)
    else
      this.props.editEmployee(employee)
    window.location.reload()
  }

  handleSubmit = () => {
    const { item_name, dept, type, description, disableCheckboxes, addNewItem, item_id } = this.state
    const deptMap = { 'electronics': 23, 'home goods': 26, 'video games': 21, 'movies': 25 }
    const utcDate = new Date()
    const date = new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate())
    const dept_id = deptMap[dept.toLowerCase()]
    const price_private = Number(this.state.price_private)
    const price_public = Number(this.state.price_public)
    const item = {
      item_id,
      item_name,
      type,
      dept_id,
      description,
      price_public,
      price_private,
      created_at: date,
      updated_at: date
    }

    if(addNewItem)
      this.props.addItem(item)
    else
      this.props.editItem(item)

    window.location.reload()
  }

  resetState = async (tab) => {
    const checked = this.state.checked
    const empChecked = this.state.empChecked

    if(empChecked[this.state.index])
      empChecked.splice(0, empChecked.length)

    if(checked[this.state.index])
      checked.splice(0, checked.length)

    await this.setState({
      item_name: '',
      item_id: getRandomInt(927),
      dept: '',
      type: '',
      description: '',
      price_public: '',
      price_private: '',
      addNewItem: false,
      currentTab: tab,
      addNewEmployee: false,
      checked: checked,
      empChecked: empChecked,
      disableCheckboxes: false,
      disableEmpCheckboxes: false,
      index: '',
      eid: '',
      email: '',
      emp_name: '',
      emp_pw: ''
    })
  }

  renderEmployeesTable = () => {
    const { icon, text, home, button } = styles
    const deptMap = { 23: 'Electronics', 26: 'Home Goods', 21: 'Video Games', 25: 'Movies' }
    const managerMap = { 0: 'Head Hancho', 1: 'Josh Circuit', 2: 'Steven Spielberg', 3: 'Cola MacCrumb', 4: 'Robert Albrechtsson' }
    
    return (
      <TabContainer>
        <Table>
          <TableHead>
            <TableRow style={{ height: 25 }}>
              <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>Select Employee</TableCell>
              <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>Department</TableCell>
              <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>Employee ID</TableCell>
              <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>Employee Name</TableCell>
              <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>Employee Email</TableCell>
              <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>Manager</TableCell>
              <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.employees.map((employee, index) =>
              <TableRow style={{ height: 25 }} key={index}>
                <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>
                  <Checkbox
                    checked={this.state.empChecked[index]}
                    onChange={this.handleEmpCheck(index)}
                    value={false}
                    name={'empCheck'}
                    disabled={this.state.disableEmpCheckboxes}
                  />
                </TableCell>
                <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>{(employee.WorksIns) ? deptMap[employee.WorksIns[0].department_dept_id] : '-'}</TableCell>
                <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>{(employee.eid >= 0) ? employee.eid : '-'}</TableCell>
                <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>{(employee.emp_name) ? employee.emp_name : '-'}</TableCell>
                <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>{(employee.email) ? employee.email : '-'}</TableCell>
                <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>{(employee.Manage) ? managerMap[employee.Manage.manager_mid] : '-'}</TableCell>
              <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>{(employee.active) ? employee.active : '-'}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div style={{ display: 'flex', flexFlow: 'row' }}>
          <Button className='remove-item-button' id='removeEmployee' style={button} disabled={(this.state.disableEmpCheckboxes) ? false : true} onClick={this.handleEmpDelete}>
            Deactivate Employee
            </Button>
          <Button className='add-new-item-button' style={button} id='addNewEmployee' name='addNewEmployee' value={(this.state.addNewEmployee) ? false : true} onClick={this.handleEmpAdd}>
            {(this.state.disableCheckboxes) ? 'Update Employee ' : 'Add New Employee'}
          </Button>
        </div>
        {(this.state.addNewEmployee || this.state.disableEmpCheckboxes) &&
          (<div>
            <TextField className='add-field'
              name='eid'
              value={this.state.eid}
              placeholder='Employee ID'
              onChange={this.handleChange}
              InputProps={{
                disableUnderline: true
              }}
              style={text}
            />
            <TextField className='add-field'
              name='emp_name'
              value={this.state.emp_name}
              placeholder='Employee Name'
              onChange={this.handleChange}
              InputProps={{
                disableUnderline: true
              }}
              style={text}
            />
            <TextField className='add-field'
              name='email'
              value={this.state.email}
              placeholder='Employee Email'
              onChange={this.handleChange}
              InputProps={{
                disableUnderline: true
              }}
              style={text}
            />
            <TextField className='add-field'
              name='emp_pw'
              value={this.state.emp_pw}
              placeholder='Employee Password'
              onChange={this.handleChange}
              InputProps={{
                disableUnderline: true
              }}
              style={text}
            />
            <TextField className='add-field'
              name='dept'
              value={this.state.dept}
              placeholder='Department'
              onChange={this.handleChange}
              InputProps={{
                disableUnderline: true
              }}
              style={text}
            />
            
            <Button className='submit-new-item-button' style={button} onClick={this.handleEmployeeSubmit}>
              Submit
            </Button>
          </div>)
        }
      </TabContainer>
    )
  }


  renderItemsTable = () => {
    const { icon, text, home, button } = styles
    const deptMap = { 23: 'Electronics', 26: 'Home Goods', 21: 'Video Games', 25: 'Movies' }
    return (
      <TabContainer>
        <Table>
          <TableHead>
            <TableRow style={{ height: 25 }}>
              <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>Select Item</TableCell>
              <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>Department</TableCell>
              <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>Item Name</TableCell>
              <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>Description</TableCell>
              <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>Type</TableCell>
              <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>Public Price</TableCell>
              <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>Sale Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.items.map((item, index) =>
              <TableRow style={{ height: 25 }} key={index}>
                <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>
                  <Checkbox
                    checked={this.state.checked[index]}
                    onChange={this.handleCheck(index)}
                    value={false}
                    disabled={this.state.disableCheckboxes}
                  />
                </TableCell>
                <TableCell numeric style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>{(item.SoldIn) ? deptMap[item.SoldIn.department_dept_id] : '-'}</TableCell>
                <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>{(item.item_name) ? item.item_name : '-'}</TableCell>
                <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>{(item.description) ? item.description : '-'}</TableCell>
                <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>{(item.type) ? item.type : '-'}</TableCell>
                <TableCell numeric style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>{(item.price_public) ? '$' + item.price_public : '$-'}</TableCell>
                <TableCell numeric style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>{(item.price_private) ? '$' + item.price_private : '$-'}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div style={{ display: 'flex', flexFlow: 'row' }}>
          <Button className='remove-item-button' id='removeItem' style={button} disabled={(this.state.disableCheckboxes) ? false : true} onClick={this.handleDelete}>
            Remove Item
            </Button>
          <Button className='add-new-item-button' id='addNewItem' value={(this.state.addNewItem) ? false : true} style={button} onClick={this.handleAddItem}>
            {(this.state.disableCheckboxes) ? 'Update Item ' : 'Add New Item'}
          </Button>
        </div>
        {(this.state.addNewItem || this.state.disableCheckboxes) &&
          (<div>
            <TextField className='add-field'
              name='item_name'
              value={this.state.item_name}
              placeholder='Item Name'
              onChange={this.handleChange}
              InputProps={{
                disableUnderline: true
              }}
              style={text}
            />
            <TextField className='add-field'
              name='dept'
              value={this.state.dept}
              placeholder='Department'
              onChange={this.handleChange}
              InputProps={{
                disableUnderline: true
              }}
              style={text}
            />
            <TextField className='add-field'
              name='type'
              value={this.state.type}
              placeholder='Type'
              onChange={this.handleChange}
              InputProps={{
                disableUnderline: true
              }}
              style={text}
            />
            <TextField className='add-field'
              name='description'
              value={this.state.description}
              placeholder='Description'
              onChange={this.handleChange}
              InputProps={{
                disableUnderline: true
              }}
              style={text}
            />
            <TextField className='add-field'
              name='price_public'
              value={this.state.price_public}
              placeholder='Price'
              onChange={this.handleChange}
              InputProps={{
                disableUnderline: true
              }}
              style={text}
            />
            <TextField className='add-field'
              name='price_private'
              value={this.state.price_private}
              placeholder='Sale Price'
              onChange={this.handleChange}
              InputProps={{
                disableUnderline: true
              }}
              style={text}
            />
            <Button className='submit-new-item-button' onClick={this.handleSubmit} style={button}>
              Submit
            </Button>
          </div>)
        }
      </TabContainer>
    )
  }

render() {
  const { icon, text, home } = styles
  const deptMap = { 23: 'Electronics', 26: 'Home Goods', 21: 'Video Games', 25: 'Movies' }
    return (
      <div className='home-container' style={home}>
        <Header />
        <Tabs value={this.state.currentTab} onChange={this.handleChangeTab} indicatorColor='#68a5c9'>
          <Tab label='Items' value='change_items' />
          {(this.state.empRole === 'manager' || this.state.empRole === 'CEO')  && <Tab label='Employees' value='change_employees' />}
        </Tabs>
        {this.state.currentTab === 'change_items' && this.renderItemsTable()}
        {this.state.currentTab === 'change_employees' && this.renderEmployeesTable()}
        
      </div>
    );
  }
}

const styles = {
  button: {
    border: '1px solid grey',
    cursor: 'pointer',
    color: '#68a5c9',
    margin: '25px',
    padding: '5px 10px',
    textDecoration: 'none'
  },
  icon: { color: 'black' },
  home: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column'
  },
  text: {
    background: 'white',
    borderRadius: '3px',
    color: 'white',
    margin: '0px 10px',
    padding: '3px 10px',
    width: '300px'
  }
}

Dashboard.contextTypes = {
  router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    items: state.items,
    employees: state.employees
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    addEmployee,
    addItem,
    editEmployee,
    editItem,
    getAllEmployees,
    getItems,
    removeEmployee,
    removeItem
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)