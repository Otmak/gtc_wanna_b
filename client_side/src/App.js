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
      LoginInfo: {},
      whatsTheWord: 'mandelbrot_set',
      LoginErrorMessage : '',
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

  validate (value) {
    return value === '' || value === undefined || value === null ? false : true;
  }


  decodeLocalStorage (){
    const decodeLocalStorageAccount = this.convertB64ToStr( localStorage.getItem('secreteAccount'));
    const decodeLocalStoragePasskey = this.convertB64ToStr( localStorage.getItem('secretePass'));
    const payload = {};
    // return decodedLocalStorage;

    if ( this.validate(decodeLocalStorageAccount) && this.validate(decodeLocalStoragePasskey) ){
      payload['account'] = decodeLocalStorageAccount.split('_')[0];
      payload['password'] = decodeLocalStoragePasskey.split('_')[0];
      payload['user'] = 'zonar';

      return payload;
    }

  }

  convertB64ToStr (str) {
    if ( this.validate(str)){
      return decodeURIComponent(escape(window.atob( str )));
    }
    else{
      return str;
    }  
  }

  componentDidMount(){
    const payload = this.decodeLocalStorage();
    return this.handleLogin(payload);
  }


  handleLogin  = async (e) => {

    let account = e['account'];
    let passKey = e['password'];
    let user = e['user'];
    const payload = {};

    // console.log('playing tunes', e)

    if ( this.validate(account) && this.validate(passKey) ) {

      payload['account'] = account;
      payload['password'] = passKey;
      payload['user'] = 'zonar';

      localStorage.setItem('secreteAccount', this.convertStrToB64(account))
      localStorage.setItem('secretePass', this.convertStrToB64(passKey))
      this.setState({ LoginInfo : payload})

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
      }else{
        this.setState( {'LoginErrorMessage' : response.data.message } );      
      }
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
