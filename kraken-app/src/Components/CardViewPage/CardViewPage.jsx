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
    window.cardano.nami.enable()
    // get Utxos that have amount of at least price 
    .then(nami => nami.getUtxos()
      // Call our api to get transaction
      .then(bytes => 
        api.getBuyTransaction(address,bytes,nft.policyId,nft.txHash,price,nft.txId)
        .then(buyTx => {
          // sign the transaction 
           window.cardano.nami.enable()
           .then(
             nami => nami.signTx(buyTx,true)
              .then( witnessSet =>{
                  console.log(witnessSet)
                  api.getFinalSignedTransaction(witnessSet, buyTx)
                  .then(finalTx => {
                    window.cardano.nami.enable()
                      .then(nami => 
                        nami.submitTx(finalTx)
                        )
              })
            })).catch( e => console.log(e))
        })
      )
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