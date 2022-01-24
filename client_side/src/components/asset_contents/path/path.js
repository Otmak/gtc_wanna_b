import React, {Component} from 'react';
import Card from '@mui/material/Card';
import FullScreen from '../fullscreen/fullscreen.js';
import './path.css';


export default class Path extends Component {
  constructor(props){
    super(props)
    this.state = {
      assetData : this.props.data,
    }
  }

  makeApiCall = async () =>{

  }

  
  render(){ 

    return (
      <div>
        <Card>
        	<FullScreen type='path' data={this.props.data}/>
        </Card>
      </div>
      )
  }
}