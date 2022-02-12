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
    const mostwanted = [ "customer", "password", "user" ]

    if ( this.validate(localStorage.getItem('customer')) && this.validate(localStorage.getItem('password')) )
    {
      for ( let i =0; i < mostwanted.length; i++ )
      {
        payload[mostwanted[i]] = this.convertB64ToStr( localStorage.getItem(mostwanted[i])).split('_')[0];
      }
      return payload;
    }else{
      return false;
    }
  }


  componentDidMount(){
    console.log(localStorage)
    if (this.decodeLocalStorage()){
      const payload = this.decodeLocalStorage();
      return this.handleLogin(payload);
    }
  }


  loginSuccess(data, userInfo){

    const keepLogin = {};
    for ( let i in userInfo ) {
      keepLogin[i] = userInfo[i]
      localStorage.setItem( i, this.convertStrToB64(userInfo[i]))
    }
    this.setState({'isLoggedIn' : true,  'assetData' : data.data, LoginInfo : keepLogin})
  }


  handleLogin  = async (e) => { 

    console.log('Starting the calls')

    let account = e['customer'];
    let passKey = e['password'];
    const payload = {};

    if ( this.validate(account) && this.validate(passKey) ) { //Fix this 

      payload['customer'] = account;
      payload['password'] = passKey;
      payload['user'] = 'zonar';

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
      console.log(response, payload)

      response.code === 200 ? this.loginSuccess(response, payload ) : response.error ? this.setState({'LoginErrorMessage':response.error.message}) : this.setState({'LoginErrorMessage':response.data.message })
    }else{
      console.log('Cancelled.' )
      const isEmptyMessage = 'Please enter a valid account code or password.';
      return this.setState({'LoginErrorMessage' : isEmptyMessage});
    }
  }


  render(){
    // localStorage.clear();
    // console.log(localStorage)
    const { assetData, isLoggedIn, LoginErrorMessage, whatsTheWord, LoginInfo } = this.state;
    return (
      <div>
        { isLoggedIn === false && <SignIn message={LoginErrorMessage} handleSubmit={this.handleLogin} /> }
        { isLoggedIn === true && <AppContainer mainData={assetData} /> }
      </div>
      )
  }
}
