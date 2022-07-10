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
import Badge from '@mui/material/Badge';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import './card.css';

// cards should 👀
  // register funcgtion from its child and send it to its parent.


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
    if ( this.validate(this.props.handlecall) ){
      this.props.handlecall();
    }
  }
    parseTextOrChip (str, opt ) {

    if ( this.validate(opt) && opt[str] ) {
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
        k++; 
      }
      return cardCells;
    }
    return "";
  }

  fullScreen(){
    return this.props.fullscreen();
  }

  removeRef(){
    this.setState({removeRef: null, fullscreen:false})
    if(this.props.fullscreenSHORT){
      this.props.fullscreenSHORT();
    }
  }

  showMenu = (e)=>{
    this.setState({fullscreen:true, buttonRef : e.currentTarget})
  }

  loading(){
    {/*const m = <div>*/}
    return (
      <Box sx={{'height': '75%'}} >
        <Skeleton variant="string" height={220}/>
        <Skeleton animation="wave"  height ={20}/>
        <Skeleton animation="wave" width="60%" height ={15}/>
      </Box>
      )
  }


  parseContent(){
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
    const items = this.validate(this.props.children) ? this.props.children : [] ;
    const content = ()=>{
      const d = ( <CardContent sx={{'height': '65%'}}>{ this.parseContent() }</CardContent> );
      let e = ( <NoData message={this.props.message}/> );
      let p = this.validate(this.props.cardData) ? d : this.validate(this.props.message) ? e : this.loading();

      return p;
    }


    return (
      <Card style={{'height':'100%'} }className="default_container">
        <CardHeader sx={{'height': '5%'}}
        	subheader={ this.validate(this.props.title)? `${this.props.title}`:'...' }
        	action={ <IconButton onClick={ this.showMenu} > <Badge badgeContent={this.props.announcement? 1: 0} color="success"> <MoreVertIcon/></Badge> </IconButton> } 
        />
        <MainMenu
          menuItems={ items } 
          close={()=>this.removeRef()} 
          open={fullscreen} 
          anchor={buttonRef}
        />
        <Divider />
          {content()}
        <Divider />
        <CardActions sx={{'height': '10%'}}> 
        	<IconButton onClick={this.handlecall} > <Button size="small">GET</Button> </IconButton>
        </CardActions>
     </Card>
  )}
}
