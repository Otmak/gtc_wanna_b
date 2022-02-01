import React, { Component } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import './defaultcard.css';


export default class DefaultCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      assetData :{},
      errorMessage : '',
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


  decodeLocalStorage (){
    const payload = {};

    if ( this.validate(localStorage.getItem('secreteAccount')) && this.validate(localStorage.getItem('secretePass')) ){//dry
      // const store = {};
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


  // componentDidMount () {
  //   if (this.decodeLocalStorage()){
  //     const payload = this.decodeLocalStorage();
  //     return this.handleLogin(payload);
  //   }
  // }


  fixData (data) {
    return data;
  }


  handleApiCall = async (data) => {

    if ( this._isMounted ){

      const id = this.props.id;
      const options = 
      {
        method : 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
      }
      const fetchData = await fetch('/path', options);
      const response = await fetchData.json();
      const gotError = 'No path data';
      console.log(response)
      response.code === 200 ? this.setState({'pathData': this.fixData(response)}) : response.error ? this.setState({'ErrorMessage': gotError}) : this.setState({'ErrorMessage':gotError })
    }
  }
  

  render () {
    const { errorMessage } = this.state;

    return (
      <Card className="default_container">
        <Typography align="center" variant="caption" color="text.secondary"> {"test card"} </Typography>
      </Card>
      )}
}
