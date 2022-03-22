import '../App.css';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import MarketplacePreview from '../Components/MarketplacePreview/MarketplacePreview.jsx';

function Home(props) {

  return (
    <div className="App-Page">

      <Typography variant="h6" gutterBottom paddingLeft={50} paddingTop={12}>
          Featured Collection
      </Typography>
      <MarketplacePreview />
    </div>
  );

}
export default Home;