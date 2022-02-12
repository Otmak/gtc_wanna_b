import React, {Component} from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import Chip from '@mui/material/Chip';



export default class NoData extends Component {
  _isMounted = false
  constructor(props){
    super(props)
    this.state = {
      errorMessage: this.props.message,
    }
  }


  validate (value) {
    return value === '' || value === undefined || value === null ? false : true;
  }

  
  render(){
    const { errorMessage } = this.state;
    return (
		<Paper elevation={0} sx={{ height : 'inherit', width: "inherit"}} >  
			<AnnouncementOutlinedIcon sx={{ fontSize: 204, color: "rgb(229 227 227 / 60%)", marginLeft:"25%" }}/>
			<Typography align="center" variant="h5" color="text.secondary"> {errorMessage} </Typography>
		</Paper> 
      )
  }
}