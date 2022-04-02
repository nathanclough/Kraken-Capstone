import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Logo from "../../KrakNFTLogo_2.png";


export default function AboutUs(props) {

  return (   
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingBottom:'20px'}}>
      <Box sx={{ color:'background.paper', flexWrap: 'wrap', maxWidth: 'md' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', paddingLeft:'80px' }}>
            <img src={Logo} alt="Logo" className="App-AboutLogo" />
            <div style={{display:'flex', alignItems: 'center', justifyContent: 'center', flexDirection:'column', paddingRight:'80px'}}>
              <Typography variant="h5" align="center" color='black' style={{fontWeight:"bold"}} paddingBottom={3}>
                About Us
              </Typography>
              <Typography variant="h6" gutterBottom  align="center" color='black'>
                KrakNFT orignated in 2022 by a group of students for a school project.
                Here you will be able to purchase, collect, and sell Kraken NFTs on the Cardano platform.
              </Typography>
            </div>
        </Box>
      </Box>
    </div>
  );
}