import React, { Component } from 'react';
import SignIn from './components/home_templates/sign_in.js';
import AppContainer from './components/home_templates/appcontainer.js';


export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      assetData :{},
      isLoggedIn : false,
      isNotLoggedIn: true,
      LoginInfo: {},
      whatsTheWord: 'mandelbrot_set',
      LoginErrorMessage : '',
    }
  }


  validate (value) {
    return value === '' || value === undefined || value === null ? false : true;
  } 


  convertB64ToStr (str) {
    if ( this.validate(str)){
      return decodeURIComponent(escape(window.atob( str )));
    }
    else{
      return str;
    }
  }


  convertStrToB64 (str) {
    if ( this.validate(str) ){
      let strEnc = str + '_' + this.state.whatsTheWord;
      return window.btoa(unescape(encodeURIComponent( strEnc )));
    }else{
      return str
    }
  }


  decodeLocalStorage (){
    const payload = {};

    if ( this.validate(localStorage.getItem('secreteAccount')) && this.validate(localStorage.getItem('secretePass')) ){//dry

      const decodeLocalStorageAccount = this.convertB64ToStr( localStorage.getItem('secreteAccount'));
      const decodeLocalStoragePasskey = this.convertB64ToStr( localStorage.getItem('secretePass'));
      payload['customer'] = decodeLocalStorageAccount.split('_')[0];
      payload['password'] = decodeLocalStoragePasskey.split('_')[0];
      payload['user'] = 'zonar';

      return payload;
    }else{
      return false;
    }
  }


  componentDidMount(){
    if (this.decodeLocalStorage()){
      const payload = this.decodeLocalStorage();
      return this.handleLogin(payload);
    }
  }


  handleLogin  = async (e) => { 

    let account = e['customer'];
    let passKey = e['password'];
    const payload = {};

    if ( this.validate(account) && this.validate(passKey) ) { //Fix this 

      payload['customer'] = account;
      payload['password'] = passKey;
      payload['user'] = 'zonar';

      localStorage.setItem('secreteAccount', this.convertStrToB64(account));
      localStorage.setItem('secretePass', this.convertStrToB64(passKey));
      this.setState({ LoginInfo : payload});

    }else{
      // console.log('something up!', account, passKey )
      const isEmptyMessage = 'Please enter a valid account code or password.';
      return this.setState({'LoginErrorMessage' : isEmptyMessage});
    }

    let options = 
    {
      method : 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body : JSON.stringify(payload)
    }

    const fetchData = await fetch('/asset', options);
    const response = await fetchData.json();
    response.code === 200 ? this.setState({'isLoggedIn' : true,  'assetData' : response.data}) : response.error ? this.setState({'LoginErrorMessage':response.error.message}) : this.setState({'LoginErrorMessage':response.data.message })
  }

  render(){
    const { assetData, isLoggedIn, LoginErrorMessage, whatsTheWord, LoginInfo } = this.state;
    return (
      <div>
        { isLoggedIn === false && <SignIn message={LoginErrorMessage} handleSubmit={this.handleLogin} /> }
        { isLoggedIn === true && <AppContainer mainData={assetData} /> }
      </div>
      )
  }
}
