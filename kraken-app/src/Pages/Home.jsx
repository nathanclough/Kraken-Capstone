import logo from '../logo.svg';
import '../App.css';
import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import MarketplacePreview from '../Components/MarketplacePreview/MarketplacePreview.jsx';


function Home() {
  return (
    <>
    <div className="App-Page">





    <CssBaseline />
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex' }}>
      <Container maxWidth="500" >
        <Paper elevation={3}>
          <Typography variant="h6" gutterBottom component="div">
            Other App Components
          </Typography>
        </Paper>
      </Container>
      </Box>
    </Container>
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex' }}>
          <Container maxWidth="500" >
            <Paper elevation={3}>
              <MarketplacePreview />
            </Paper>
          </Container>
      </Box>
    </Container>
    </div>
    </>
  );
}

export default Home;