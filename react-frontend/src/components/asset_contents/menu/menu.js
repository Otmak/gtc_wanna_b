// Make MEnu Comp Rusable.
import React, { Component } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';


export default class MainMenu extends Component {
	constructor(props){
		super(props)
		this.state={
			open:false,
			anChor:this.props.anchor
		}
	}
	

	handleClose (){
		if( this.validate( this.props.fullscreenSHORT ) ){
			return this.props.fullscreenSHORT();
		}
		return this.props.close();
	}


	validate (value) {
		return value === '' || value === undefined || value === null ? false : true;
	}


	render(){
		// console.log('Rendering MENU**', this)
		const {anChor} = this.state;
		const menuItems = this.validate(this.props.menuItems)? this.props.menuItems : [];

		return (
				<Menu
				    anchorEl={this.props.anchor}
				    id="table-menu"
				    open={this.props.open}
				    onClose={()=>this.handleClose()}
				    PaperProps={{
		          elevation: 0,
		          sx: {
		            overflow: 'visible',
		            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
		            mt: 1.5,
		            '& .MuiAvatar-root': {
		              width: 32,
		              height: 32,
		              ml: -0.5,
		              mr: 1,
		            },
		            '&:before': {
		              content: '""',
		              display: 'block',
		              position: 'absolute',
		              top: 0,
		              right: 14,
		              width: 10,
		              height: 10,
		              bgcolor: 'background.paper',
		              transform: 'translateY(-50%) rotate(45deg)',
		              zIndex: 0,
		            },
		          },
			        }}
				    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			 	 >
			  	  {menuItems.map((item)=>
			   
			      <MenuItem key={item.name} onClick={()=>item.func()}>
			        <ListItemIcon>
			          {item.icon }
			        </ListItemIcon>
			         { item.name }
			      </MenuItem>
			      )}
				</Menu>
	)}
}
