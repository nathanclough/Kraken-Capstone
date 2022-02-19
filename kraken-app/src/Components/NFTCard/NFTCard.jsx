import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';


function NFTCard(props) {

  return (
    <>
      <Card sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardMedia
          component="img"
          img src={props.image}
          alt="kraken"
        />
        <CardContent sx={{ display: 'flex', justifyContent: 'space-evenly', p: 1, m: 1, flexGrow: 1 }}>
          <Typography variant="overline" display="block" gutterBottom>
            {props.name}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-evenly', p: 1, m: 1, flexGrow: 1 }}>
          <Button variant="outlined" size="small">View</Button>
          <Button variant="outlined" size="small">Buy</Button>
        </CardActions>
      </Card>
    </>
  );

}
export default NFTCard;