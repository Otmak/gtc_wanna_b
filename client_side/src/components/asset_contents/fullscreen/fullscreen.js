import React, {Component} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandIcon from '@mui/icons-material/Expand';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CustomTable from '../table/table.js';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Map from '../map/map.js';
import OpenWithIcon from '@mui/icons-material/OpenWith';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class FullScreen extends Component {
  constructor(props){
    super(props)
    this.state={
      open: false,
      side: false,
    }
  }


  validate (value) {
    return value === '' || value === undefined || value === null ? false : true;
  }

  handleClickOpen = () =>{
    this.setState({ open: true});
  };

  handleClose = () =>{
    this.setState({open: false});
  };

  getMap (data) {
    return <Map location={data} />
  } 

  
  render(){
    const { open, side } = this.state;
    const headData = [ 'Source', 'Time', 'Speed', 'Distance', 'Reason', 'Heading' ];
    const bodyCount = ['source', 'time', 'speed', 'distance_traveled', 'reasons', 'heading'];

    return (
      <div>
        <ExpandIcon onClick={this.handleClickOpen} />    
        <Dialog
          fullScreen
          open={open}
          onClose={this.handleClose}
          // TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {this.props.title}
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem key={"full-map"} >
              { <Map key={"full-map"} width={"100vw"} full={true} polyline={this.props.pathdata}/>}
            </ListItem>
            <Divider />
            <ListItem key={"full-table"}>
              <CustomTable key={"full-table"} maxheight={500} head={headData} body={this.props.pathdata} bodycount={bodyCount}/> 
            </ListItem>
          </List>
        </Dialog>
      </div>
    );}
}
