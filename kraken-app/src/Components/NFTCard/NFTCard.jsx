import * as React from 'react';
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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClose = () => {
      setAnchorEl(null);
    };
    const navigate = useNavigate();
    const redirect = (url) =>{
      navigate(url)
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
            />
            <CardContent sx={{ display: 'flex', justifyContent: 'space-evenly', p: 1, m: 1, flexGrow: 1 }}>
              <Typography variant="overline" display="block" gutterBottom>
                {props.name}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-evenly', p: 1, m: 1, flexGrow: 1 }}>
              <Button variant="outlined" size="small" onClick={() => {redirect("/view"); handleClose()}}>View</Button>
              <Button variant="outlined" size="small">Buy</Button>
            </CardActions>
          </Card>
        </Paper>
      </Box>
    </>
  );

}
export default NFTCard;