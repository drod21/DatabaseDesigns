import React, { Component } from 'react';
import PropTypes from 'prop-types'

import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

import Header from './header'


class Home extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: ''
    }
  }
  handleChange = (e) => {
    this.setState({ searchInput: e.target.value })
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter')
      this.handleSearch();
  }

  render() {
    const { icon, text, home } = styles
    return(
      <div className='home-container' style={home}>
        <Header/>
        <div className='search-bar'>
          <IconButton onClick={this.handleSearch}>
            <Icon className='material-icons' style={icon}>search</Icon>
          </IconButton>
          <TextField className='user-email-field'
            name='searchInput'
            value={this.state.searchInput}
            placeholder='Search for items...'
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            InputProps={{
              disableUnderline: true
            }}
            style={text}
          />
          <Button color="contrast" onClick={this.handleSearch}>Search</Button>
        </div>
        <div className='login'>
          <h3>Employees can login</h3>
          <Button color="contrast" onClick={() => this.context.router.history.push('/login')}>Login</Button>
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
  }
}

Home.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Home
