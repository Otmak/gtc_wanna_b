import React, {Component} from 'react';
import Table from '@mui/material//Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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


	parseTableCell ( data ) {
		const tableCell = new Array();
		// console.log('TABLE data is:',data)
		if (this._isMounted && this.validate(data))
		{
			// console.log('length is',data)
			const lengthOfData =  5;//TO limit the number of rendered rows
			for ( let item = 0; item < data.length ; item ++ ){
				// console.log(data[item])
		  		if ( this.validate(data[item].time) ) {
		  			tableCell.push( 
		  				<TableRow key={item} >
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
    return (
      <div>
      	<TableContainer component={Paper} className='tableContainer'>
      		<Table>
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
      </div>
      )
  }
}