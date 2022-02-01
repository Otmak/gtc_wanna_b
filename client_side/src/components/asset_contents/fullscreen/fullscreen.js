import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import CustomTable from '../table/table.js';
import Slide from '@mui/material/Slide';
import Map from '../map/map.js';
import OpenWithIcon from '@mui/icons-material/OpenWith';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreen(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getMap = (data) => {
    return <Map location={data} />
  }
  

  // console.log(props)

  return (
    <div>
      <MoreVertIcon onClick={handleClickOpen} />
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        // TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {props.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <List>

          <ListItem >
            <ListItemText primary="Map" secondary="data" />
            { (props.type === "path") && <Map full={true} polyline={"test"}/>}
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Path table"
              secondary="data"
            />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
