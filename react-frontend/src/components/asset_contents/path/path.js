import React, {Component} from 'react';
import FullScreen from '../fullscreen/fullscreen.js';
import DefaultCard from '../card/card.js';
// import CardSpeedDail from '../card/cardspeeddail.js';
// import NoData from '../nodata/nodata.js';
import CustomTable from '../table/table.js';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import './path.css';


export default class Path extends Component {
  _isMounted = false
  constructor(props){
    super(props)
    this.state = {
      assetData : this.props,
      tableData: '',
      endTime : Date.now()/1000.0,
      startTime :  Date.now()/1000.0 - 86400,
      pathData : [],
      errorMessage: '',
      params: '',
      isOpen:false,
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

    const { startTime, endTime } = this.state; 
    const mainData = this.decodeLocalStorage();
    mainData['target'] = this.props.id;
    mainData['start'] = startTime.toString();
    mainData['end'] = endTime.toString();
    // console.log('No params', params,this.props, mainData)

    this.setState({params: mainData });
    this.handleApiCall(mainData);
  }


  componentWillUnmount(){
    this._isMounted = false
  }

  getPath(res){
    const path = res.data.pathevents.assets;
    if (this.validate(path)){
      return path[0].events;
    }
    this.setState( {'errorMessage' : 'No path data'})
  }


  handleApiCall = async (data) => {
    if ( this._isMounted ){

      this.setState({pathData:""});
      // const id = this.props.id;
      const options = 
      {
        method : 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
      }

      const url = 'http://127.0.0.1:5000/path';
      const fetchData = await fetch(url, options);
      const response = await fetchData.json();
      const gotError = 'No path data';
      // console.log(response)

      if ( this._isMounted){
        response.code === 200 ? this.setState({'pathData': this.getPath(response)}) : response.error ? this.setState({'errorMessage': gotError}) : this.setState({'errorMessage':gotError })
      } 
    }
  }
  
  render(){ 
    const { isOpen, pathData, params, errorMessage } = this.state;
    const headData = [ 'Source', 'Time', 'Speed', 'Reason' ];
    const bodyCount = ['source', 'time', 'speed', 'reasons'];
    const items = [{icon:<FullScreen title={this.props.data[this.props.id].child.fleet} pathdata={pathData} type='path' data={this.props.data} fullscreen={isOpen} fontSize="small"/> ,name:'Fullscreen', func:()=>this.fullscreenLONG()},];

    return (
    	<div>
    	    <DefaultCard 
            title={"PATH"}
            message={errorMessage}
            handlecall={()=>this.handleApiCall(params)}
            custom={true} 
            cardData={ <CustomTable id={this.props.id } className="customtable" maxheight={290} head={headData} body={pathData} bodycount={bodyCount} bodylength={20} /> }
          >
            {items}
          </DefaultCard>
    	</div>
    	)
  }
}
