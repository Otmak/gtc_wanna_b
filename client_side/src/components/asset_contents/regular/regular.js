import React, { Component } from 'react';
import NoData from '../nodata/nodata.js';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
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


  parseCardCells (data, temp ) {

    if (this.validate(data)){
      const cardCells = new Array();

      for (let cell in data ){
        const capitalizedCell = cell;
        cardCells.push( <Divider/> );
        cardCells.push(
            <ListItem secondaryAction={ data[cell] } >
              <ListItemText >
                <Typography variant="subtitle2" color="text.secondary"> {capitalizedCell} </Typography>
              </ListItemText>
            </ListItem>
          );
            // <ListItem secondaryAction={ <Chip label={ data[cell] } /> } >
            //   <ListItemText primary={capitalizedCell} />
            // </ListItem>      
      }
      return cardCells;
    }
  }

  render () {
    const { errorMessage } = this.state;
    return (
      <Card style={{'height':'100%'} }className="default_container">
        <CardHeader action={ <MoreVertIcon/> } />
        <CardContent>
          { 
            !this.validate(errorMessage) && this.parseCardCells(this.props.celldata, "")
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
