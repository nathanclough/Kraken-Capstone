import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import NFTCard from '../NFTCard/NFTCard.jsx';
import KrakNFT0 from '../../KrakNFT0.png';
import KrakNFT1 from '../../KrakNFT1.png';
import KrakNFT2 from '../../KrakNFT2.png';

const cards = [0, 1, 2];

function MarketplacePreview(props) {

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const getImage = (index) => {
    if (index === 0 ){
      return KrakNFT0
    }
    else if (index === 1){
      return KrakNFT1
    }
    else{
      return KrakNFT2;
    }
  }

  return (
    <>
      <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6, display: 'flex', flexGrow: 1, flexWrap: 'wrap' }}>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography variant="h6" gutterBottom component="div">
            Featured Collection
          </Typography>
          <Box sx={{ display: 'flex' }}> 
            {cards.map((card, index) => (
              <NFTCard name={`NFT ${index}`} image={getImage(index)}/>
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