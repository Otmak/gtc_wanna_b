import React, {Component} from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';//change color on conditions
import Map from '../map/map.js';
import Tooltip from '@mui/material/Tooltip';
import DefaultCard from '../card/card.js';
import './location.css';


export default class Location extends Component {
  _isMounted = false
  constructor(props){
    super(props)
    this.state = {
      assetData: this.props.data,
      params: '',
      locationData: '',
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

    if ( this.validate(localStorage.getItem('customer')) && this.validate(localStorage.getItem('password')) )
    {
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
    const { params } = this.state;
    if (this.validate(params)){
      return;
    }
    const mainData = this.decodeLocalStorage()
    mainData['target'] = this.props.id
    this.setState({params: mainData })
    this.handleApiCall(mainData)
  }


  componentWillUnmount(){
    this._isMounted = false;
  }


  handleApiCall = async (data) => {

    if (this._isMounted){

      this.setState({locationData:""});
      const id = this.props.id;
      const options = 
      {
        method : 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
      }

      const url = 'http://34.83.13.20/location';
      const test_url = 'http://127.0.0.1:5000/location';
      const fetchData = await fetch(url, options);
      const response = await fetchData.json();
      const updateErrorMessage = 'No location data';

      if (this._isMounted ){
        response.code === 200 ? this.setState({'locationData':response.data[id].child}) : response.error ? this.setState({'errorMessage':response.error.message}) : this.setState({'errorMessage': updateErrorMessage })
        } 
    } 
  }
  getMap(data){
    // console.log(data)
    const { id } = this.props;
    return <Map height={220} location={data} />
  }


  parseContent(data){
    // console.log('loaction data', data)
    if ( this.validate(data) ){
      // console.log(data)

      return (
          <CardMedia  >
            { this.getMap(data) }
            <Typography variant="subtitle2" color="text.secondary">
             {'Vehicle Status '}  
             <Tooltip  title={ data.power== 'on' ? `Vehicle is moving @ ${data.speed.speed}${data.speed.attrib.unit}.`:'Vehicle is powered off.' } followCursor> 
              <Chip color={ data.power === "on" ? "success" : "default"} label={data.power}/> 
             </Tooltip>
            </Typography>

            <Typography variant="caption" color="text.secondary">
             {'Last updated'} 
             <Tooltip title={ this.isPast24Hours(data.time) == "warning" ? `Last location entry is more than 24hr old.`:""  } followCursor>
              <Chip color={ this.isPast24Hours(data.time)} label={data.time}/> 
             </Tooltip>
            </Typography> <br /> 

          </CardMedia>
          )
    }
  }


  isPast24Hours(date) {
    const dateOfLocation = new Date(date).getTime()/1000.0;
    const nowTime = Date.now()/1000.0;
    const min24hourDate = nowTime - 86400; //24 hours from now
    return dateOfLocation < min24hourDate ? "warning" : "default"
  }
  
  render(){
    const { params, errorMessage, locationData } = this.state;
    return (
      <div>
        <DefaultCard title={"LOCATION"}  message={errorMessage} handlecall={()=>this.handleApiCall(params)} custom={true} cardData={ this.parseContent(locationData)} />
      </div>
      )
  }
}
