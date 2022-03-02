import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import NFTCard from '../NFTCard/NFTCard.jsx';
import KrakNFT0 from '../../KrakNFT0.png';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import MarketplacePreview from '../../Components/MarketplacePreview/MarketplacePreview.jsx';

function CardViewPage(props) {

  return (
    <>
      <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6, display: 'flex', flexGrow: 1, justifyContent: "center"}}>
      <Paper elevation={3}>
        <Container sx={{ py: 8 }} maxWidth="lg">
          <Grid container rowSpacing={6} columnSpacing={6} direction="row" alignItems="center" justifyContent="center">
            <Grid item>
                <Paper elevation={3}>
                    <img className="App-NFTimage" component="img" src={KrakNFT0} alt="card image"/>
                </Paper>
            </Grid>
            <Grid item xs={5}>
                <Typography variant="h4" component="div" gutterBottom>
                    NFT 0
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Collection Name: Pirates
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    Owned By KrakNFT
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    ID: 1030114
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Description
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    Created By 
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    This NFT blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
                </Typography>
            </Grid>
            <Grid item marginBottom={60}>
              <Typography variant="overline" gutterBottom>
                Price ADA 0.0000
              </Typography>
            </Grid>
            <Grid item marginBottom={60}>
              <Button variant="contained" size="small">Buy</Button>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" gutterBottom>
                Details
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Contract Address: 
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Token ID: 
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Token Standard: 
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Blockchain: Cardano
              </Typography>
            </Grid>
            <Grid item xs={7.85}>
              <Typography variant="h6" gutterBottom>
                About The Collection
              </Typography>
              <Typography variant="body1" gutterBottom>
                The Pirates Collection is 
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" gutterBottom>
                Others From This Collection
              </Typography>
              <MarketplacePreview />
            </Grid>
          </Grid>
        </Container>
      </Paper>
      </Box>
    </>
  );

}
export default CardViewPage;