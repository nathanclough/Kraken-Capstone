import logo from '../logo.svg';
import '../App.css';
import KrakenLogo from '../Components/KrakenLogo/KrakenLogo';
function Home() {
  return (
    <div className="App-Page">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <KrakenLogo></KrakenLogo>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;
