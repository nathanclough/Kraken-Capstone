import * as React from 'react';
import '../../App.css';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

function NFTCard(props) {
    const [setAnchorEl] = React.useState(null); //used to change the state when the view button is clicked 
    const handleClose = () => {
      window.scrollTo(0,0)
      setAnchorEl(null);
    };
    const navigate = useNavigate(); //used to navigate the view button and redirect it to the view card page
    const redirect = (url) =>{
      console.log(props.nft)
      navigate(url,{
        state:{
          nft : props.nft
        }
      })
    }

  return (
    <>
      <Box sx={{ display: 'flex', p: 1, m: 1, flexGrow: 1 }}>
        <Paper elevation={3}>
          <Card sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <CardMedia
              component="img"
              img src={props.image}
              alt="kraken"
              style={{objectFit:"scale-down"}}
              className="App-NFTpreview" //scale the NFT images to the same size when displayed
            /> 
            <CardContent sx={{ display: 'flex', justifyContent: 'space-evenly', p: 1, m: 1, flexGrow: 1 }}> 
              <Typography variant="overline" display="block" gutterBottom> 
                {props.name + " "} 
                {props.nft.metadata.id}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-evenly', p: 1, m: 1, flexGrow: 1 }}>
              <Button variant="outlined" size="small" onClick={() => {
                redirect("/view"); handleClose()}}>View</Button>
            </CardActions>
          </Card>
        </Paper>
      </Box>
    </>
  );

}
export default NFTCard;