import '../App.css';
import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MarketplacePreview from '../Components/MarketplacePreview/MarketplacePreview.jsx';


function Home() {

  return (
    <>
      <div className="App-Page">
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3}>
              <Typography variant="h6" gutterBottom component="div">
                Other App Components
              </Typography>
            </Paper>
          </Container>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3}>
              <MarketplacePreview />
            </Paper>
          </Container>
        </Box>
      </div>
    </>
  );

}
export default Home;