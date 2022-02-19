import '../App.css';
import * as React from 'react';
import MarketplacePreview from '../Components/MarketplacePreview/MarketplacePreview.jsx';
import KrakenLogo from '../Components/KrakenLogo/KrakenLogo';
function Home() {

  return (
    <div className="App-Page">
      <header className="App-header">
        <KrakenLogo></KrakenLogo>
        <MarketplacePreview />
      </header>
    </div>
  );

}
export default Home;