import React, { Component } from 'react';
import NoData from '../nodata/nodata.js';
import MainMenu from '../menu/menu.js';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import './card.css';


export default class DefaultCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      assetData :{},
      errorMessage : this.props.message,
      params : '',
      buttonRef: null,
      fullscreen:false,
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

  fullScreen(){
    console.log('Fullscreen in card.', this)
    return this.props.fullscreen();
  }

  removeRef(){
    this.setState({removeRef: null, fullscreen:false})
    // this.props.fullscreenSHORT();
    if(this.props.fullscreenSHORT){
      this.props.fullscreenSHORT();
    }
  }

  showMenu = (e)=>{
    // console.log('Displaying MEnu. in card.', e.currentTarget)
    this.setState({fullscreen:true, buttonRef : e.currentTarget})
  }


  parseContent(){
    // const { errorMessage } = this.state;
    if ( this.props.message ){
      return <NoData message={this.props.message}/>
    }
    if ( this.props.custom ){ //is card custom?
      return this.props.cardData 
    }
    return this.parseCardCells( this.props.cardData , this.props.colors ); //default.
  }

  render () {
    const { errorMessage, fullscreen, buttonRef } = this.state;
    // const items = [{icon:<FullscreenIcon fontSize="small"/> ,name:'Fullscreen'},];
    // LIST of work 1.apearance 2.Basicfunctionality 3.
    // card
    // header
    //CardData fullscreen
    // actions
// color="inherit" aria-label="open drawer" edge="end"

    const cleanItems = this.validate(this.props.children) ? this.props.children : [] ;

    return (
      <Card style={{'height':'100%'} }className="default_container">
        <CardHeader sx={{'height': '5%'}}
        	subheader={ `${this.props.title}` }
        	action={ <IconButton onClick={ this.showMenu} > <MoreVertIcon/> </IconButton> } 
        />
        <MainMenu
          menuItems={ cleanItems } 
          close={()=>this.removeRef()} 
          open={fullscreen} 
          anchor={buttonRef}
        />
        <Divider />
        <CardContent sx={{'height': '65%'}}>
          { this.parseContent() }
        </CardContent>
        <Divider />
        <CardActions sx={{'height': '10%'}}> 
        	<IconButton onClick={this.handlecall} > <Button size="small">GET</Button> </IconButton>
        </CardActions>
     </Card>
  )}
}
