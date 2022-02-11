import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import NFTCard from '../NFTCard/NFTCard.jsx';

const cards = [1, 2, 3];

function MarketplacePreview(props) {

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{bgcolor: 'background.paper', pt: 8, pb: 6,}}>
      <Container sx={{ py: 8 }} maxWidth="md">
          <Typography variant="h6" gutterBottom component="div">
            FEATURED COLLECTION
          </Typography>
          <Grid container spacing={4}>
            {cards.map((card, index) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <NFTCard number={index}/>
              </Grid>
            ))}
          </Grid>
          <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
            <Pagination count={3} page={page} onChange={handleChange} />
          </Stack>
        </Container>
        </Box>
    </>
  );


  
}
export default MarketplacePreview;