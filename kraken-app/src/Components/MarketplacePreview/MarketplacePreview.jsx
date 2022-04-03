import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NFTCard from '../NFTCard/NFTCard.jsx';
import { KrakenAPI } from '../../api.js';

const api = new KrakenAPI()

function MarketplacePreview(props) {
  const [nfts, setNfts] = React.useState([]) //display the NFTs from the cardano node in the marketplace preview 

  React.useEffect( () =>{
    api.getMarketplacePreview().then( (res) => setNfts(res))
    
  }, [])

  return (
    <>
    <Box sx={{ bgcolor: 'background.paper', pt: 2, pb: 6, display: 'flex' }}>
      <Container maxWidth="lg">
          <Box sx={{ display: 'flex' }}> 
            {nfts.map( (nft, index) => {
              return (
              <Box sx={{ display: 'flex', p: 1, m: 1 }}>
                  <NFTCard nft={nft} name={nft.metadata.name} image={nft.metadata.image}/>
              </Box>)
            }
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default MarketplacePreview;