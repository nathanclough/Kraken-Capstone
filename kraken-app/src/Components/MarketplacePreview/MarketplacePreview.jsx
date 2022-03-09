import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import NFTCard from '../NFTCard/NFTCard.jsx';
import { data } from '../../CardData.js';

function MarketplacePreview(props) {

  const [page, setCurrentPage] = React.useState(1);
  const handleChange = (event, page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <Box sx={{ bgcolor: 'background.paper', pt: 1, pb: 6, display: 'flex', flexGrow: 1, flexWrap: 'wrap'}}>
        <Container sx={{ py: 1 }} maxWidth="md">
          <Box sx={{ display: 'flex' }}> 
            {data.map((cards, key) => (
              <NFTCard key={data} name={data.name} image={data.image} />
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