import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';




class Anthony extends Component
{
    
        
        state = {
                 nameInput: '',
                 passwordInput:''
        }
    

    handleChangeName= (event) => {
        this.setState({ nameInput: event.target.value })
    }

    handleChangePassword= (event) => {
        this.setState({ passwordInput: event.target.value })
    }




    render() {

        const {nameinput,passwordinput,submit,wrapper} = styles
        return(
            <div className='input-container' style={wrapper}>
            <div className='userinput' style={nameinput}>
             <TextField
                id="nameInput"
                label="Username"
                value={this.state.nameInput}
                onChange={this.handleChangeName}
                margin="normal"
             />
             </div>

            <div className='password-container' style={passwordinput}>
             <TextField
                id="passwordInput"
                label="Password"
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
    wrapper:{
        alignItems: 'center',
        display: 'flex',
        flexFlow:'column'
    },
    nameinput: {background: 'white',
               color: 'black'},
    passwordinput:{background:'white',
                    color:'black'},
    submit: {color: 'black'}
}



export default Anthony