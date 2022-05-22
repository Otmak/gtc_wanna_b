import React, { Component } from 'react';
import './appcontainer.css';
// import AppBarMenu from './appbarmenu.js';
import Settings from '@mui/icons-material/Settings';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import Logout from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import TabMaster from '../tabmaster/tabmaster.js';
import MainMenu from '../asset_contents/menu/menu.js';
import BusinessIcon from '@mui/icons-material/Business';
// import Dialog from '@mui/material/Dialog';
// import Button from '@mui/material/Button';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import TextField from '@mui/material/TextField';
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
	     return str;
	    
  	}

  	buttonRef =(e)=>{
  		// console.log('assigning ref...')
  		this.setState( {buttonRef: e.currentTarget, menuOpen: true});
  	}

  	removeRef =()=>{
  		// console.log('removing ref...')
  		this.setState({ buttonRef: null, menuOpen: false})
  	}


	// clearAndLogout(){
	// 	localStorage.clear();
	// 	window.location.reload();
	// }

	// fullscreenLONG(){
	// 	console.log('main menu Long')

	// }
	// fullscreenSHORT(){
	// 	console.log('main meni SHOrt.')

	// }


	searchedList =( data, query)=>{ //AND concept
		// console.log('searching............')
		const bank = {};
		// console.log('running', data, query)
		for ( let i in data ){
			const assetName = data[i].child.fleet;
			if ( query === assetName ){
				bank[i] = data[i];
			}
		}
		if ( Object.keys(bank).length > 0 ){
			return this.setState({ assetData: bank});
		}
		this.setState({ assetData:data});
	}


	handleSearch = (e)=>{
		// const { assetData, searchData} = this.state;
		console.log('Search',e.target.value);
		this.searchedList( this.props.mainData , e.target.value);
	}


	render(){
		const { assetData, menuOpen, buttonRef } = this.state;
		const account_code = this.convertB64ToStr( localStorage.getItem('customer')).split('_')[0];
		const logout = ()=> {
			localStorage.clear();
			window.location.reload();
		}
		const items = [
			{icon: <SwapHorizOutlinedIcon fontSize="small"/>, name: 'Switch account'},
			{icon: <Settings fontSize="small"/>, name: 'Settings',func: ''},
			{icon: <Logout fontSize="small"/> , name: 'Logout', func: logout },
		];
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
					{/*<CardMenu menuItems={items} close={this.removeRef} open={menuOpen} anchor={buttonRef}/>*/}
					<MainMenu
						menuItems={items} 
						close={this.removeRef} 
						open={menuOpen} 
						anchor={buttonRef}
						// fullscreenSHORT={()=>this.fullscreenSHORT()}
						// fullscreenLONG={()=>this.fullscreenLONG()}
					>
		{/*				      <Dialog
						        open={open}
						        onClose={handleClose}
						      >
						        <DialogTitle>
						          {"Enter account code below."}
						       </DialogTitle>
						        <DialogContent>
						        <TextField
						          autoFocus
						          onChange={validateAccountCode}
						          margin="dense"
						          id="customer"
						          label="Account code"
						          type="text"
						          fullWidth
						          variant="standard"
						          />
						        </DialogContent>
						        <DialogActions>
						        <Button onClick={submitFromModal} autoFocus>
						          submit
						        </Button>
						        </DialogActions>
						      </Dialog>*/}
					</MainMenu>
				</AppBar>
				<TabMaster getsearch={this.handleSearch} data={ assetData }/>
			</div>
			)
	}
};