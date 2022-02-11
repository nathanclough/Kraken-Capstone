import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import KrakNFT from './KrakNFT.png';

function NFTCard(props) {

  return (
    <>
      <CssBaseline />
      <Paper elevation={3}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          height="300"
          img src = {KrakNFT}
          alt="kraken"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography ariant="overline" display="block" gutterBottom>
            <Stack direction="row" spacing={2} justifyContent="center">
                Pirates NFT Name{props.number}
            </Stack>
          </Typography>
        </CardContent>
        <Stack direction="row" spacing={2} justifyContent="center">
        <CardActions>
            <Button variant="outlined" size="small">View</Button>
            <Button variant="outlined" size="small">Buy</Button>
        </CardActions>
        </Stack>
      </Card>
      </Paper>
    </>
  );

  
}
export default NFTCard;