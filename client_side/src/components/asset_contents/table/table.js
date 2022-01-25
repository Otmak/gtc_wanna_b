import React, {Component} from 'react';
import Table from '@mui/material//Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default class CustomTable extends Component {
  constructor(props){
    super(props)
    this.state = {
      assetData : this.props.data,
      ErrorMessage: '',
    }
  }

  parseTableCell ( data ) {
  	const tableCell = new Array();
  	for ( let item = 0; item < data.length; item ++ ){

  		if ( data[item].time ) {
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
  		}}
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