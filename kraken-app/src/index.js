import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Components/Navbar/Navbar';
import './index.css';
import Home from './Pages/Home';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <Navbar network="Cardano-testnet" connected={false} style={{maxHeight:"5vmin",marginBottom:"5vmin"}}>
      </Navbar>
      <div style={{height:"95vmin"}}>
        <Home />
      </div>
    </div>


  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
