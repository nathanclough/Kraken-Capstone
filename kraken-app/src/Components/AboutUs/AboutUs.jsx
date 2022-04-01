import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Logo from "../../KrakNFTLogo_2.png";
import { useNavigate } from 'react-router-dom';


export default function AboutUs(props) {
  const navigate = useNavigate();
  const redirect = (url) =>{
    navigate(url)}
  return (   
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingBottom:'20px'}}>
      <Box sx={{ bgcolor:"white", color:'background.paper', flexWrap: 'wrap', maxWidth: 'md' }}>
        <Box sx={{bgcolor:"white", justifyContent:'center', display:'flex', paddingBottom:"15px"}}>
          <Typography variant="h4" component="div" align="center" gutterBottom color='black' style={{ textDecoration:'underline', fontWeight:"bold"}}>
            KrakNFT
          </Typography>
        </Box>
        <Box sx={{bgcolor:"white", display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)'}}>
          <Box sx={{bgcolor:"white", display:'flex', justifyContent:'center'}}>
          <img src={Logo} alt="Logo" />
          </Box>
          <Box sx={{bgcolor:"white", display: 'grid', gridTemplateRows: 'repeat(2, 1fr)'}}>
            <div style={{display:'flex', alignItems: 'center', justifyContent: 'center', flexDirection:'column'}}>
              <Typography variant="h5" align="center" color='black'style={{fontWeight:"bold"}}>
                About Us
              </Typography>
              <Typography variant="h6" gutterBottom  align = "center" color='black'>
                KrakNFT orignated in 2022 by a group of students for a school project.
                Here you will be able to purchase, collect, and sell Kraken NFTs on the Cardano platform.
              </Typography>
            </div>
            <div style={{display:'flex', alignItems: 'center', justifyContent: 'center', flexDirection:'column'}}>
              <Typography variant="h5" align="center" color='black' style={{fontWeight:"bold"}}>
                Helpful Links
              </Typography>
              <Box sx={{bgcolor:"white", display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)'}}>
                <Typography onClick={()=>{redirect("/marketplace")}} variant="h6" align="center" color='black' style={{cursor:'pointer', textDecoration:'underline'}}>
                  Marketplace
                </Typography>
                <Typography onClick={()=>{redirect("/profile")}} variant="h6" align="center" color='black' style={{cursor:'pointer', textDecoration:'underline'}}>
                  Account
                </Typography>
              </Box>
            </div>
          </Box>
        </Box>
      </Box>
    </div>
  );
}