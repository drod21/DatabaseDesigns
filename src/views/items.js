import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { getItems } from '../actions/items';
import Header from './header';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

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
class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
    }
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
    const { icon, text, home } = styles
    const deptMap = { 23: 'Electronics', 26: 'Home Goods', 21: 'Video Games', 25: 'Movies' }
    return (
      <div className='home-container' style={home}>
        <Header />
        <TabContainer>
          <Table>
            <TableHead>
              <TableRow style={{ height: 25 }}>
                <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '10px' }}>Department</TableCell>
                <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '10px' }}>Item Name</TableCell>
                <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '10px' }}>Description</TableCell>
                <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '10px' }}>Type</TableCell>
                <TableCell style={{ textAlign: 'center', padding: '0 5px', margin: '10px' }}>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(!this.props.items.isLoading) && this.props.items.map((item, index) =>
                <TableRow style={{ height: 25 }} key={index}>
                  <TableCell numeric style={{ textAlign: 'center', padding: '10px 5px', margin: '10px' }}>{(item.SoldIn) ? deptMap[item.SoldIn.department_dept_id] : '-'}</TableCell>
                  <TableCell style={{ textAlign: 'center', padding: '10px 5px', margin: '10px' }}>{(item.item_name) ? item.item_name : '-'}</TableCell>
                  <TableCell style={{ textAlign: 'center', padding: '10px 5px', margin: '10px' }}>{(item.description) ? item.description : '-'}</TableCell>
                  <TableCell style={{ textAlign: 'center', padding: '10px 5px', margin: '10px' }}>{(item.type) ? item.type : '-'}</TableCell>
                  <TableCell numeric style={{ textAlign: 'center', padding: '10px 5px', margin: '10px' }}>{(item.price_public) ? '$' + item.price_public : '$-'}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabContainer>
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

Items.contextTypes = {
  router: PropTypes.object.isRequired
}


function mapStateToProps(state) {
  return {
    items: state.items
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getItems }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Items)
