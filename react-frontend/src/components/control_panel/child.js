import React, { Component } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import MainMenu from '../asset_contents/menu/menu.js';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Settings from '@mui/icons-material/Settings';
// import AppContainer from './components/home_templates/appcontainer.js';
// separation of active vs inactive.
// control panel
	// Search.
// postgesQL
export default class ChildControlPanel extends Component {
  constructor(props){

    super(props)
    this.menuRef = React.createRef()
    this.state = {
      // whatsTheWord: 'mandelbrot_set',
      LoginErrorMessage : '',
      buttonRef: null,
      selected: '',

    }
  }


validate (value) {
    return value === '' || value === undefined || value === null ? false : true;
}

buttonRef =(e)=>{
  	console.log('open sesemi', e);
  	// this.setState( {buttonRef: e.currentTarget, menuOpen: true});
}


removeRef =()=>{
  	console.log('closing sesemi');
  	// this.setState({ buttonRef: null, menuOpen: false})
}

handleChange=(e)=>{
	const value = e.target.value;
	this.setState({selected: value})
	return this.props.selected(value)
	
}

active(){
	console.log('asset active');
}

inactive(){
	console.log('asset inactive');
}

all(){
	console.log('all asset data');
}

// parseMenu(items){
// 	const i = (items.map((item)=>{
// 			<MenuItem key={item.name}>{item.name}</MenuItem>
// 		}))
// 	console.log(items,i)

// }

render(){
	// console.log('panel child', this)

	const menuList = [<MenuItem value="active" key="active">Active</MenuItem>,<MenuItem value="inactive" key="inactive">Inactive</MenuItem>,<MenuItem value="all" key="all">All</MenuItem>,];
	// const checkRef = ()=>{
	// 	return this.validate(this.menuRef)? this
	// }
	const {selected, fullscreen, buttonRef} = this.state;
	const items = [{name: 'active', func: ()=>this.active()}, {name:'inactive', func: ()=>this.inactive()}, {name: 'all', func: ()=>this.all()}];
	return (
		<div>
		  <FormControl required sx={{ m: 1, minWidth: 120 }}>
		    <InputLabel id="selected-input">{this.props.title}</InputLabel>
		    <Select
		    	// ref={this.menuRef}
		    	labelId="select-label"
		    	id="select-id"
		    	value={selected}
		    	label={`${this.props.title} `}
		    	onChange={(e)=>this.handleChange(e)}
		    >
		    	{/*<MainMenu menuItems={ items } close={()=>this.removeRef()} open={true} anchor={this.myRef} />*/}
		    	{/*<MenuItem> items<MenuItem/>*/}
		 {/*   	{items.map((item)=>{
		    		<MenuItem key={item.name}>{item.name}</MenuItem>
		    	})}*/}
		    	{/*<MenuItem>Active</MenuItem>
		    	<MenuItem>Inactive</MenuItem>
		    	<MenuItem>All</MenuItem>*/}
		    	{/*{this.parseMenu(items)}*/}
		    	{menuList}
		    </Select>
		    <FormHelperText>Select asset status</FormHelperText>
		  </FormControl>
		</div>
	)
	}
}