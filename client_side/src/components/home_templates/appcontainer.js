import React, { Component } from 'react';
import './appcontainer.css'
import AppBar from '@mui/material/AppBar';
import TabMaster from '../tabmaster/tabmaster.js';


export default class AppContainer extends Component {
	constructor (props){
		super(props)
		this.state = { 
			assetData: this.props.mainData,
			gpsData : '',
		}
	}

	render(){
		const { assetData } = this.state;
		// console.log('from state', assetData)

		return(
			<div>
				<AppBar>
					<p> menu </p>
				</AppBar>
				<div className='space'/>
				<TabMaster data={assetData}/>
			</div>
			)
	}
};