import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import NamiLogo from '../../NamiLogo.svg'
import CloudIcon from '@mui/icons-material/Cloud';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

function Navbar(props) {
    const navigate = useNavigate();
    const namiMsg = props.connected ? "Connected" : "Connect Wallet";
    const redirect = (url) =>{
        navigate(url)
    }
    const userAvatar = () =>{
        if(props.connected)
        { 
           return <div onClick={() => {redirect("/profile")}}><Avatar src="/broken-image.jpg"/></div>   
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