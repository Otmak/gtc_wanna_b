import React, {Component} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import FullScreen from '../fullscreen/fullscreen.js';
import CustomTable from '../table/table.js';
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
      ErrorMessage: '',
      params: '',
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
    const { params, startTime, endTime } = this.state;
    if (this.validate(params)){
      console.log('Already have here:',params);
    }
    
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
    // this.setState( {'isPath' : false})
  }


  handleApiCall = async (data) => {

    if ( this._isMounted ){

      const id = this.props.id;
      const options = 
      {
        method : 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
      }
      const fetchData = await fetch('/path', options);
      const response = await fetchData.json();
      const gotError = 'No path data'
      response.code === 200 ? this.setState({'pathData': this.getPath(response)}) : response.error ? this.setState({'ErrorMessage': gotError}) : this.setState({'ErrorMessage':gotError })
    }
  }
  
  render(){ 

    const { assetData, pathData, tableData, params } = this.state;
    const headData = [ 'Source', 'Time', 'Speed', 'Reason' ];

    return (
      <div>
        <Card className='path_container' sx={{ width: 445 , height : 340}}>
          <CardHeader 
            action={
              <FullScreen type='path' data={this.props.data}/> 
          }/>  
          <CustomTable head={headData} body={pathData} fullpath={false} />
          <CardActions onClick={()=>this.handleApiCall(params)} disableSpacing className="cardActions">
            <Button size="small">GET</Button>
          </CardActions>
        </Card>
      </div>
      )
  }
}