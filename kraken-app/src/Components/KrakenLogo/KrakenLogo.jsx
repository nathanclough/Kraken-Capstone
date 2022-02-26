import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import KrakNFTLogo from "../../KrakNFTLogo.png";

function KrakenLogo(props) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          style={{backgroundColor: "cyan"}}
          image={KrakNFTLogo}
          alt="kraken logo"
        />
        <CardContent sx={{ display: 'flex', justifyContent: 'space-evenly', p: 1, m: 1, flexGrow: 1 }}>
          <Typography variant="overline" display="block" gutterBottom>
            Team Kraken
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
export default KrakenLogo;
