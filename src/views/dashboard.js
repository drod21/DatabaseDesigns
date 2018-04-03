import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { addItem, getItems, } from '../actions/items'
import Header from './header'
/*
item = { 
    id,
    item_name,
    dept_id,
    type,
    description,
    price_public,
    price_private,
    created_at,
    updated_at
}
*/

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

class Dashboard extends Component {
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
    }
    this.props.getItems()
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
    const dept = item.SoldIns[0].department_dept_id
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
      price_private: item.price_private
     })
  }

  handleSubmit = () => {
    const { item_name, dept, type, description, price_public, price_private, disableCheckboxes, addNewItem, item_id } = this.state
    const deptMap = { 'Electronics': 23, 'Home Goods': 26, 'Video Games': 21, 'Movies': 25 }
    const utcDate = new Date()
    const date = new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate())
    const dept_id = deptMap[dept]
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
    })
    
    if(addNewItem) {
      this.props.addItem(item)
      return
    } 
    
    this.props.editItem(item)
    
    
  }

  // componentWillReceiveProps(nextProps) {
  //   if(nextProps !== this.props)
  //     this.props.getItems()
  // }

render() {
  const { icon, text, home } = styles
  const deptMap = { 23: 'Electronics', 26: 'Home Goods', 21: 'Video Games', 25: 'Movies' }
    return (
      <div className='home-container' style={home}>
        <Header />
        <Table>
          <TableHead>
            <TableRow style={{ height: 25 }}>
              <TableCell style={{ textAlign: 'center', padding: 0 }}>Item Name</TableCell>
              <TableCell style={{ textAlign: 'center', padding: 0 }}>Description</TableCell>
              <TableCell style={{ textAlign: 'center', padding: 0 }}>Type</TableCell>
              <TableCell style={{ textAlign: 'center', padding: 0 }}>Department</TableCell>
              <TableCell style={{ textAlign: 'center', padding: 0 }}>Public Price</TableCell>
              <TableCell style={{ textAlign: 'center', padding: 0 }}>Sale Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(!this.props.items.isLoading) && this.props.items.map((item, index) =>
              <TableRow style={{ height: 25 }} key={index}>
                <TableCell style={{ textAlign: 'center', padding: 0 }}>
                  <Checkbox
                    checked={this.state.checked[index]}
                    onChange={this.handleCheck(index)}
                    value={false}
                    disabled={this.state.disableCheckboxes}
                  />
                </TableCell>
                <TableCell style={{ textAlign: 'center', padding: 0 }}>{(item.item_name) ? item.item_name : '-'}</TableCell>
                <TableCell style={{ textAlign: 'center', padding: 0 }}>{(item.description) ? item.description : '-'}</TableCell>
                <TableCell style={{ textAlign: 'center', padding: 0 }}>{(item.type) ? item.type : '-'}</TableCell>
                <TableCell numeric style={{ textAlign: 'center', padding: 0 }}>{(item.SoldIns[0].department_dept_id) ? deptMap[item.SoldIns[0].department_dept_id] : '-'}</TableCell>
                <TableCell numeric style={{ textAlign: 'center', padding: 0 }}>{(item.price_public) ? '$' + item.price_public.toFixed(2) : '$-'}</TableCell>
                <TableCell numeric style={{ textAlign: 'center', padding: 0 }}>{(item.price_private) ? '$' + item.price_private.toFixed(2) : '$-'}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Button className='add-new-item-button' id='addNewItem' value={(this.state.addNewItem) ? false : true} onClick={this.handlePress}>
          {(this.state.disableCheckboxes) ? 'Update Item ': 'Add New Item' }
        </Button>

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

function mapStateToProps(state) {
  return {
    items: state.items
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addItem, getItems, }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)