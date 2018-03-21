import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import { getItems } from '../actions/items';
import Header from './header';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
    }
    this.props.getItems()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps !== this.props)
      this.props.getItems()
  }

  handleChange = (e) => {
    this.setState({ searchInput: e.target.value })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter')
      this.handleSearch();
  }

  render() {
    const { icon, text, home, ItemAttribute, Submit } = styles
    const deptMap = { 23: 'Electronics', 26: 'Home Goods', 21: 'Video Games', 25: 'Movies' }
    return (
      <div className='home-container' style={home}>
        <Header />
        <div className='iteminputtop' style = {ItemAttribute}>
        <TextField
          id = "ItemName"
          label = "Name"
          value = {this.state.ItemName}
          onChange = {this.handleChangeText}
          margin = "normal" />
        <TextField 
          id = "ItemId"
          label = "Id"
          value = {this.state.ItemId}
          onChange = {this.handleChangeText}
          margine = "normal" />
        <TextField 
          id = "DeptId"
          label = "DId"
          value = {this.state.DeptId}
          onChange = {this.handleChangeText}
          margine = "normal" />
        <TextField 
          id = "Type"
          label = "Type"
          value = {this.state.Type}
          onChange = {this.handleChangeText}
          margine = "normal" />
        </div>
        <div className='iteminputbottom' style = {ItemAttribute}>
        <TextField 
          id = "publicP"
          label = "PricePublic"
          value = {this.state.publicP}
          onChange = {this.handleChangeText}
          margine = "normal" />
        <TextField 
          id = "privateP"
          label = "PricePrivate"
          value = {this.state.privateP}
          onChange = {this.handleChangeText}
          margine = "normal" />
        <TextField 
          id = "Desc"
          label = "Description"
          value = {this.state.Desc}
          onChange = {this.handleChangeText}
          margine = "normal" />

        </div>
        <div className = 'submitbutton' style={Submit}>
          <Button color="contrast" onClick = {this.handleSubmit}> Submit </Button>
        </div>
        <Table>
          <TableHead>
            <TableRow style={{ height: 25 }}>
              <TableCell style={{ textAlign: 'center', padding: 0 }}>Item Name</TableCell>
              <TableCell style={{ textAlign: 'center', padding: 0 }}>Description</TableCell>
              <TableCell style={{ textAlign: 'center', padding: 0 }}>Department</TableCell>
              <TableCell style={{ textAlign: 'center', padding: 0 }}>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(!this.props.items.isLoading) && this.props.items.map((item, index) =>
              <TableRow style={{ height: 25 }} key={index}>
                <TableCell style={{ textAlign: 'center', padding: 0 }}>{(item.item_name) ? item.item_name : '-'}</TableCell>
                <TableCell style={{ textAlign: 'center', padding: 0 }}>{(item.description) ? item.description : '-'}</TableCell>
                <TableCell numeric style={{ textAlign: 'center', padding: 0 }}>{(item.dept_id) ? deptMap[item.dept_id] : '-'}</TableCell>
                <TableCell numeric style={{ textAlign: 'center', padding: 0 }}>{(item.price_public) ? '$' + item.price_public : '$-'}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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
  },
  ItemAttribute: {
    background: 'white',
    color: 'black'
  },
  Submit: {
    color: 'black'
  }
  
}

Items.contextTypes = {
  router: PropTypes.object.isRequired
}


function mapStateToProps(state) {
  console.log(state)
  return {
    items: state.items
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getItems }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Items)
