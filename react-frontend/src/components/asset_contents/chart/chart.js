import React, { Component } from 'react';
import Plot from 'react-plotly.js';


export default class Chart extends Component{
	constructor(props){
		super(props)
	}

	validate (value) {
    	return value === '' || value === undefined || value === null ? false : true;
  	}

	render(){

		// console.log(this)
		return(
			<Plot 
				data={[{type: this.props.type, x: this.props.labels, y: this.props.data, name: 'Fuel'},]}
		        layout={ {width: 420, height: 300, title: this.props.title} } 
		        config={{ scrollZoom:true }}  
		      />
		)
	}
}