import Button from 'material-ui/Button';
import React, { Component } from 'react';




class Header extends Component {

    render(){
        const{head} = styles
        return(
            <div className= 'head' style={head}>
                    <Button color="contrast" onClick={() => this.context.router.history.push('/login')}>Login</Button>
                    <Button color ="contrast" onClick={() => this.context.router.history.push('/home')}>Home</Button>   
            </div>

              )
            }       
                              }

const styles = {

    head: {
        alignItems: 'center',
        display: 'flex',
        flexFlow: 'column'
          }
}


export default Header
