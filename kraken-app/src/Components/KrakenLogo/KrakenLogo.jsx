import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import logo from "./logo.png";

export default function KrakenLogo(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          style={{backgroundColor: "cyan"}}
          height="160"
          image={logo}
          alt="kraken logo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Team Kraken
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}