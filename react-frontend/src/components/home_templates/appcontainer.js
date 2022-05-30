import React, { Component } from 'react';
import './appcontainer.css';
import Stack from '@mui/material/Stack';
// import AppBarMenu from './appbarmenu.js';
// import Settings from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import Logout from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import TabMaster from '../tabmaster/tabmaster.js';
import MainControlPanel from '../control_panel/parent.js';
import MainMenu from '../asset_contents/menu/menu.js';
import BusinessIcon from '@mui/icons-material/Business';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default class AppContainer extends Component {
	constructor (props){
		super(props)
		this.state = { 
			assetData: this.props.mainData,
			displayData:'',
			gpsData : '',
			searchData:{},
			buttonRef: null,
			menuOpen: false,
			switchaccountModalOpen:false,
			accountCode:'',
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

  	convertStrToB64(str) {
    if ( this.validate(str) ){
      let strEnc = `${str}_mandelbrot_set`;
      return window.btoa(unescape(encodeURIComponent( strEnc )));
    }
      return str
 	}

  	buttonRef =(e)=>{
  		this.setState( {buttonRef: e.currentTarget, menuOpen: true});
  	}


  	removeRef =()=>{
  		this.setState({ buttonRef: null, menuOpen: false})
  	}


	searchedList = ( data, query)=>{ //..
		const bank = {};
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


	validateAccountCode (e){
	    const val = e.target.value;
	    if (this.validate(val) && val.length > 4) {
	       this.setState({accountCode: val});
	    }
	}


	processNewData(data){
		this.setState({displayData: data})
	}


	switchaccountModalClose(){
		this.setState({switchaccountModalOpen:false});
	}


	switchaccountModalOpen(){
		this.setState({switchaccountModalOpen:true});

	}
	// showSwitchaccountModal

	handleSubmitFromModal (){
		const {accountCode} = this.state;
		localStorage.setItem('customer', this.convertStrToB64(accountCode) );
	    window.location.reload();

	}

	handleSearch = (e)=>{
		this.searchedList( this.props.mainData , e.target.value);
	}


	render(){
		const { displayData, assetData, switchaccountModalOpen, menuOpen, buttonRef } = this.state;
		const account_code = this.convertB64ToStr( localStorage.getItem('customer')).split('_')[0];
		const logout = ()=> {
			localStorage.clear();
			window.location.reload();
		}
		// console.log(displayData)
		const activeAssetList = ()=>{
			const payload = {};
			for(let i in assetData){
				if (assetData[i].child.status == 1){
					payload[i] = assetData[i]
				}
			}
			return payload;
			// console.log(assetData)
		}
		const items = [
			{icon: <SwapHorizOutlinedIcon fontSize="small"/>, name: 'Switch account', func: ()=>this.switchaccountModalOpen()},
			{icon: <Logout fontSize="small"/> , name: 'Logout', func: logout },
		];
		const defaultActiveList = this.validate(displayData) ? displayData : activeAssetList() ;
		// console.log(defaultActiveList)

		return(
			<div className='app_container'>
				<Stack spacing={15}>
					<div id="main-app-bar">
						<AppBar position='static'>
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
							<MainMenu
								menuItems={items} 
								close={this.removeRef} 
								open={menuOpen} 
								anchor={buttonRef}
							>
							</MainMenu>
								<Dialog
					        open={switchaccountModalOpen}
					        onClose={()=>this.switchaccountModalClose()}
					      >
					        <DialogTitle>
					          {"Enter account code below."}
					       </DialogTitle>
					        <DialogContent>
						        <TextField
						          autoFocus
						          onChange={(e)=>this.validateAccountCode(e)}
						          margin="dense"
						          id="customer"
						          label="Account code"
						          type="text"
						          fullWidth
						          variant="standard"
						          />
					        </DialogContent>
					        <DialogActions>
						        <Button onClick={()=>this.handleSubmitFromModal()} autoFocus>
						          submit
						        </Button>
					        </DialogActions>
					    	</Dialog>
						</AppBar>
					  <MainControlPanel title={'Filters'} data={assetData} newdata={(data)=>this.processNewData(data)} />
			  </div>
				<TabMaster id="tab-master-container" getsearch={this.handleSearch} data={ defaultActiveList }/>
			</Stack>
			</div>
			)
	}
}