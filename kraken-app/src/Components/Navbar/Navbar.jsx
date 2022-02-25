import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import NamiLogo from '../../NamiLogo.svg'
import CloudIcon from '@mui/icons-material/Cloud';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Navbar(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const navigate = useNavigate();
    const namiMsg = props.connected ? "Connected" : "Connect Wallet";
    const redirect = (url) =>{
        navigate(url)
    }
    const userAvatar = () =>{
        if(props.connected)
        { 
             return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
          <Avatar src="/broken-image.jpg"/>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'bottom',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => {redirect("/profile")}}>My Profile</MenuItem>
        <MenuItem onClick={handleClose}>Disconnect</MenuItem>
      </Menu>
    </div>
  );   
        }
        else{
            return <></>
        }
    }
    return( 
      <AppBar position="fixed">
        <Toolbar>
            <Typography onClick={() => {redirect("/")}} variant="h4" style={{paddingRight: "25px"}}component="div" sx={{ flexGrow: 1 }}>
                KrakNFT
            </Typography> 
            <Grid container spacing={1}direction="row" alignItems="center" >
                <Grid item>
                    <CloudIcon fontSize="small"/>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2" component="div">
                    {props.network}
                    </Typography>
                </Grid>
            </Grid>
                
            <div style={{display:"flex",flexDirection:"row",alignItems:"center",gap:"5px"}}>
                {userAvatar()}
                <Button style={{whiteSpace: "nowrap"}} color="inherit" variant="outlined">
                    {namiMsg}  
                </Button> 
                <img onClick={() => window.location.href = "https://namiwallet.io/"} src={NamiLogo} className="Nami-logo" alt="n-logo" />
            </div>
        </Toolbar>
      </AppBar>
    );

}export default Navbar