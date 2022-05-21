import React, {Component} from 'react';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import Chip from '@mui/material/Chip';//change color on conditions
import Map from '../map/map.js';
import DefaultCard from '../regular/regular.js';
import NoData from '../nodata/nodata.js';



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



  mergeData (data) {//tbc 
    // console.log(data, 'from merge.********************')
    // console.log(this, data)
    const id = this.props.id;

    const main = {};
    const ref = {  
      'ODOMETER': 'ODOMETER',
      'PROTOCOL': 'protocol',
      'TIMESTAMP': 'time',
      'CHKENG': 'chkeng',
    }
    const rek = {  
      'ODOMETER': 'ODOMETER',
      'PROTOCOL': 'PROTOCOL',
      'TIMESTAMP': 'TIMESTAMP',
      'CHKENG': 'CHKENG',
    }
    

    if ( id in data ){
    	let l = data[id]['child']['EVENT'];
    	for ( let i in rek ) {
    		main[ rek[i] ] =  l[i]
    	}
    	return main;
    }

    this.setState( {errorMessage: 'No Jbus data'})
  }


  componentDidMount(){
    this._isMounted = true;
    // console.log(this)

    const { params, startTime, endTime } = this.state; 
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
  	console.log('Making call....' ,data)
    if (this._isMounted){

      this.setState({jBusData:""});
      const id = this.props.id;
      const options = 
      {
        method : 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
      }

      const fetchData = await fetch('/jbusevents', options);
      const response = await fetchData.json();
      const updateErrorMessage = 'No data available';
      console.log('fetch done.',response)

      if (this._isMounted ){
        response.code === 200 ? this.setState({'jBusData': this.mergeData(response.data) }) : response.error ? this.setState({'errorMessage':response.error.message}) : this.setState({'errorMessage': updateErrorMessage })
        } 
    } 
  }


  getMap(data){
    return <Map width="" location={data} />
  }


  isPast24Hours(date) {
    const dateOfLocation = new Date(date).getTime()/1000.0;
    const nowTime = Date.now()/1000.0;
    const min24hourDate = nowTime - 86400; //24 hours from now
    return dateOfLocation < min24hourDate ? "warning" : "default"
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
          <DefaultCard message={errorMessage} handlecall={()=>this.handleApiCall(params)} colors={ref} celldata={jBusData} />
        </div>
      )
  }
}

