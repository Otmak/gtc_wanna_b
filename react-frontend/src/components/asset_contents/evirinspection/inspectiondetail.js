import React, {Component} from 'react';
import DefaultCard from '../card/card.js';
// import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
// import Map from '../map/map.js';
// import NoData from '../nodata/nodata.js';


export default class InspectionDetail extends Component {
  _isMounted = false
  constructor(props){
    super(props)
    this.state = {
      assetData: this.props.data,
      params: '',
      endTime : Date.now()/1000.0,
      startTime :  Date.now()/1000.0 - 86400,
      inspectionData: '',
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
    if ( this.validate(localStorage.getItem('customer')) && this.validate(localStorage.getItem('password')) )
    {
      for ( let i =0; i < mostwanted.length; i++ ){
        payload[mostwanted[i]] = this.convertB64ToStr( localStorage.getItem(mostwanted[i])).split('_')[0];
      }
      return payload;
    }
    return false;
  }


  componentDidMount(){
    this._isMounted = true;
    // console.log(this)

    const { params, startTime, endTime } = this.state; 
    const mainData = this.decodeLocalStorage();
    // console.log(mainData)
    mainData['target'] = this.props.id;
    // mainData['start'] = startTime.toString();
    // mainData['end'] = endTime.toString();
    // mainData['time'] = Math.round(startTime).toString();

    this.setState({params: mainData });
    this.handleApiCall(mainData);
  }


  componentWillUnmount(){
    this._isMounted = false;
  }


  fixData(data){

    //display zones 
    //zone| INSIDE CAB   time| 4pm   verified| YES
    //zone| INSIDE CAB   time| 4pm   verified| YES
    //zone| INSIDE CAB   time| 4pm   verified| YES
    // console.log(data)

    const z = (<Chip label={data.config.child}/>);
    const zones = data.secondary;
    const arr = [];
    const ob = {};

    for ( let i=0; i<zones.length; i++ ){
      if ( zones[i].zone ){
        let zchip = <Chip label={`zone | ${zones[i].zone.name}`}/>
        let tchip = <Chip label={`time | ${zones[i].zone.timestamp}`}/>
        let vchip = <Chip label={`verified | ${zones[i].zone.status}`}/>
        arr.push(zchip, tchip, vchip, <br/>);
      }
    }
    // console.log(arr);
    return arr;
    // return {
    //   'CONFIG TYPE':z,

    // };
  }

  parseZones(){
    const {inspectionData} = this.state;

    // console.log(inspectionData);
    return inspectionData


  }


  handleApiCall = async (data) => {
    if (this._isMounted){

      this.setState({inspectionData:""});
      const id = this.props.id;
      const options = 
      {
        method : 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
      }

      const test_url = 'http://127.0.0.1:5000/inspectiondetail'
      const url = 'http://34.83.13.20/newinspection'

      const fetchData = await fetch(test_url, options);
      const response = await fetchData.json();
      const updateErrorMessage = 'No data available';

      if (this._isMounted ){
        response.code === 200 ? this.setState({'inspectionData': this.fixData(response.data) }) : response.error ? this.setState({'errorMessage':response.error.message}) : this.setState({'errorMessage': updateErrorMessage })
        } 
    } 
  }


  render(){
    const { params, inspectionData, errorMessage } = this.state;
    return (
        <div>
          <DefaultCard title={"INSP DETAIL"}  message={errorMessage} handlecall={ ()=>this.handleApiCall(params)} custom={true} cardData={this.parseZones()} />
        </div>
      )
  }
}

