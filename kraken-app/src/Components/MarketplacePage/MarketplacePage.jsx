import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import NFTCard from '../NFTCard/NFTCard.jsx';
import KrakNFT0 from '../../KrakNFT0.png';
import KrakNFT1 from '../../KrakNFT1.png';
import KrakNFT2 from '../../KrakNFT2.png';

const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function MarketplacePreview(props) {

  /*const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };*/

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
        <Container sx={{ py: 8 }} maxWidth="xl">
          <Typography variant="h6" gutterBottom component="div">
            KrakNFT Marketplace
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}> 
            {cards.map((card, index) => (
              <NFTCard name={`Nft ${index}`} image={getImage(index)}/>
            ))}
          </Box>
        </Container>
    </>
  );

}
export default MarketplacePreview;