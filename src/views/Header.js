import React, { Component } from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Header extends Component {
    render() {
        const { header, headerLinks } = styles
        return (
            <div className='header' style={header}>
                <Link to='/' style={headerLinks}>Home</Link>
                <Link to='/login' style={headerLinks}>Login</Link>
            </div>
        )
    }       
}

const styles = {
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        background: 'grey',
        height: '50px',
        display: 'flex',
        width: '100%'
    },
    headerLinks: {
        border: '1px solid white',
        color: 'white',
        margin: '25px',
        padding: '5px 10px',
        textDecoration: 'none'
    }
}

Header.contextTypes = {
    router: PropTypes.object.isRequired
}


export default Header
