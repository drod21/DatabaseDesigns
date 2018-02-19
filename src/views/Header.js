import React, { Component } from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types'



class Header extends Component {
    render() {
        const{head} = styles
        return (
            <div className= 'head' style={head}>
                <Button color ="contrast" onClick={() => this.context.router.history.push('/home')}>Home</Button>   
                <Button color="contrast" onClick={() => this.context.router.history.push('/login')}>Login</Button>
            </div>
        )
    }       
}

const styles = {
    head: {
        justifyContent: 'center',
        background: 'grey',
        display: 'flex',
        margin: '15px 0',
        width: '100%'
    }
}

Header.contextTypes = {
    router: PropTypes.object.isRequired
}


export default Header
