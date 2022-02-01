import React, {Component} from 'react';
import './asset_container.css';
import TrackAndTrace from './trackntrace.js';


export default class AssetContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      assetData : this.props.data,
    }
  }


  render(){ 
    // console.log(this)
    const { assetData } = this.state; 

    return (
      <div className="asset_conatiner">
        <TrackAndTrace data={assetData} id={this.props.id} />
      </div>
      )
  }
}