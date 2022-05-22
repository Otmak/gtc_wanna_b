import React, {Component} from 'react';
import DefaultCard from '../card/card.js';
import Chart from '../chart/chart.js';

// startTime :  Date.now()/1000.0 - 86400,
export default class JbusTripReport extends Component {
  _isMounted = false
  constructor(props){
    super(props)
    this.state = {
      assetData: this.props.data,
      params: '',
      endTime : Date.now()/1000.0,
      startTime :  Date.now()/1000.0 - 172800,
      jbusTripData: '',
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
    }
    return false;
  }



  FixData (data) {//tbc 

    // const id = this.props.id;

    const main = {};
    // const ref = {   }

    const payload = data.secondary;
    const jLabels = [];
    const fuelPlotData = [];
    const engHrsPlotData = [];

    if ( this.validate(payload) ){
      for ( let i = payload.length -1; i > 0; i -- ){

        fuelPlotData.push( payload[i].text.asset.fuel );
        engHrsPlotData.push( payload[i].text.asset.engine_hours );
        jLabels.push( payload[i].text.asset.start.slice(5,16) );
      }

      main['fuel'] = fuelPlotData;
      main['egnhrs'] = engHrsPlotData;
      main['labels'] = jLabels;
      // console.log(main)

      return main;
    }

    this.setState( { errorMessage: 'No JbusTrip data'})
  }


  componentDidMount(){
    this._isMounted = true;
    // console.log(this)

    const {  startTime, endTime } = this.state; 
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

      // console.log('Making call....')

      this.setState({jbusTripData:""});
      // const id = this.props.id;
      const options = 
      {
        method : 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
      }
      const url = 'http://127.0.0.1:5000/jbustripreport';
      const fetchData = await fetch(url, options);
      // const fetchData = await fetch('http://34.127.101.3/jbustripreport', options);
      const response = await fetchData.json();
      const updateErrorMessage = 'No JbusTrip data';
      // console.log('fetch done.',response)


      if (this._isMounted ){
        response.code === 200 ? this.setState({'jbusTripData': this.FixData(response.data) }) : response.error ? this.setState({'errorMessage':response.error.message}) : this.setState({'errorMessage': updateErrorMessage })
        } 
    } 
  }

  
  render(){
    const { params, jbusTripData, errorMessage } = this.state;
    // console.log(this)
    return (
      <div>
        <DefaultCard title={"JBUS TRIP"}  message={errorMessage} handlecall={ ()=>this.handleApiCall(params)} custom={true} cardData={ <Chart labels={jbusTripData.labels} data={jbusTripData} /> } />
      </div>
    )
  }
}

