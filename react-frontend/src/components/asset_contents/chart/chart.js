import React, { Component } from 'react';
import Plot from 'react-plotly.js';


export default class Chart extends Component{
	constructor(props){
		super(props)
	}


	validate (value) {
    	return value === '' || value === undefined || value === null ? false : true;
  	}

	// componentDidMount(){

	// 	const mainLabels = this.props.labels;
	// 	const engHours = this.props.data.egnhrs;
	// 	const fuelData = this.props.data.fuel;

	// }

	render(){

		// console.log(<Plot/>)
		return(
			<Plot 
				data={[
          {
            x: this.props.labels,
            y: this.props.data.egnhrs,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
            name: 'EngHrs ()'
          },
          {type: 'bar', x: this.props.labels, y: this.props.data.fuel, name: 'Fuel()'},
        ]}
        layout={ {width: 420, height: 310, title: ''} } 
        config={{ scrollZoom:true }}  
      />
		)
	}
}