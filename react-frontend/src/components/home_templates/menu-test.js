// Make MEnu Comp Rusable.

import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import ListItemIcon from '@mui/material/ListItemIcon';
import TextField from '@mui/material/TextField';
import Settings from '@mui/icons-material/Settings';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Logout from '@mui/icons-material/Logout';


export default class Menu extends Component {
	constructor(props){
		super(props)
		this.state={}
	}
  // const [open, setOpen] = React.useState(false);
  // const [code, setCode] = React.useState(false);

	handleClickOpen () {
	setOpen(true);
	};

	validate (value) {
	return value === '' || value === undefined || value === null ? false : true;
	}


	convertStrToB64 (str){

	if ( validate(str) ){
	  // let strEnc2 = str + '_' + 'mandelbrot_set' ;
	  let strEnc = `${str}_mandelbrot_set`;
	  return window.btoa(unescape(encodeURIComponent( strEnc )));
	}else{
	  return str
	}
	}


	validateAccountCode (e){

	const cap = e.target.value;
	// console.log(cap)
	if (validate(cap) && cap.length > 4) {
	  // console.log('Qualified.', cap)
	  setCode(cap);
	}
	// console.log(cap)
	}

	// const [anchorEl, setAnchorEl] = React.useState(null);
	submitFromModal (){
	// const data = new FormData(e.currentTarget);
	// console.log( 'sub', e.target.value );
	// console.log('before',localStorage)
	localStorage.setItem('customer',  convertStrToB64(code) )
	// console.log('affter', localStorage)
	// console.log('Submitting ...', code)
	window.location.reload();

	}

	handleClose (){
	props.close();
	setOpen(false);
	// setAnchorEl(null);
	};

	clearAndLogout (){
	localStorage.clear();
	window.location.reload();
	}


	render(){
		const menuItems = this.props.menuItems
		const menu = (
		  <Menu
		    anchorEl={props.anchor}
		    id="account-menu"
		    open={props.open}
		    onClose={handleClose}
		    PaperProps= {styles}
		    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
		    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
		  >
		    {menuItems.map(()=>
		      <MenuItem onClick={handleClickOpen}>
		        <ListItemIcon>
		          {menuItems.icon }
		        </ListItemIcon>
		         { menuItems.name }
		      </MenuItem>
		      )}
		  </Menu>
		)

		return (
			<div>
				{menu}
			</div>
	)}
}
