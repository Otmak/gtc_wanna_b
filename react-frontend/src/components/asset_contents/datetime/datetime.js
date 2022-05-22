import React, {Component} from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default class DateTime extends Component{
	constructor(props){
		super(props)
		this.state = {
			value:'',
			datetime:''
		}
	}

	setDateTime (value){
		// const { datetime, value} = this.state
		this.setState({datetime: value})
	}

	render(){
		const {datetime} = this.state;

		return(
			<LocalizationProvider dateAdapter={AdapterDateFns}>
		      <DatePicker
		        label="Basic example"
		        value={value}
		        onChange={(newValue) => {
		          this.setDateTime(newValue);
		        }}
		        renderInput={(params) => <TextField {...params} />}
		      />
		    </LocalizationProvider>
		)
	}

}