import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { searchByKey, searchByRange } from '../actions/items';

import Header from './header'

class Home extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      searchKey: '',
      searchOp: '',
    }
  }
  handleTextChange = (e) => {
    this.setState({ searchInput: e.target.value })
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter')
      this.handleSearch();
  }

  handleSearch = () => {
    if(this.state.searchOp) {
      this.props.searchByRange(this.state.searchKey, this.state.searchInput, this.state.searchOp).then(() => {
        this.context.router.history.push('/results')
      }).catch((err) => alert('error finding items:: ' + err))
    } else {
      this.props.searchByKey(this.state.searchKey, this.state.searchInput).then(() => {
        this.context.router.history.push('/results')
      }).catch((err) => alert('error finding items:: ' + err))
    }
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  }

  render() {
    const { icon, text, home, searchSelects } = styles
    return(
      <div className='home-container' style={home}>
        <Header/>
        <div className='search-bar'>
          <Select
            native
            value={this.state.searchKey}
            style={searchSelects}
            onChange={this.handleChange('searchKey')}
            inputProps={{
              id: 'Search Selector',
            }}
          >
            <option value="">Search for..</option>
            <option value={'department_dept_id'}>Dept</option>
            <option value={'price_public'}>Price</option>
            <option value={'type'}>Type</option>
            <option value={'item_name'}>Name</option>
          </Select>
          <Select
            native
            value={this.state.searchOp}
            style={searchSelects}
            onChange={this.handleChange('searchOp')}
            inputProps={{
              id: 'Range Selector',
            }}
          >
            <option value="">That is..(optional)</option>
            <option value={'eq'}>Equal to</option>
            <option value={'lte'}>Less than</option>
            <option value={'gte'}>Greater than</option>
          </Select>
          <TextField className='user-search-field'
            name='searchInput'
            value={this.state.searchInput}
            placeholder='Search for items...'
            onChange={this.handleTextChange}
            onKeyPress={this.handleKeyPress}
            InputProps={{
              disableUnderline: true
            }}
            style={text}
          />
          <IconButton onClick={this.handleSearch}>
            <Icon className='material-icons' style={icon}>search</Icon>
          </IconButton>
        </div>
        
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
  searchSelects: {
    margin: '0 10px'
  }
}

Home.contextTypes = {
  router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    items: state.items
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchByKey, searchByRange }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
