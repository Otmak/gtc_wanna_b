import React, { Component } from 'react';
import SignIn from './components/home_templates/sign_in.js';
import AppContainer from './components/home_templates/appcontainer.js';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      assetData :'',
      isLoggedIn : false,
      isNotLoggedIn: true,
      message_from_server: '',
      loginInfo: '',
    }
  }

   handleLogin  = async (e) => {

    console.log('Logging from Main....', e)

    const fetchData = await fetch('/asset', {
      method : 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body : JSON.stringify(e)
    });
    const response = await fetchData.json();
    console.log('Response from server', response)
    // console.log(response.code)


    if (response.code == 200) 
    {
      console.log('Success', response);
      this.setState({'isLoggedIn' : true,  'assetData' : response.data});

      // console.log('Login state changed', this);

    }else{
      if (response.error)
      {
        console.log('Error occured in ther Server');
      }else {
        console.log( 'Status Not 200', response , response.data.code);
        this.setState({'message_from_server' : response.data.message });      
      } 
    }

  }


  render(){
    console.log(this);
    const { assetData, isLoggedIn, message_from_server, loginInfo } = this.state;

    return (
      <div>
        { isLoggedIn === false && <SignIn message={message_from_server} handleSubmit={this.handleLogin} /> }
        { isLoggedIn === true && <AppContainer mainData={assetData}/> }
      </div>
      )
  }
}
