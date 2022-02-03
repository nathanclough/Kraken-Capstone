import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Components/Navbar/Navbar';
import './index.css';
import './App.css';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Marketplace from './Pages/Marketplace';
import reportWebVitals from './reportWebVitals';
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>    
      <Navbar network="Cardano-testnet" connected={true}>
      </Navbar>
      <div >
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="profile" element={<Profile/>} />
          <Route path="marketplace" element={<Marketplace/>}/>
          <Route path="*" element={<div className='App-Page'>Invalid URL</div>}/>
        </Routes>
      </div>
    </BrowserRouter>


  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
