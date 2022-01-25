import React, {Component} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import FullScreen from '../fullscreen/fullscreen.js';
import CustomTable from '../table/table.js';
import './path.css';


export default class Path extends Component {
  constructor(props){
    super(props)
    this.state = {
      assetData : this.props,
      pathData : [],
      ErrorMessage: '',
    }
  }

  handleApiCall = async (e) => {

    let options = 
    {
      method : 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body : JSON.stringify()
    }

    const fetchData = await fetch('/asset', options);
    const response = await fetchData.json();

    if (response.code === 200) 
    {
      this.setState( { 'pathData' : response.data} );
    }else if (response.error)
    {
      this.setState( {'ErrorMessage' : response.error.message } );
    }else
    {
      this.setState( {'ErrorMessage' : response.data.message } );      
    }
  }

  
  render(){ 
    console.log(this.state)
        const table_data = [
 
      {
       "lat": 26.1061566,
       "lng": -80.2593472,
       "time": "2009-07-23 11:14:03-07",
       "speed": "0.0",
       "heading": "N",
       "reasons": "6,12,9",
       "distance_traveled": 0,
       "odometer": 209.2,
       "loadts": "2009-07-23 11:21:01.708821-07"
      },
      {
       "lat": 26.1061934,
       "lng": -80.2592703,
       "time": "2009-07-23 11:36:45-07",
       "speed": "0.0",
       "heading": "N",
       "reasons": "12,9",
       "distance_traveled": 0,
       "odometer": 209.2,
       "loadts": "2009-07-23 11:36:49.265859-07"
      },
      {
       "lat": 26.1061886,
       "lng": -80.2592818,
       "time": "2009-07-23 11:43:04-07",
       "speed": "0.0",
       "heading": "N",
       "reasons": "12,9",
       "distance_traveled": 0,
       "odometer": 209.2,
       "loadts": "2009-07-23 11:45:51.421893-07"
      },
      {
       "lat": 26.106154,
       "lng": -80.2592971,
       "time": "2009-07-23 11:45:24-07",
       "speed": "9.5",
       "heading": "W",
       "reasons": "12,10",
       "distance_traveled": 0,
       "odometer": 209.2,
       "loadts": "2009-07-23 11:45:51.421893-07"
      }
      ]


    const { assetData, pathData } = this.state;
    const headData = [ 'Source', 'Time', 'Speed', 'Reason' ]

    return (
      <div>
        <Card className='path_container' sx={{ width: 445 , height : 340}}>
        	<FullScreen type='path' data={this.props.data}/>    
          <CustomTable head={headData} body={table_data} />
          <CardActions position ='fixed'>
            <Button size="small">GET</Button>
          </CardActions>
        </Card>
      </div>
      )
  }
}