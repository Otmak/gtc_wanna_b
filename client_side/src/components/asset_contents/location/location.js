import React, {Component} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Map from '../map/map.js';
import './location.css';


export default class Location extends Component {
  constructor(props){
    super(props)
    this.state = {
      assetData : this.props.data,
    }
  }

  // makeApiCall = async () =>{
  // }
  
  render(){ 
    console.log(this.props)
    return (
      <div>
        <Card sx={{ width: 445 }}>
          <CardMedia
            height ="140"
          >
            <Map/>
          </CardMedia>

          <CardContent>
            <h1> {'Location'} </h1>
            <p> {'time is right'} </p>
          </CardContent>
          <CardActions>
            <Button size="small">GET</Button>
          </CardActions>
        </Card>
      </div>
      )
  }
}