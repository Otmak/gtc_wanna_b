import React, { Component } from 'react';
import SignIn from './components/home_templates/sign_in.js';

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      isLoggedIn : false,
      isNotLoggedIn: true,
    }



  }

  handleLogin(e){
    console.log('Logging from Main....', e)
    this.setState({'isLoggedIn' : true})

  }

  render(){
    console.log('online')
    const { isLoggedIn } = this.state;


    return (
      <div>
        { isLoggedIn === false && <SignIn handleLogin={this.handleLogin()}/> }
        { isLoggedIn === true && 'data is here..'}
      </div>

      )
  }
}
