import React from "react";
import Card from "./Card";
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import KrakNFT0 from '../../KrakNFT0.png';
import KrakNFT1 from '../../KrakNFT1.png';
import KrakNFT2 from '../../KrakNFT2.png';
const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "500px",
    paddingRight: "500px",
    
  }
});
const name = [KrakNFT0, KrakNFT1, KrakNFT2, KrakNFT2, KrakNFT0, KrakNFT1, KrakNFT1, KrakNFT2, KrakNFT0];
const title = ["Sea Kraken", "Dune Kraken", "Shadow Kraken", "Shadow Kraken", "Sea Kraken", "Dune Kraken", "Dune Kraken", "Shadow Kraken", "Sea Kraken"];
function Gallery() {

  const getImage = (index) => {
    for(var i=0; i<name.length; i++){
      if (index === i){
        return name[i]
      }
    }
  }

  const getName = (index) => {
    for(var i=0; i<title.length; i++){
      if (index === i){
        return title[i]
      }
    }
  }


  const classes = useStyles();
  return (
    <Grid
    sx={{ bgcolor: 'background.paper', pt: 8, pb: 8, display: 'flex', flexGrow: 1, flexWrap: 'wrap'}}
      container
      columnSpacing="row"
      spacing={2}
      className={classes.container}
      justifyContent="flex-end"
    >
      {name.map((card, index) => (
        <Grid item xs={4} sm={4} md={3}>
              <Card key={index} name={getName(index)} image={getImage(index)} />
        </Grid>
            ))}
    </Grid>
  );
}export default Gallery;