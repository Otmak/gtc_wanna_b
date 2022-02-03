import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
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
      errorMessage : '',
      params : '',
    }
  }


  validate (value) {
    return value === '' || value === undefined || value === null ? false : true;
  }


  parseCardCells (data, jay ) {

    if (this.validate(data)){
      const cardCells = new Array();

      for (let cell in data ){
        const capitalizedCell = cell;
        cardCells.push(
          <MenuItem>
            <ListItemText primary={capitalizedCell} secondary={""}/>
            <Typography variant="body2" color="text.secondary">
              { <Chip label={ data[cell]} /> }
            </Typography>
          </MenuItem>
          );
        cardCells.push( <Divider/> );
      }
      return cardCells;
    }
  }


  render () {
    const { errorMessage } = this.state;
    return (
      <Card style={{'height':'100%'} }className="default_container">
      <CardHeader/>
      {
        this.parseCardCells(this.props.celldata, "")
      }
        <Divider />
        <CardActions> 
        <Button size="small">GET</Button>
        </CardActions>
     </Card>
  )}
}
