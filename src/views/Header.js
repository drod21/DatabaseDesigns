import React, { PureComponent } from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Header extends PureComponent {
    constructor(props) {
        super(props)
        const token = window.localStorage.getItem('jwt'); 
        this.state = { isLoggedIn: (token) ? true : false }
    }

    componentWillReceiveProps(nextProps) {
        const token = window.localStorage.getItem('jwt'); 
        this.setState({ isLoggedIn: (token) ? true : false })
    }

    logout = () => {
        window.localStorage.removeItem('jwt')
        this.context.router.history.push('/login')
        this.setState({ isLoggedIn: false })
    }

    render() {
        const { header, headerLinks } = styles
        return (
            <div className='header' style={header}>
                <Link to='/' style={headerLinks}>Home</Link>
                <Link to='/items' style={headerLinks}>Items</Link>
                {(this.state.isLoggedIn) ? 
                    <div style={headerLinks} onClick={this.logout}>Logout</div> 
                    : <Link to='/login' style={headerLinks}>Login</Link>
                }
                 {(this.state.isLoggedIn) && <Link to='/dashboard' style={headerLinks}>Dashboard</Link>}
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
        cursor: 'pointer',
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
