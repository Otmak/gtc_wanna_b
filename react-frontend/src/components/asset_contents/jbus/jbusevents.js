import React, {Component} from 'react';
// import Chip from '@mui/material/Chip';//change color on conditions
// import Map from '../map/map.js';
import DefaultCard from '../card/card.js';
// import NoData from '../nodata/nodata.js';



export default class JbusEvents extends Component {
  _isMounted = false
  constructor(props){
    super(props)
    this.state = {
      assetData: this.props.data,
      params: '',
      endTime : Date.now()/1000.0,
      startTime :  Date.now()/1000.0 - 86400,
      jBusData: '',
      errorMessage:'',
    }
  }


  validate (value) {
    return value === '' || value === undefined || value === null ? false : true;
  }


  convertB64ToStr (str) {
    if ( this.validate(str)){
      return decodeURIComponent(escape(window.atob( str )));
    }
    return str;
  }


  decodeLocalStorage (){
    const payload = {};
    const mostwanted = [ "customer", "password", "username" ]
    if ( this.validate(localStorage.getItem('customer')) && this.validate(localStorage.getItem('password')) ){
      for ( let i =0; i < mostwanted.length; i++ ){
        payload[mostwanted[i]] = this.convertB64ToStr( localStorage.getItem(mostwanted[i])).split('_')[0];
      }
      return payload;
    }
    return false;
  }



  mergeData (data) {//tbc 
    // console.log(data, 'from merge.********************')
    // console.log(this, data)
    const id = this.props.id;
    const readEpoch = (t)=>{
      let i = new Date ( t * 1000 );
      return i.toLocaleString();
    }

    const main = {};
    const ref = {  
      'ODOMETER': 'ODOMETER',
      'PROTOCOL': 'PROTOCOL',
      'TIMESTAMP': 'TIMESTAMP',
      'CHKENG': 'CHKENG',
    }

    if ( id in data ){
    	let l = data[id]['child']['EVENT'];
    	for ( let i in ref ) {
    		main[ ref[i] ] =  l[i]
    	}

      main['TIMESTAMP'] = readEpoch(main['TIMESTAMP'])
    	return main;
    }

    this.setState( {errorMessage: 'No Jbus events'})
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


  componentWillUnmount(){
    this._isMounted = false;
  }


  handleApiCall = async (data) => {
    if (this._isMounted){
      this.setState({jBusData:""});
      // const id = this.props.id;
      const options = 
      {
        method : 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
      }
      const test_url = '/jbusevents';
      const url = 'http://34.83.13.20/jbusevents';
      const fetchData = await fetch(test_url, options);

      const response = await fetchData.json();
      const updateErrorMessage = 'No data available';
      if (this._isMounted ){
        response.code === 200 ? this.setState({'jBusData': this.mergeData(response.data) }) : response.error ? this.setState({'errorMessage':response.error.message}) : this.setState({'errorMessage': updateErrorMessage })
        } 
    } 
  }
  
  render(){
    const { params, jBusData, errorMessage } = this.state;
    const ref = {
    	'on': {
    		"color" :'warning',
    		"desc":'The check engine light in on'
    	}
    }

    return (
        <div>
          <DefaultCard title={"JBUS EVENT"}  message={errorMessage} handlecall={ ()=>this.handleApiCall(params)}  colors={ref} cardData={jBusData} />
        </div>
      )
  }
}

