import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            nameInput: '',
            passwordInput:''
        }
    }

    handleChangeName = (event) => {
        this.setState({ nameInput: event.target.value })
    }

    handleChangePassword = (event) => {
        this.setState({ passwordInput: event.target.value })
    }

    render() {

        const { nameInput, passwordInput, submit, wrapper } = styles
        return(
            <div className='input-container' style={wrapper}>
                <div className='userinput' style={nameInput}>
                    <TextField
                        id="nameInput"
                        label="Username"
                        value={this.state.nameInput}
                        onChange={this.handleChangeName}
                        margin="normal"
                    />
                </div>
                <div className='password-container' style={passwordInput}>
                    <TextField
                        id="passwordInput"
                        label="Password"
                        type="password"
                        value={this.state.passwordInput}
                        onChange={this.handleChangePassword}
                        margin="normal"
                    />
                </div>
                <div className='submitbutton' style={submit}>
                    <Button color="contrast" onClick={this.handleSubmition}>Submit</Button>
                </div>
            </div>   
        )
    }
}

const styles = {
    wrapper: {
        alignItems: 'center',
        display: 'flex',
        flexFlow:'column'
    },
    nameInput: {
        background: 'white',
        color: 'black'
    },
    passwordInput: {
        background:'white',
        color:'black'
    },
    submit: { color: 'black' }
}

export default Login