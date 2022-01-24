import React, { Component } from 'react';
import './appcontainer.css';
import IconButton from '@mui/material/IconButton';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TabMaster from '../tabmaster/tabmaster.js';


export default class AppContainer extends Component {
	constructor (props){
		super(props)
		this.state = { 
			assetData: this.props.mainData,
			gpsData : '',
		}
	}

	clearAndLogout(){
		localStorage.clear();
		window.location.reload();
	}

	render(){
		const { assetData } = this.state;
		// console.log('from state', assetData)

		return(
			<div className='app_container'>
				<AppBar>
					<Toolbar>
						<IconButton 
							aria-haspopup="true"
							onClick={this.clearAndLogout}
							color="inherit"
						>
							<PowerSettingsNewIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<div className='space'/>
				<TabMaster data={assetData}/>
			</div>
			)
	}
};