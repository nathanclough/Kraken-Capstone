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
import logo from "../../logo-Recovered.png";
import { styled } from '@mui/styles';
import icon from "../../icon.png";

const format = {
    cursor:'pointer'
}

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  fontWeight: 'bold'
});
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
    const namiMsg = props.connected ? "Connected" : "Connect";
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
          <Avatar src={icon}/>
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
          return(
          <img onClick={() => window.location.href = "https://namiwallet.io/"} src={NamiLogo} className="Nami-logo" alt="n-logo" style={{...format}}/>
          );
          
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
                <MyButton onClick={() => {props.Connect()}} style={{position: 'relative', top: '15%', left: 2, right: 10, bottom: 0}}>
                    {namiMsg}  
                </MyButton> 
                
            </div>
        </Toolbar>
      </AppBar>
    );

}export default Navbar