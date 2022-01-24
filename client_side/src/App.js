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
      LoginInfo: {
        account : localStorage.getItem('secreteAccount'),
        password : localStorage.getItem('secretePass')
      },
      whatsTheWord: 'mandelbrot_set',
      LoginErrorMessage : '',
    }
  }

  convertStrToB64 (str) {
    if (str === undefined ){
      return str
    }
    else {
      let strEnc = str + '_' + this.state.whatsTheWord;
      return window.btoa(unescape(encodeURIComponent( strEnc )));
    }
  }

  convertB64ToStr (str) {
    console.log( 'to be converted', str)
    if ( str === undefined ){
      return str;
    }
    else{
      return decodeURIComponent(escape(window.atob( str )))
    }  
  }

  componentDidMount(){

    const validate = (value) =>  value === '' || value === undefined || value === null ? false : true;
    const decodeLocalStorageAccount = this.convertB64ToStr( localStorage.getItem('secreteAccount'));
    const decodeLocalStoragePasskey = this.convertB64ToStr( localStorage.getItem('secretePass'));
    const payload = {}

    if ( validate(decodeLocalStorageAccount) && validate(decodeLocalStoragePasskey) ){
      payload['account'] = decodeLocalStorageAccount.split('_')[0];
      payload['password'] = decodeLocalStoragePasskey.split('_')[0];
      payload['user'] = 'zonar';

      return this.handleLogin(payload);
    }
  }


  handleLogin  = async (e) => {

    const validate = (value) =>  value === '' || value === undefined || value === null ? false : true;
    let account = e['account'];
    let passKey = e['password'];
    let user = e['user'];
    const payload = {};

    if ( validate(account) && validate(passKey) ) {

      payload['account'] = account;
      payload['password'] = passKey;
      payload['user'] = 'zonar';

      localStorage.setItem('secreteAccount', this.convertStrToB64(account))
      localStorage.setItem('secretePass', this.convertStrToB64(passKey))

    }else{
      const isEmptyMessage = 'Please Enter A Valid Account Code Or Password.'
      return this.setState({'LoginErrorMessage' : isEmptyMessage})
    }

    const fetchData = await fetch('/asset', {
      method : 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body : JSON.stringify(payload)
    });

    const response = await fetchData.json();
    if (response.code === 200) 
    {
      this.setState( {'isLoggedIn' : true,  'assetData' : response.data} );
    }else if (response.error)
      {
        this.setState( {'LoginErrorMessage' : response.error.message } );
      }
      else 
      {
        this.setState( {'LoginErrorMessage' : response.data.message } );      
      }
    }


  render(){

    const { assetData, isLoggedIn, LoginErrorMessage, whatsTheWord } = this.state;
    const validate = (value)=> value === '' || value === undefined || value === null ? false : true; 

    return (
      <div>
        { isLoggedIn === false && <SignIn message={LoginErrorMessage} handleSubmit={this.handleLogin} /> }
        { isLoggedIn === true && <AppContainer mainData={assetData}/> }
      </div>
      )
  }
}
