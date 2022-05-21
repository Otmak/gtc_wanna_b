import React, { Component } from 'react';
import Chart from 'chart.js/auto';



export default class LineChart extends Component{
	chartRef = React.createRef();
	constructor(props){
		super(props)
	}


	validate (value) {
    	return value === '' || value === undefined || value === null ? false : true;
  	}


	componentDidMount(){

		const mainLabels = this.props.labels;
		const engHours = this.props.data.egnhrs;
		const fuelData = this.props.data.fuel;

		if (this.validate(mainLabels)){	

			const ctx = this.chartRef.current.getContext("2d");
			new Chart(ctx, {
				type: "line",
				data: {
					labels: mainLabels,
					datasets: [{ 
						data: fuelData,
						label: "Fuel",
						borderColor: "#1976d2",
						borderWidth:1,
						backgroundColor: "#7bb6dd",
						fill: false,
					}, { 
						data: engHours,
						label: "Engine hours",
						borderColor: "#3cba9f",
						// radius: 0,
						borderWidth:1,
						backgroundColor: "#71d1bd",
						fill: false,
					}]
				},
			});
		}
	}

	render(){
		return(
			<div>
				<canvas
					id="myChart"
					ref={this.chartRef}
				/>
			</div>
		)
	}
}