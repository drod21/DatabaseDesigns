import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Header from './header';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
    }
  }

  handleChange = (e) => {
    this.setState({ searchInput: e.target.value })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter')
      this.handleSearch();
  }

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
              <TableCell style={{ textAlign: 'center', padding: 0 }}>Department</TableCell>
              <TableCell style={{ textAlign: 'center', padding: 0 }}>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(!this.props.items.isLoading) && this.props.items.map((item, index) =>
              <TableRow style={{ height: 25 }} key={index}>
                <TableCell style={{ textAlign: 'center', padding: 0 }}>{(item.item_name) ? item.item_name : '-'}</TableCell>
                <TableCell style={{ textAlign: 'center', padding: 0 }}>{(item.description) ? item.description : '-'}</TableCell>
                <TableCell numeric style={{ textAlign: 'center', padding: 0 }}>{(item.SoldIn.department_dept_id) ? deptMap[item.SoldIn.department_dept_id] : '-'}</TableCell>
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
  }
}

SearchResults.contextTypes = {
  router: PropTypes.object.isRequired
}


function mapStateToProps(state) {
  return {
    items: state.items
  }
}

export default connect(mapStateToProps)(SearchResults)
