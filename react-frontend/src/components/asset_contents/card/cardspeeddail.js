import React, { Component } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FullscreenIcon from '@mui/icons-material/Fullscreen';


export default class CardSpeedDail extends Component {
	constructor(props){
	super(props)
	this.state={}
	}

	actions(){
		const cardActions = [ { icon: <FullscreenIcon />, name: 'fullscreen' },];
		cardActions.map((a)=>
			<SpeedDialAction
			    key={a.name}
			    icon={a.icon}
			    tooltipTitle={a.name}
			/>)
	}

	render(){

		 return (
		   <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
		   
		     <Box sx={{ position: 'relative', mt: 3, height: 320 }}>
		       <SpeedDial
		          ariaLabel="SpeedDial"
		          icon={<MoreVertIcon />}
		          direction={'left'}
		          classes="action-handle"
		       >
		       {this.actions()}

		      </SpeedDial>
		     </Box>
		   </Box>
	)}
}
