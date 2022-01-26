import React, {Component} from 'react';
import './asset_container.css';
import Path from '../path/path.js';
import Location from '../location/location.js';


export default class AssetContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      assetData : this.props.data,
    }
  }
  render(){ 
    console.log(this.props)


    const { assetData } = this.state; 

    return (
      <div className="asset_conatiner">
        <Path data={assetData} id={this.props.id} gps={this.props.gps} />
        <Location data={assetData} id={this.props.id} />
      </div>
      )
  }
}