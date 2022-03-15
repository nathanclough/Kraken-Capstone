import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import NamiLogo from '../../NamiLogo.svg'
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import logo from "../../logo-Recovered.png"

const format = {
    cursor:'pointer'
}
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
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => {redirect("/profile"); handleClose()}}>My Profile</MenuItem>
      </Menu>
    </div>
  );   
        }
        else{
          return(<img onClick={() => window.location.href = "https://namiwallet.io/"} src={NamiLogo} className="Nami-logo" alt="n-logo" />);
          
        }
    }
    return( 
      
      <AppBar position="fixed">
        <Toolbar>
            <Grid container spacing={1}direction="row" alignItems="center" >
            <Grid item onClick={() => {redirect("/")}} style={{...format}}  >
                    <img className="App-logo" component="img" src={logo} alt="kraken logo"/>
                </Grid>
            </Grid>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center",gap:"5px"}}>
                {userAvatar()}
                <Button style={{whiteSpace: "nowrap"}} color="inherit" variant="outlined" onClick={() => {props.Connect()}}>
                    {namiMsg}  
                </Button> 
                
            </div>
        </Toolbar>
      </AppBar>
    );

}export default Navbar