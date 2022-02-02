import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NamiLogo from '../../NamiLogo.svg'
import CloudIcon from '@mui/icons-material/Cloud';
import Grid from '@mui/material/Grid';

function Navbar(props) {
    const namiMsg = props.connected ? "Connected" : "Connect Wallet";
    
    return( 
      <AppBar position="fixed">
        <Toolbar>
            <Typography variant="h4" style={{paddingRight: "25px"}}component="div" sx={{ flexGrow: 1 }}>
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
                
            <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                <Button style={{whiteSpace: "nowrap"}} color="inherit" variant="outlined">
                    {namiMsg}  
                </Button> 
                <img onClick={() => window.location.href = "https://namiwallet.io/"} src={NamiLogo} className="Nami-logo" alt="n-logo" />
            </div>
        </Toolbar>
      </AppBar>
    );

}export default Navbar