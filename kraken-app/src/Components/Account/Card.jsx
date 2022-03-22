import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
    gridContainer: {
      maxWidth: 310,
      transition: "transform 0.25s ease-in-out",
      "&:hover": { transform: "scale3d(1.15, 1.15, 1)" },
    },
  });
function ActionAreaCard(props) {
    const classes = useStyles();
  return (
    <Card sx={{ maxWidth: 345 }} className={classes.gridContainer}>
      <CardActionArea >
        <CardMedia
          component="img"
          height="220"
          image={props.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h7" component="div" sx={{ textAlign: 'center', fontWeight: 'bold'}}>
            {props.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}export default ActionAreaCard;
