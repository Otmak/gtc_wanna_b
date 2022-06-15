import React, {Component} from 'react';
// import Paper from '@mui/material/Paper';
import Table from '@mui/material//Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
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


	// genColorServices(r){
	// 	// console.log(r)


	// }


	pathColorServices(r){

		const rSplit = r.split(',');
		const pathReasons = {
			0: 'Reserved and invalid',
			1:	'Input 1 state change',
			2:	'Input 2 state change',
			3:	'Input 3 state change',
			4:	'Input 4 state change',
			5:	'Input 5 state change',
			6:	'Cold Start',
			7:	'Power Off',
			8:	'Geofence',
			9:	'Motion Stop',
			10:	'Motion Start',
			11:	'Standard Event',
			12:	'Power On',
			13:	'Panic'
		}

		const coloredReasons = {
			6:"error",
			12:"success",
			7:"default",
			11:"info",
			7:"warning",
			10:"secondary",
			
		}

		let counter = 0;
		let reason = '';

		for (let i = 0; i < rSplit.length; i++ ){
			if (rSplit.length === 1){
				return (
				<Tooltip key={i} title={ pathReasons[rSplit[i]] } followCursor>
					<Chip key={i} color={ coloredReasons[ rSplit[i] ] } label={r} />
		 		</Tooltip>
				)}
			reason += ` ${pathReasons[rSplit[i]]}`;
		}

		return (
			<Tooltip key={reason} title={ reason } followCursor>
				<Chip key={`${reason}1`} color={ coloredReasons[ rSplit[0] ] } label={r} />
	 		</Tooltip>
			)
	}


	componentDidMount(){
		this._isMounted = true;
	}


	decorationService(cont, data){// styling of table cells.

		const cells = [];
		for ( let i=0; i<cont.length; i++ ){ // DRY?
			// console.log(cont[i], data[cont[i]])
			if ( cont[i] ==='reasons'){ // path styling.
				cells.push( <TableCell key={i}> { this.pathColorServices( data[cont[i]] ) } </TableCell> );		
			}
			// else if ( cont[i] ==='label' ){//data[cont[i]] === 'GDT 59999'
			// 	console.log()
			// 	cells.push( <TableCell key={i}> { this.genColorServices( data[cont[i]] ) } </TableCell> );
			// 	// console.log( 'found string', data[cont[i]] )
			// 	// if ( data[cont[i]] === 'GDT 59999'){ // 


			// 	// 	// cells.push( <TableCell key={i}> { this.genColorServices( data[cont[i]] ) } </TableCell> );
			// 	// }
			// }
			else{
				cells.push( <TableCell key={i}> {data[cont[i]]} </TableCell> );
			}

			// if ( cont[i] ==='string' ){ //gendata styling.
			// 	console.log(data.)
			// }

			// cells.push( <TableCell key={i}> {data[cont[i]]} </TableCell> );
			// if ( cont[i] ==='string' ){
			// 	console.log(data.)
			// }

		}
		// console.log(cells)
		return cells;
	}


	parseFullTable ( head, body, bodyContains){ //generate head and bdy septly, parse them as one.

		if (this.validate(head) && this.validate(body)){

			let headData = [];
			let bodyData = [];
			let fullTable = [];
			let bodyLength = body.length;
			if (this.validate(this.props.bodylength )){
				bodyLength =  body.length < this.props.bodylength ? body.length : this.props.bodylength;
			}
			// console.log(bodyLength)
			for ( let i =0; i < head.length; i++ ) { // generate head.
				headData.push( <TableCell key={ i } align="left"> { head[i] } </TableCell> )
			}


			for ( let i =0; i < bodyLength; i++ ){// generate each row.
				bodyData.push( 
			  	<TableRow hover role="checkbox" tabIndex={-1} key={i} >
			  		{ this.decorationService( bodyContains, body[i] ) } 
					</TableRow>
				 )
			}
			// console.log('while parsing',this)
			fullTable.push(
				  <Table key={this.props.id} stickyHeader aria-label="sticky table">
		  			<TableHead>
		  				<TableRow>
		  					{headData}
		  				</TableRow>
		  			</TableHead>
		  			<TableBody>
		  				{bodyData}
		  			</TableBody>
		  		</Table>
				);
			return fullTable;
		}
	}


	render(){ 
		// console.log(this.props)
		return (
		  	<TableContainer key={this.props.id}  sx={{ maxHeight: this.props.maxheight }} className="table-container" >
		  		{ this.parseFullTable( this.props.head, this.props.body, this.props.bodycount) }
		  	</TableContainer>
		  )
	}
}