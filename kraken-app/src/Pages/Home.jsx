import '../App.css';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import MarketplacePreview from '../Components/MarketplacePreview/MarketplacePreview.jsx';
import AboutUs from '../Components/AboutUs/AboutUs.jsx';

function Home(props) {

  return (
    <div className="App-Page">
      <Typography variant="h5" align="center" color='black' style={{fontWeight:"bold"}} marginTop={8}>
          Featured Collection
      </Typography>
      <MarketplacePreview/>
      <AboutUs/>
    </div>
  );

}
export default Home;
