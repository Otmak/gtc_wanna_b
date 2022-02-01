import React, {Component} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material//Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './table.css';


export default class CustomTable extends Component {
	_isMounted = false
	constructor(props){
		super(props)
		this.state = {
		  assetData : this.props.data,
		  ErrorMessage: '',
		}
}


validate (value) {
return value === '' || value === undefined || value === null ? false : true;
	}


componentDidMount(){
	this._isMounted = true;
}


parseFullTable(data) {
	let cache = {};
	// let 
	// for (let event in data ){

	// 	if ()
	// }

}


parseTableCell ( data ) {
	const tableCell = new Array();
	// console.log('TABLE data is:',data)
	// const jj = [];
	if (this._isMounted && this.validate(data))
	{
		// console.log('length is',data)
		const lengthOfData =  5;//TO limit the number of rendered rows
		for ( let item = 0; item < data.length ; item ++ ){
			// console.log(data[item])
	  		if ( this.validate(data[item].time) ) {
	  			tableCell.push( 
	  				<TableRow hover role="checkbox" tabIndex={-1} key={item} >
	  					<TableCell > {data[item].source} </TableCell>
	  					<TableCell > {data[item].time} </TableCell>
	  					<TableCell > {data[item].speed} </TableCell>
	  					<TableCell > {data[item].reasons} </TableCell>
	  				</TableRow>
	  				)
	  		}else{
	  			tableCell.push ( <TableCell key={ item } align="right"> { data[item] } </TableCell> )
	  		}
	  	}
	}
	return tableCell;
}


render(){ 
	// console.log(this.props)
return (
  	<TableContainer sx={{ maxHeight: this.props.maxheight }} className="table-container" >
  		<Table stickyHeader aria-label="sticky table">
  			<TableHead>
  				<TableRow>
  					{ this.parseTableCell ( this.props.head)}
  				</TableRow>
  			</TableHead>
  			<TableBody>
  				{ this.parseTableCell( this.props.body )}
  			</TableBody>
  		</Table>
  	</TableContainer>
  )
}
}