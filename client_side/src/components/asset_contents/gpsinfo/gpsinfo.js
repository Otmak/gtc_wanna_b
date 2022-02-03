import React, {Component} from 'react';
import DefaultCard from '../regular/regular.js';
import Card from '@mui/material/Card';


export default class GpsInfo extends Component {
  _isMounted = false
  constructor(props){
    super(props)
    this.state = {
      assetData : this.props,
      endTime : Date.now()/1000.0,
      startTime :  Date.now()/1000.0 - 86400,
      errorMessage: '',
      params: '',
      gpsData: '',
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


  componentDidMount(){

    this._isMounted = true;

    const { params, startTime, endTime } = this.state; 
    const mainData = this.decodeLocalStorage();
    mainData['target'] = this.props.id;
    mainData['start'] = startTime.toString();
    mainData['end'] = endTime.toString();

    this.setState({params: mainData });
    this.handleApiCall(mainData);
  }


  mergeData(phhm){

    if ( this.validate(phhm) ){
      const main = new Object();
      const ref = {  
        'fwver': 'firmware',
        'gpssn': 'gpsid',
        'scid': 'scid',
        'timestamp': 'Last phhm',
      }

      console.log(phhm.data.null.child)
      const data = phhm.data.null.child;

      for ( let i in data ) {
        if ( i in ref ){
          main[ref[i]] = data[i]
        }
      }
      console.log(main)
      return main;
    }
  }


  handleApiCall = async (data) => {//-_-

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
      const fetchPhhmData = await fetch('/phhm', options);
      // const fetchAssetActivityData = await fetch('/assetactivity', options);
      // const fetchPhhmData = await fetch('/phhm', options);
      const phhmResponse = await fetchPhhmData.json();
      // const assetActivityResponse = await fetchAssetActivityData.json();
      const gotError = 'No gps data';
      // console.log('phhm ',phhmResponse )
      if (this._isMounted){
        phhmResponse.code === 200  ? this.setState({'gpsData': this.mergeData( phhmResponse )}) : phhmResponse.error ? this.setState({'errorMessage': gotError}) : this.setState({'errorMessage':gotError })
      }
    }
  }


  render(){
    const { params, gpsData } = this.state;

    return (
      <div>
        <DefaultCard celldata={gpsData}/>
      </div>
      )
  }
}
