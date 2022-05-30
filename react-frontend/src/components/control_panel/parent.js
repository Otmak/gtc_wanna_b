import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import MainMenu from '../asset_contents/menu/menu.js';
import ChildControlPanel from './child.js';
import Settings from '@mui/icons-material/Settings';
//Asset list filter
//List type switch:/


export default class MainControlPanel extends Component {
	constructor(props){

		super(props)
		this.state = {
			data: "",
		}
	}


	handleSelection(e){
		const {data} = this.props;
		const selectedType = e === 'active'? '1': '2';
		const assetList = {};

		for ( let i in data ){
			const status = data[i].child.status;
			if (status == selectedType){//active
				assetList[i] = data[i];
			}
		}
		return  this.props.newdata(e === 'all' ? data : assetList)
	}


	validate (value) {
		return value === '' || value === undefined || value === null ? false : true;
	}


	render(){
		// console.log(this)
		// const assetListType = [{name: 'TabList'}, {name:'SearchList'}];
		// const assetStatus = [{name: 'active'}, {name:'inactive'}, {name: 'all'}];
		return (
	  	<AppBar position="static">
	      <Accordion>
	        <AccordionSummary
	          expandIcon={<Settings />}
	          aria-controls="panel1a-content"
	          id="panel1a-header"
	        >
	          <Typography>{this.props.title}</Typography>
	        </AccordionSummary>
	        <AccordionDetails className="accordion-container">
	        	<ChildControlPanel title="STATUS" selected={(e)=>this.handleSelection(e)} />
	        	{/*<ChildControlPanel title="Asset Status" items={assetStatus} />*/}
	        	{/*<ChildControlPanel title="somthi.." items={items} />*/}
	        	{/*<MainMenu menuItems={items} close={this.removeRef} open={menuOpen} anchor={buttonRef}/ >*/}

	        </AccordionDetails>
	      </Accordion>
	    </AppBar>
		)
	}
}