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
import { getAllEmployees } from '../actions/employees'
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
      checked: [],
      disableCheckboxes: false,
      index: '',
      empRole: '',
      currentTab: 'change_items'
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
    this.setState({ currentTab: value })
  }

  handleDelete = () => {
    this.props.removeItem(this.state.item_id)
    this.resetState()
  }

  handlePress = (e) => {
    this.setState({ addNewItem: !this.state.addNewItem })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
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
      this.props.editItem(item, this.state.index)

    this.resetState()
  }

  resetState = () => {
    this.setState({
      item_name: '',
      item_id: getRandomInt(927),
      dept: '',
      type: '',
      description: '',
      price_public: '',
      price_private: '',
      addNewItem: false,
      checked: [],
      disableCheckboxes: false,
      index: ''
    })
  }

  renderEmployeesTable = () => {
    const { icon, text, home } = styles
    const deptMap = { 23: 'Electronics', 26: 'Home Goods', 21: 'Video Games', 25: 'Movies' }
    const managerMap = { 0: 'Head Hancho', 1: 'Josh Circuit', 2: 'Steven Spielberg', 3: 'Cola MacCrumb', 4: 'Robert Albrechtsson' }
    
    return (
      <TabContainer>
        <Table>
          <TableHead>
            <TableRow style={{ height: 25 }}>
              <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>Select Employee</TableCell>
              <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>Employee Name</TableCell>
              <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>Employee Email</TableCell>
              <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>Department</TableCell>
              <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>Manager</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.employees.map((employee, index) =>
              <TableRow style={{ height: 25 }} key={index}>
                <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>
                  <Checkbox
                    checked={this.state.checked[index]}
                    onChange={this.handleCheck(index)}
                    value={false}
                    disabled={this.state.disableCheckboxes}
                  />
                </TableCell>
                <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>{(employee.emp_name) ? employee.emp_name : '-'}</TableCell>
                <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>{(employee.email) ? employee.email : '-'}</TableCell>
                <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>{(employee.WorksIns) ? deptMap[employee.WorksIns[0].department_dept_id] : '-'}</TableCell>
                <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>{(employee.Manage) ? managerMap[employee.Manage.manager_mid] : '-'}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div style={{ display: 'flex', flexFlow: 'row' }}>
          <Button className='remove-item-button' id='removeEmployee' disabled={(this.state.disableCheckboxes) ? false : true} onClick={this.handleDelete}>
            Remove Item
            </Button>
          <Button className='add-new-item-button' id='addNewEmployee' value={(this.state.addNewEmployee) ? false : true} onClick={this.handlePress}>
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
            
            <Button className='submit-new-item-button' onClick={this.handleSubmit}>
              Submit
            </Button>
          </div>)
        }
      </TabContainer>
    )
  }


  renderItemsTable = () => {
    const { icon, text, home } = styles
    const deptMap = { 23: 'Electronics', 26: 'Home Goods', 21: 'Video Games', 25: 'Movies' }
    return (
      <TabContainer>
        <Table>
          <TableHead>
            <TableRow style={{ height: 25 }}>
              <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>Select Item</TableCell>
              <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>Item Name</TableCell>
              <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>Description</TableCell>
              <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>Type</TableCell>
              <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>Department</TableCell>
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
                <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>{(item.item_name) ? item.item_name : '-'}</TableCell>
                <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>{(item.description) ? item.description : '-'}</TableCell>
                <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>{(item.type) ? item.type : '-'}</TableCell>
                <TableCell numeric style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>{(item.SoldIn) ? deptMap[item.SoldIn.department_dept_id] : '-'}</TableCell>
                <TableCell numeric style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>{(item.price_public) ? '$' + item.price_public : '$-'}</TableCell>
                <TableCell numeric style={{ textAlign: 'center', padding: '0 5px', margin: '0 10px' }}>{(item.price_private) ? '$' + item.price_private : '$-'}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div style={{ display: 'flex', flexFlow: 'row' }}>
          <Button className='remove-item-button' id='removeItem' disabled={(this.state.disableCheckboxes) ? false : true} onClick={this.handleDelete}>
            Remove Item
            </Button>
          <Button className='add-new-item-button' id='addNewItem' value={(this.state.addNewItem) ? false : true} onClick={this.handlePress}>
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
            <Button className='submit-new-item-button' onClick={this.handleSubmit}>
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
        <Tabs value={this.state.currentTab} onChange={this.handleChangeTab}>
          <Tab label='Items' value='change_items' />
          {(this.state.empRole === 'manager')  && <Tab label='Employees' value='change_employees' />}
        </Tabs>
        {this.state.currentTab === 'change_items' && this.renderItemsTable()}
        {this.state.currentTab === 'change_employees' && this.renderEmployeesTable()}
        
      </div>
    );
  }
}

const styles = {
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
  return bindActionCreators({ addItem, getItems, editItem, removeItem, getAllEmployees }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)