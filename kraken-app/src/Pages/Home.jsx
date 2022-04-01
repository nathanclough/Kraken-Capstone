import '../App.css';
import * as React from 'react';
import MarketplacePreview from '../Components/MarketplacePreview/MarketplacePreview.jsx';
import AboutUs from '../Components/AboutUs/AboutUs.jsx';

function Home(props) {

  return (
    <div className="App-Page">
      <MarketplacePreview/>
      <AboutUs/>
    </div>
  );

}
export default Home;