import React, {Component} from 'react';
import Card from '@mui/material/Card';
import './location.css';


export default class Location extends Component {
  constructor(props){
    super(props)
    this.state = {
      assetData : this.props.data,
    }
  }

  makeApiCall = async () =>{

  }
  
  render(){ 
    // console.log(this.props)

    return (
      <div>
        <Card>
        </Card>
      </div>
      )
  }
}