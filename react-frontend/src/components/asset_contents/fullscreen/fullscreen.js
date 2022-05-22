import React, {Component} from 'react';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import ExpandIcon from '@mui/icons-material/Expand';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CustomTable from '../table/table.js';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
// import Slide from '@mui/material/Slide';
import Map from '../map/map.js';
// import OpenWithIcon from '@mui/icons-material/OpenWith';

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

export default class FullScreen extends Component {
  _isMounted = false
  constructor(props){
    super(props)
    this.state={
      open: false,
      mounted: false,
    }
  }

  componentDidMount(){
    console.log('MENU mounted.', this)
    this._isMounted = true;

  }

  componentWillUnmount(){
    console.log('MENU unmounted.')
    this._isMounted = false
  }


  validate (value) {
    return value === '' || value === undefined || value === null ? false : true;
  }

  handleClickOpen = () =>{
    console.log('Fullscreen Logged. ', this)
    if (this._isMounted){
      this.setState({ open: true});
    }
    console.log('Not mounted.')
    
  }

  handleClose = () =>{
    this.setState({open: false});
  }

  getMap (data) {
    return <Map location={data} />
  } 

  
  render(){
    const { open, side } = this.state;
    const headData = [ 'Source', 'Time', 'Speed', 'Distance', 'Reason', 'Heading' ];
    const bodyCount = ['source', 'time', 'speed', 'distance_traveled', 'reasons', 'heading'];

    console.log(this)

    // fullscreen

    return (
      <div>
        <FullscreenIcon sx={{'cursor':'pointer'}} color="primary" onClick={this.handleClickOpen} />    
        <Dialog
          fullScreen
          open={open }
          onClose={open}
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
                {"Path data for " + this.props.title}
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem key={"full-map"} >
              { <Map key={"full-map"} height={300} width={"100%"} full={true} polyline={this.props.pathdata}/>}
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
