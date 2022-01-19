import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import TabMaster from '../tabmaster/tabmaster.js';


export default class AppContainer extends Component {
	constructor (){
		super()
		this.state = {}
	}

	render(){

		return(
			<div>
				<AppBar>
					<p> menu </p>
				</AppBar>
				<TabMaster>
					<p>some tabs</p>
				</TabMaster>
			</div>
			)
	}
}