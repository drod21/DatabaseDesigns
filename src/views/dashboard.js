import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
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
    id: getRandomInt(927)
  }
}

render() {
  return(
    <div>
    </div>
  )
}
}

function mapStateToProps(state) {
  return {
    items: state.items
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)