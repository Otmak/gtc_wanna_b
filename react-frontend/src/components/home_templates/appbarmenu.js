import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import ListItemIcon from '@mui/material/ListItemIcon';
import TextField from '@mui/material/TextField';
import Settings from '@mui/icons-material/Settings';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Logout from '@mui/icons-material/Logout';


export default function AppBarMenu(props) {
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const validate = (value) =>{
    return value === '' || value === undefined || value === null ? false : true;
  }


  const convertStrToB64 = (str) =>{

    if ( validate(str) ){
      let strEnc2 = str + '_' + 'mandelbrot_set' ;
      let strEnc = `${str}_mandelbrot_set`;
      return window.btoa(unescape(encodeURIComponent( strEnc )));
    }else{
      return str
    }
  }


  const validateAccountCode =(e)=>{

    const cap = e.target.value;
    // console.log(cap)
    if (validate(cap) && cap.length > 4) {
      // console.log('Qualified.', cap)
      setCode(cap);
    }
    // console.log(cap)
  }

  // const [anchorEl, setAnchorEl] = React.useState(null);
  const submitFromModal = ()=>{
    // const data = new FormData(e.currentTarget);
    // console.log( 'sub', e.target.value );
    // console.log('before',localStorage)
    localStorage.setItem('customer',  convertStrToB64(code) )
    console.log('affter', localStorage)
    console.log('Submitting ...', code)
    window.location.reload();

  }

  const handleClose = () => {
    props.close();
    setOpen(false);
    // setAnchorEl(null);
  };

  const clearAndLogout = ()=>{
    localStorage.clear();
    window.location.reload();
  }

  // console.log(props)
  return (
    <div>
      <Menu
        anchorEl={props.anchor}
        id="account-menu"
        open={props.open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem  onClick={handleClickOpen}>
          <ListItemIcon>
            <SwapHorizOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Switch account
        </MenuItem>
        <MenuItem disabled>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={clearAndLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          {"Enter account code below."}
       </DialogTitle>

        <DialogContent>
        <TextField
          autoFocus
          onChange={validateAccountCode}
          margin="dense"
          id="customer"
          label="Account code"
          type="text"
          fullWidth
          variant="standard"
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={submitFromModal} autoFocus>
          submit
        </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
