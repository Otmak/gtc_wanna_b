import React, {Component} from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';//change color on conditions
import Map from '../map/map.js';
import Tooltip from '@mui/material/Tooltip';
import DefaultCard from '../card/card.js';
// import './location.css';


export default class ConnectTablet extends Component {
  _isMounted = false
  constructor(props){
    super(props)
    this.state = {
      assetData: this.props.data,
      params: '',
      tabletData: '',
      basicTabletData:'',
      rawTabletData: '',
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
    const { params } = this.state;
    if (this.validate(params)){
      return;
    }
    const mainData = this.decodeLocalStorage();

    if (this.validate(this.props.gps)){
      mainData['gpssn'] = this.props.gps;
      this.setState({params: mainData });
      return this.handleApiCall(mainData);
    }

    return this.setState({errorMessage:'No connect data'});
  }


  componentWillUnmount(){
    this._isMounted = false;
  }


  parseAppList(){
    const {rawTabletData} = this.state;
    if (this.validate(rawTabletData)){
      const appsElems = [];
      const t = rawTabletData.firmware.buildNumber//.split('-')[0];
      // console.log(rawTabletData);
      const appsList = rawTabletData.packageManifest.apps;
      for ( let i=0; i<appsList.length; i++ ){
          appsElems.push(
            <Tooltip title={ `v${appsList[i].availableVersionCode}` } followCursor> 
              <Chip label={`${appsList[i].label }`}> </Chip> 
            </Tooltip>
          );
      }

      return [ 
        <Typography variant="h5" gutterBottom component="div">{`${t}  v${rawTabletData.firmware.versionCode}`}</Typography> ,
        <br/>,<br/>,
        <Typography variant="overline" gutterBottom component="div">{`TIME ZONE:  ${rawTabletData.organization.defaultTimezone}`}</Typography>,
        appsElems
      ];
    }
  }


  cleanData(data){

  	if (this.validate(data)){
  		const basic = {	
	  		'FIRMWARE' : data.firmware.buildNumber,
	  		// 'ecuVIN' : data.assetInfo.ecuVin,
	  	}
	  	const connectApps = data.packageManifest.apps;
	  	for (let i=0; i<connectApps.length; i++){
	  		basic[connectApps[i].label] = connectApps[i].availableVersionCode;
	  	}
      this.setState({rawTabletData: data});
      // console.log(data)
	  	return basic;
	  }

  }


  handleApiCall = async (data) => {

    if (this._isMounted){

      this.setState({basicTabletData:"", rawTabletData:"" });
      const id = this.props.id;
      // console.log('got the iD',id, data)
      const options = 
      {
        method : 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
      }

      try{
        const url = 'http://34.83.13.20/connecttablet';
        const test_url = '/connecttablet';
        const fetchData = await fetch(test_url, options);
        const response = await fetchData.json();
        const updateErrorMessage = 'No Connect data';
        // console.log(response)
        if (this._isMounted ){
        	response.code === 200 ? this.setState({'basicTabletData':this.cleanData(response.data)}) : response.error ? this.setState({'errorMessage':response.error.message}) : this.setState({'errorMessage': updateErrorMessage })
        }
        }catch(error){
        	return;
        }
    }
    return; 
  }


  isPast24Hours(date) {
    const dateOfLocation = new Date(date).getTime()/1000.0;
    const nowTime = Date.now()/1000.0;
    const min24hourDate = nowTime - 86400; //24 hours from now
    return dateOfLocation < min24hourDate ? "warning" : "default";
  }

  
  render(){
    const { params, errorMessage, basicTabletData } = this.state;
    return (
      <div>
        <DefaultCard
        	title={"CONNECT TABLET"}
        	message={errorMessage}
        	handlecall={()=>this.handleApiCall(params)}
          custom={true}
        	cardData={this.parseAppList()} />
      </div>
      )
  }
}
