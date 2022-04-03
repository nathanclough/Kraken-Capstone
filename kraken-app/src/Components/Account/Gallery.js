import React from "react";
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import NFTCard from '../NFTCard/NFTCard.jsx';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "500px",
    paddingRight: "500px",
    
  }
});

function Gallery(props) {
  const handleEmpty = () => {
    if(props.nfts.length === 0){
      return <Typography variant="h6" component="div" gutterBottom>
        No valid KrakNFT's
      </Typography>
    }
    
    return <></>
  }

  const classes = useStyles();
  return (
    <Grid
    sx={{ bgcolor: 'background.paper', pt: 8, pb: 8, display: 'flex', flexGrow: 1, flexWrap: 'wrap'}}
      container
      columnSpacing="row"
      spacing={2}
      className={classes.container}
      justifyContent="flex-start"
    >
      {props.nfts.map((nft, index) => (
        <Grid item xs={4} sm={4} md={3}>
              <NFTCard key={index} nft={nft} name={nft.metadata.name} image={nft.metadata.image} />
        </Grid>
            ))}
            { handleEmpty()}
    </Grid>
  );
}export default Gallery;