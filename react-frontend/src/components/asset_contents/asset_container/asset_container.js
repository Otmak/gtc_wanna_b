import React, {Component} from 'react';
import './asset_container.css';
import TrackAndTrace from './trackntrace.js';
import FuelAndDiagnostics from './fuelanddiagnostics.js';
import EvirInspections from './evirinspections.js';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';



export default class AssetContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      assetData : this.props.data,
    }
  }


  render(){ 
    const { assetData } = this.state; 

    return (
      <div className="asset_conatiner">
          <Typography color="text.secondary" variant="h4"> {"GPS Track & Trace"} </Typography><Divider/>
          <TrackAndTrace data={this.props.data} id={this.props.id} />

          <Typography color="text.secondary" variant="h4"> {"Fuel & Diagnostics"} </Typography><Divider/>
          <FuelAndDiagnostics data={this.props.data} id={this.props.id} /> 
          
          <Typography color="text.secondary" variant="h4"> {"Evir Inspection"} </Typography><Divider/>
          <EvirInspections data={this.props.data} id={this.props.id} />
           
      </div>
      )
  }
}