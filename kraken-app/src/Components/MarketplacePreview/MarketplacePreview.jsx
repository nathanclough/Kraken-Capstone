import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import NFTCard from '../NFTCard/NFTCard.jsx';
import KrakNFT1 from '../../KrakNFT1.png';
import KrakNFT2 from '../../KrakNFT2.png';
import KrakNFT3 from '../../KrakNFT3.png';

const cards = [1, 2, 3];

function MarketplacePreview(props) {

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const getImage = (index) => {
    if (index === 1 ){
      return KrakNFT1
    }
    else if (index === 2){
      return KrakNFT2
    }
    else{
      return KrakNFT3;
    }
  }

  return (
    <>
      <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6, display: 'flex', flexGrow: 1, flexWrap: 'wrap' }}>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography variant="h6" gutterBottom component="div">
            FEATURED COLLECTION
          </Typography>
          <Box sx={{ display: 'flex' }}> 
            {cards.map((card, index) => (
              <Box sx={{ display: 'flex', p: 1, m: 1, flexGrow: 1 }}>
                <Paper elevation={3}>
                  <NFTCard name={`Nft ${index}`} image={getImage(index)}/>
                </Paper>
              </Box>
            ))}
          </Box>
          <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
            <Pagination count={3} page={page} onChange={handleChange} />
          </Stack>
        </Container>
      </Box>
    </>
  );

}
export default MarketplacePreview;