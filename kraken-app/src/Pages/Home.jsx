import '../App.css';
import * as React from 'react';
import MarketplacePreview from '../Components/MarketplacePreview/MarketplacePreview.jsx';
import KrakenLogo from '../Components/KrakenLogo/KrakenLogo.jsx';

function Home(props) {

  return (
    <div className="App-Page">
      
      <KrakenLogo/>
      <MarketplacePreview />
    </div>
  );

}
export default Home;