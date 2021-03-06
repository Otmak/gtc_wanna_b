import React, {Component} from 'react';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CustomTable from '../table/table.js';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Map from '../map/map.js';

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
    this._isMounted = true;

  }

  componentWillUnmount(){
    this._isMounted = false
  }


  validate (value) {
    return value === '' || value === undefined || value === null ? false : true;
  }

  handleClickOpen = () =>{
    if (this._isMounted){
      this.setState({ open: true});
    }
    
  }

  handleClose () {
    // console.log('Full screen close trigger', this)
    this.setState({open: false});
    return this.props.handleClose()
  }

  getMap (data) {
    return <Map location={data} />
  } 

  
  render(){
    const { open, side } = this.state;
    const headData = [ 'Source', 'Time', 'Speed', 'Distance', 'Reason', 'Heading' ];
    const bodyCount = ['source', 'time', 'speed', 'distance_traveled', 'reasons', 'heading'];

    return (
      <div>
        {/*<FullscreenIcon sx={{'cursor':'pointer'}} color="primary"  />    */}
        <Dialog
          open={ this.props.fullscreen }
          onClose={ ()=>this.handleClose() }
          fullScreen
          // TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={ ()=>this.handleClose() }
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                { this.props.title}
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem key={"full-map"} >
              { this.validate(this.props.type ) && <Map key={"full-map-custom"} height={300} width={"100%"} full={true} polyline={ this.props.tabledata } /> }
            </ListItem>
            <Divider />
            <ListItem key={"full-table"}>
              <CustomTable key={"full-table-custom"} maxheight={500} head={this.props.tablehead} body={this.props.tabledata} bodycount={ this.props.tableguide }/> 
            </ListItem>
          </List>
        </Dialog>
      </div>
    );}
}
