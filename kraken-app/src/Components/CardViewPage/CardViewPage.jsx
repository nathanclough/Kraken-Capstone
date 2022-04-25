import * as React from 'react';
import '../../App.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import MarketplacePreview from '../../Components/MarketplacePreview/MarketplacePreview.jsx';
import { useLocation } from 'react-router-dom';
import { KrakenAPI } from '../../api.js';

function CardViewPage(props) {
  const location = useLocation() //use the NFT ID passed in from the view button on the NFTCard
  const nft = location.state.nft
  const price = 10
  const api = new KrakenAPI()
  const[address, setAddress] = React.useState("")

  React.useEffect( () => {
    try{
      // enable wallet and get balance this return encoded bytes 
    window.cardano.nami.enable()
      .then(res => res.getUsedAddresses()
        // Call our api to decode the balance with cardano serialization lib 
        .then(res => 
          {
            console.log(res)
            setAddress(res[0])})
          
      ) }
      catch(error){
        console.log(error)
      }
  }, [])

  const buy = () =>  {
    // window.cardano.nami.enable()
    // // get Utxos that have amount of at least price 
    // .then(res => res.getUtxos()
    //   // Call our api to decode the balance with cardano serialization lib 
    //   .then(bytes => api.getBuyTransaction(address,bytes,nft.policyId,nft.txHash,price,nft.txId) )
    // )

    window.cardano.nami.enable().then( nami => 
      nami.signTx("84a700828258207a6af0748d1b8188290e5fe07a7aaf1a3ae42926fb74c3a23b5ef9ff562f4541018258208e6fa542b4a1c7c891c98d70fcf18ccc2fe168dc7cc6bdc176af4d9880047629010d80018382581d60becc77d8dc2640ac76a3c1f55c346d2a871015b897a6d765c1c94fff1a001430b782581d60becc77d8dc2640ac76a3c1f55c346d2a871015b897a6d765c1c94fff1a0098968082583900f549a03bfcdead1c9939d3d99f57b2b0c0a869ac0cb3137d1ad9d0c49a3dda0ef4f3dbe216f9187bb23c92c7c90505bcf7b0534aca9885b5821a23207ccca1581cdc964d85775b56a441346f7044a52c4d777019ec5881511358291fcda1474b72616b4e465401021a0002b2a9031a035ed7f808000e80a1008182582050e6ea506684aae679ef4eff9f60e9b51e2806b8b99a70ce2e18b0d05159f5fc584047dd787161aa9cb45c0c3cb7c81c90f293f0d4d9e137459e196a7f96d006a2f6cf9be40b62e5c2cb28e06079a7fe840e1c248c4413fa5605bf3c219d76bfa400f5f6")
      .then( signed => nami.submitTx(signed))
      .catch( e => console.log(e))
      )
  }

  return (
    <>
      <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6, display: 'flex', flexGrow: 1, justifyContent: "center"}}>
      <Paper elevation={3}>
        <Container sx={{ py: 8 }} maxWidth="xl">
          <Grid container rowSpacing={6} columnSpacing={6} direction="row" alignItems="center" justifyContent="center">
            <Grid item>
                <Paper elevation={3}>
                    <img className="App-NFTimage" component="img" src={nft.metadata.image} alt="card"/> 
                </Paper>
            </Grid>
            <Grid item xs={5}>
                <Typography variant="h4" component="div" gutterBottom>
                    Name: {nft.metadata.name}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Collection Name: {nft.metadata.collection}
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
                Price ADA 10
              </Typography>
            </Grid>
            <Grid item marginBottom={60}>
              <Button variant="contained" size="small" onClick={buy}>Buy</Button>
            </Grid>
            <Grid item xs={11}>
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
                Rarity: {nft.metadata.Rarity}
              </Typography>
            </Grid>
            <Grid item >
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