import React, {Component} from 'react';
// import Typography from '@mui/material/Typography';
// import Chip from '@mui/material/Chip';//change color on conditions
// import Map from '../map/map.js';
import DefaultCard from '../card/card.js';
// import NoData from '../nodata/nodata.js';

export default class NewInspection extends Component {
  _isMounted = false
  constructor(props){
    super(props)
    this.state = {
      assetData: this.props.data,
      params: '',
      endTime : Date.now()/1000.0,
      startTime :  Date.now()/1000.0 - 86400,
      inspectionsData: '',
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

  fixData (data) {//tbc 
    // console.log(data, 'from merge.********************')
    // console.log(this)
    const id = this.props.id;
    const readEpoch = (t)=>{
      let i = new Date ( t * 1000 );
      return i.toLocaleString();
    }

    const main = {};
    const ref = {  
      'loadtime': 'UPLOADED',
      'cfglabel': 'TYPE',
      'defect': 'DEFECTS',
      'operator': 'OPERATOR',
    }
    // console.log(data)

    for ( let i in data ) {
      let insp = data[i].insp;
      if ( this.validate(insp) ){
        if (insp['assetid'] === id ){ 
          let inspection = data[i].insp;
          for (let x in ref){
            main[ref[x]] = inspection[x];
          }

          main['UPLOADED'] = readEpoch(main['UPLOADED']);
          return main;
        }
      }
    }
    // console.log('END OF THE LINE..', main, this)
    this.setState( {errorMessage: 'No inspection data'})
    // return main;
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
    if (this._isMounted){

      this.setState({inspectionsData:""});
      const id = this.props.id;
      const options = 
      {
        method : 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
      }

      const test_url = 'http://127.0.0.1:5000/newinspection'
      const url = 'http://34.83.13.20/newinspection'

      const fetchData = await fetch(url, options);
      const response = await fetchData.json();
      const updateErrorMessage = 'No data available';
      // console.log('fetch done.',response)

      if (this._isMounted ){
        response.code === 200 ? this.setState({'inspectionsData': this.fixData(response.data.secondary) }) : response.error ? this.setState({'errorMessage':response.error.message}) : this.setState({'errorMessage': updateErrorMessage })
        } 
    } 
  }
  // isPast24Hours(date) {
  //   const dateOfLocation = new Date(date).getTime()/1000.0;
  //   const nowTime = Date.now()/1000.0;
  //   const min24hourDate = nowTime - 86400; //24 hours from now
  //   return dateOfLocation < min24hourDate ? "warning" : "default"
  // }
  render(){
    // <Typography variant="caption" color="text.secondary"> {'Speed : '} <Chip label={locationData}/> </Typography>
    const { params, inspectionsData, errorMessage } = this.state;
    // console.log(this)
    return (
        <div>
          <DefaultCard title={"LAST INSP"}  message={errorMessage} handlecall={ ()=>this.handleApiCall(params)} cardData={inspectionsData} />
        </div>
      )
  }
}

