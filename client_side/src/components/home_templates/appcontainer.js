import React, { Component } from 'react';
import './appcontainer.css';
import AppBarMenu from './appbarmenu.js';
import IconButton from '@mui/material/IconButton';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AppBar from '@mui/material/AppBar';
import MuiAppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import TabMaster from '../tabmaster/tabmaster.js';
import BusinessIcon from '@mui/icons-material/Business';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default class AppContainer extends Component {
	constructor (props){
		super(props)
		this.state = { 
			assetData: this.props.mainData,
			gpsData : '',
			searchData:{},
			buttonRef: null,
			menuOpen: false,
		}
	}


	validate (value) {
    return value === '' || value === undefined || value === null ? false : true;
  	}


	convertB64ToStr (str) {
	    if ( this.validate(str)){
	      return decodeURIComponent(escape(window.atob( str )));
	    }
	    else{
	      return str;
	    }
  	}

  	buttonRef =(e)=>{
  		// console.log(e.currentTarget)
  		this.setState( {buttonRef: e.currentTarget, menuOpen: true});
  	}

  	removeRef =()=>{
  		this.setState({ buttonRef: null, menuOpen: false})
  	}


	clearAndLogout(){
		localStorage.clear();
		window.location.reload();
	}


	handleSearch = (e)=>{
		const {searchData} = this.state;
		this.setState( { searchData: ''})
	}


	render(){
		const { assetData, searchData, menuOpen, buttonRef } = this.state;
		// console.log('Logging...:: ',this)
		// const searchedList = ( data, query)=>{ //AND concept
		// 	const bank = {};
		// 	// console.log('running', data, query)
		// 	for ( let i in data ){
		// 		// console.log(data[i].child.fleet.length)
		// 		const assetName = data[i].child.fleet;

		// 		if (query === data[i]){
		// 			bank[i] = data[i]
		// 		}
		// 		// const current = data[i].child.fleet;
		// 	}
		// 	// console.log( Object.keys(bank).length )
		// 	return Object.keys(bank).length > 0 ? bank :data;
		// }
		// console.log('APP cointainer', searchedList (assetData, searchData));
		// console.log( Object.keys(this.state.assetData).length );
		// console.log('APP cointainer', searchedList (assetData, searchData)) 

		const account_code = this.convertB64ToStr( localStorage.getItem('customer')).split('_')[0]
		// console.log(account_code)
		return(
			<div className='app_container'>
				<AppBar>
					<Toolbar>
						<Typography
							variant="h6" 
							sx={{ flexGrow: 1 }}
							aria-haspopup="true"
							// onClick={this.clearAndLogout}
							color="inherit"
						>
							Zpeek.v3
						</Typography>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="end"
							onClick={this.buttonRef}
						>
							<BusinessIcon/> <Typography>{ account_code }</Typography> <ArrowDropDownIcon/>
						</IconButton>
					</Toolbar>
				</AppBar>
				<AppBarMenu close={this.removeRef} open={menuOpen} anchor={buttonRef}/>
				<TabMaster getsearch={this.handleSearch} data={ assetData }/>
			</div>
			)
	}
};