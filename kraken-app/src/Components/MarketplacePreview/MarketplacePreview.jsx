import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import NFTCard from '../NFTCard/NFTCard.jsx';
import { KrakenAPI } from '../../api.js';

const api = new KrakenAPI()


function MarketplacePreview(props) {
  const [nfts, setNfts] = React.useState([])

  React.useEffect( () =>{
    api.getMarketplacePreview().then( (res) => setNfts(res))
    
  }, [])

  const [page, setPage] = React.useState(0);
  
  const handleChange = (event, value) => {
    console.log(event.target)
    setPage(value + 1);
  };


  return (
    <>
    <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6, display: 'flex', flexGrow: 1, flexWrap: 'wrap' }}>
      <Container sx={{ py: 8 }} maxWidth="md">
          <Box sx={{ display: 'flex' }}> 
            {nfts.map( (nft, index) => {
              return (
              <Box sx={{ display: 'flex', p: 1, m: 1, flexGrow: 1 }}>
                  <NFTCard nft={nft} name={nft.metadata.name} image={nft.metadata.image}/>
              </Box>)
            }
            )}
          </Box>
          <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
          <Pagination count={0} page={page} onChange={handleChange} />
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default MarketplacePreview;