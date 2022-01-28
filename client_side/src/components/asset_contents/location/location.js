import React, {Component} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Map from '../map/map.js';
import './location.css';


export default class Location extends Component {
  _isMounted = false
  constructor(props){
    super(props)
    this.state = {
      assetData: this.props.data,
      params: '',
      locationData: '',
      ErrorMessage:'',
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
    //check state
    const { params } = this.state;
    if (this.validate(params)){
      // console.log('Already have here:',params);
      console.log('Params found!')
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
      const updateErrorMessage = 'No location info is available';
      // console.log('Fetch results' , (response))
      response.code === 200 ? this.setState({'locationData':response.data[id].child}) : response.error ? this.setState({'ErrorMessage':response.error.message}) : this.setState({'ErrorMessage': updateErrorMessage })
    } 
  }


  getMap(data){
    return <Map location={data} />
  }

  
  render(){

    const { params, locationData, ErrorMessage } = this.state;
    // console.log('on render()', locationData )
    return (
      <div>
        <Card sx={{ width: 445 }}>
          <CardMedia
            height ="140"
          >
            {this.validate(locationData) && this.getMap(locationData)}
          </CardMedia>
          <CardContent>
            <h4> {'Location'} </h4>
            <p> {'Last updated : '}{locationData.time} </p>
            {<p> { this.validate(ErrorMessage) && ErrorMessage }</p>}
          </CardContent>
          <CardActions onClick={()=>this.handleApiCall(params)}>
            <Button size="small">GET</Button>
          </CardActions>
        </Card>
      </div>
      )
  }
}