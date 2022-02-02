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
import NoData from '../nodata/nodata.js';
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

      const fetchData = await fetch('/location', options);
      const response = await fetchData.json();
      const updateErrorMessage = 'No data available';

      if (this._isMounted ){
        response.code === 200 ? this.setState({'locationData':response.data[id].child}) : response.error ? this.setState({'errorMessage':response.error.message}) : this.setState({'errorMessage': updateErrorMessage })
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
    // <Typography variant="caption" color="text.secondary"> {'Speed : '} <Chip label={locationData}/> </Typography>
    const { params, locationData, errorMessage } = this.state;
    return (
        <Card sx={{ width: 800 , height : 440}}>
          <CardMedia
            height ="140"
            component="map"
          >
            {this.validate(locationData) && this.getMap(locationData)}
          </CardMedia>
          <CardContent>
            { !this.validate(errorMessage)
              && 
              <div>
                <Typography variant="subtitle2" color="text.secondary"> {'Vehicle Status: '} <Chip color={ locationData.power === "on" ? "success" : "default"} label={locationData.power}/> </Typography>
                <Typography variant="caption" color="text.secondary"> {'Last updated : '} <Chip color={ this.isPast24Hours(locationData.time)} label={locationData.time}/> </Typography> <br /> 
              </div>
            }
            { this.validate(errorMessage) && <NoData message={ errorMessage }/>  }
          </CardContent>
          <CardActions onClick={()=>this.handleApiCall(params)}>
            <Button size="small">GET</Button>
          </CardActions>
        </Card>
      )
  }
}