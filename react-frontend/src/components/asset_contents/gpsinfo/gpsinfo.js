import React, {Component} from 'react';
import DefaultCard from '../card/card.js';
import FullScreen from '../fullscreen/fullscreen.js';
import FullscreenIcon from '@mui/icons-material/Fullscreen';


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
      isOpen: false,
      genData:'',
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


  componentDidMount(){//

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


  epochToHtime(epoch){
    const time = new Date( epoch *1000);
    return time.toLocaleString();
  }


  mergeData(phhm, gendata){//tbc

    // console.log(phhm, 'from merge.********************')

    if ( this.validate(phhm) ){
      // console.log('SOmeHOW passed.')
      const main = {};
      const ref = {  
        'fwver': 'firmware',
        'gpssn': 'gpsid',
        'scid': 'scid',
        'timestamp': 'phhm',
      }
      const data = phhm.data.gpsphonecall.child;
      for ( let i in data ) 
      {
        if ( i in ref ){
          main[ ref[i].toUpperCase() ] = data[i];
        }
      }

      const genData = gendata.secondary;
      const gendataArray = [];
      for (let i=0; i<genData.length; i++)
      {
        // console.log(genData[i])
        gendataArray.push(          
          {
            label: genData[i].gendata.label,
            time: this.epochToHtime(genData[i].gendata.ctimestamp),
            string: genData[i].text
          })
      }

      this.setState({genData: gendataArray})
      main['PHHM'] = this.epochToHtime(main['PHHM']);
      // console.log(main)
      return main;
    }
  }

  handleFullScreenOpen(){
    this.setState({isOpen:true});
  }

  handleFullScreenClose(){
    return this.setState({tableData:false, isOpen:false});
    // console.log(this, 'after rise')
  }


  filterUserInfo(n, load){
    const data = {};
    for ( let i=0; i <n.length; i++ ){
      if (load[n[i]]){
        data[n[i]] = load[n[i]]
      }}
    return data;
  }


  handleApiCall = async (data) => {//-_-
    this.setState({gpsData:""});
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
      let n = ['customer','password','user', 'start','target']
      const genDataOptions = 
      {
        method : 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body : JSON.stringify(this.filterUserInfo(n,data))
      }


      try 
      {
        const test_url = 'http://127.0.0.1:5000/phhm';
        const url = 'http://34.83.13.20/phhm';
        const gendata_url = 'http://34.83.13.20/gendata';
        const gendata_test_url = '/gendata';
        const fetchPhhmData = await fetch(url, options);
        const fetchGenData = await fetch(gendata_url, genDataOptions);
        const phhmResponse = await fetchPhhmData.json();
        const genDataResponse = await fetchGenData.json();
        const gotError = 'No gps data';
        // console.log('phhm ++ ' , phhmResponse, genDataResponse)
        if (this._isMounted){
          phhmResponse.code === 200  ? this.setState({'gpsData': this.mergeData( phhmResponse, genDataResponse.data )}) : phhmResponse.error ? this.setState({'errorMessage': gotError}) : this.setState({'errorMessage':gotError })
        }
      }catch(error){
        console.log('something not good happened with the request :/ Try refreshing the browser or something')
        return;
      }
      return;
    }
  }


  render(){
    const { params, errorMessage, gpsData, isOpen, genData } = this.state;
    const tablehead = ['Label', 'time', 'String'];
    const bodyCount = ['label', 'time', 'string'];
    const bodyData = [];
    const items = [{icon:<FullscreenIcon  fontSize="small"/> ,name:'Gendata', func:()=>this.handleFullScreenOpen()}];
    return (
      <div>
        <DefaultCard
          title={"GPS UNIT"}
          message={errorMessage}
          handlecall={()=>this.handleApiCall(params)}
          cardData={gpsData}
          announcement={genData.length > 0 ? 1:''}
        > 
          {items}
        </DefaultCard>
        <FullScreen open={isOpen} handleClose={()=>this.handleFullScreenClose()} tablehead={tablehead} tableguide={bodyCount} title={`Gendata for ${this.props.data[this.props.id].child.fleet}`} tabledata={genData} data={this.props.data} fullscreen={isOpen} fontSize="small"/>
      </div>
    )
  }
}
