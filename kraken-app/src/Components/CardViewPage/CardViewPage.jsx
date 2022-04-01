import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import KrakNFT0 from '../../KrakNFT0.png';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import MarketplacePreview from '../../Components/MarketplacePreview/MarketplacePreview.jsx';
import { useLocation } from 'react-router-dom';

function CardViewPage(props) {
  const location = useLocation()
  const nft = location.state.nft
  React.useEffect(() =>{
    console.log(location.state)
  },[])
  return (
    <>
      <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6, display: 'flex', flexGrow: 1, justifyContent: "center"}}>
      <Paper elevation={3}>
        <Container sx={{ py: 8 }} maxWidth="lg">
          <Grid container rowSpacing={6} columnSpacing={6} direction="row" alignItems="center" justifyContent="center">
            <Grid item>
                <Paper elevation={3}>
                    <img className="App-NFTimage" component="img" src={nft.metadata.image} alt="card"/>
                </Paper>
            </Grid>
            <Grid item xs={5}>
                <Typography variant="h4" component="div" gutterBottom>
                    
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Collection Name: {nft.metadata.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    ID: {nft.metadata.id}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    {nft.metadata.description}
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
                Mint Transaction: {nft.txHash} 
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Policy ID: {nft.policyId}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Blockchain: Cardano
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Popularity: 
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Rarity: 
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" gutterBottom>
                Other NFT's
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