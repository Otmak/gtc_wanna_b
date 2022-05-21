import React, { Component } from 'react';
import NoData from '../nodata/nodata.js';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import './defaultcard.css';


export default class DefaultCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      assetData :{},
      errorMessage : this.props.message,
      params : '',
    }
  }


  validate (value) {
    return value === '' || value === undefined || value === null ? false : true;
  }


  handlecall =()=>{
    // console.log('logging', this.props)
    if ( this.validate(this.props.handlecall) ){
      this.props.handlecall();
    }
  }


  parseTextOrChip (str, opt ) {
    // const colors = {
    // }

    
    if ( this.validate(opt) && opt[str] ) {
      console.log('Setting up chip',str, str)
      return<Chip color={opt[str].color} label={ str } />
    }

    return str
  }


  parseCardCells ( data, opt ) {

    if (this.validate(data)){

      
      const cardCells = [];
      let k = 0;


      for (let cell in data ){
        const capitalizedCell = cell;
        // console.log(data[cell])
        // console.log('Now creating cells...', data, opt)

        // cardCells.push( <Divider/> );
        cardCells.push(
            <ListItem key={k} secondaryAction={ this.parseTextOrChip( data[cell], opt ) } >
              <ListItemText >
                <Typography variant="subtitle2" color="text.secondary"> {cell} </Typography>
              </ListItemText>
            </ListItem>
          );
            // <ListItem secondaryAction={ <Chip label={ data[cell] } /> } >
            //   <ListItemText primary={capitalizedCell} />
            // </ListItem>     
        k++; 
      }
      return cardCells;
    }
    return "";
  }


  render () {
    const { errorMessage } = this.state;

    // console.log(this.props)
    return (
      <Card style={{'height':'100%'} }className="default_container">
        <CardHeader action={ <MoreVertIcon/> } />
        <CardContent>
          { 
            !this.validate(errorMessage) && this.parseCardCells( this.props.celldata , this.props.colors )
          }
          {
            this.validate(this.props.message) && <NoData message={this.props.message}/>
          }
        </CardContent>
        <Divider />
        <CardActions onClick={this.handlecall} > 
        <Button size="small">GET</Button>
        </CardActions>
     </Card>
  )}
}
