import React, {Component} from 'react';
import DefaultCard from '../card/card.js';


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
    const mostwanted = [ "customer", "password", "user" ]
    if ( this.validate(localStorage.getItem('customer')) && this.validate(localStorage.getItem('password')) ){
      for ( let i =0; i < mostwanted.length; i++ ){
        payload[mostwanted[i]] = this.convertB64ToStr( localStorage.getItem(mostwanted[i])).split('_')[0];
      }
      return payload;
    }else{
      return false;
    }
    
  }


  componentDidMount(){

    this._isMounted = true;
    // console.log(this)

    const { startTime, endTime } = this.state; 
    const mainData = this.decodeLocalStorage();
    // console.log(mainData)
    mainData['target'] = this.props.id;
    mainData['start'] = startTime.toString();
    mainData['end'] = endTime.toString();
    mainData['time'] = Math.round(startTime).toString();

    this.setState({params: mainData });
    this.handleApiCall(mainData);
  }


  epochToHtime(epoch){
    const time = new Date( epoch *1000);
    return time.toLocaleString();
  }


  mergeData(phhm){//tbc

    console.log(phhm, 'from merge.********************')

    if ( this.validate(phhm) ){
      console.log('SOmeHOW passed.')
      const main = {};
      const ref = {  
        'fwver': 'firmware',
        'gpssn': 'gpsid',
        'scid': 'scid',
        'timestamp': 'phhm',
      }
      const data = phhm.data.gpsphonecall.child;
      for ( let i in data ) {
        if ( i in ref ){
          main[ ref[i].toUpperCase() ] = data[i]
        }
      }
      main['PHHM'] = this.epochToHtime(main['PHHM']);
      return main;
    }
  }

  handleApiCall = async (data) => {//-_-
    this.setState({gpsData:""});
    // console.log('calling api.....', data)
    if ( this._isMounted ){
      // const id = this.props.id;
      const options = 
      {
        method : 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
      }
      const url = 'http://127.0.0.1:5000/phhm';
      const fetchPhhmData = await fetch(url, options);
      // const fetchAssetActivityData = await fetch('/newinspection', options);
      const phhmResponse = await fetchPhhmData.json();
      // const assetActivityResponse = await fetchAssetActivityData.json();
      const gotError = 'No gps data';
      // console.log('phhm ++ ' , phhmResponse)
      if (this._isMounted){
        phhmResponse.code === 200  ? this.setState({'gpsData': this.mergeData( phhmResponse )}) : phhmResponse.error ? this.setState({'errorMessage': gotError}) : this.setState({'errorMessage':gotError })
      }
    }
  }


  render(){
    const { params, errorMessage, gpsData } = this.state;
    // console.log(this.validate(false))
    return (
      <div>
        <DefaultCard title={"GPS UNIT"}  message={errorMessage} handlecall={()=>this.handleApiCall(params)} cardData={gpsData}/>
      </div>
      )
  }
}
