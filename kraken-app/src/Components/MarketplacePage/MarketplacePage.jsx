import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import NFTCard from '../NFTCard/NFTCard.jsx';
import { data } from '../../CardData.js';

function MarketplacePage(props) {

  return (
    <>
        <Container sx={{ py: 8 }} maxWidth="xl">
          <Typography variant="h6" gutterBottom component="div">
            KrakNFT Marketplace
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap'}}> 
            {data.map((cards, key) => (
              <NFTCard key={data} name={data.name} image={data.image}/>
            ))}
          </Box>
        </Container>
    </>
  );

}
export default MarketplacePage;