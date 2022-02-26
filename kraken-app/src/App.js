import React from 'react';
import './index.css';
import './App.css';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Marketplace from './Pages/Marketplace';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar.jsx';

function App() {
  return (
    <div >
      <BrowserRouter>  
      <div>
      <Navbar network="Cardano-testnet" connected={true}/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="profile" element={<Profile/>} />
          <Route path="marketplace" element={<Marketplace/>}/>
          <Route path="*" element={<div className='App-Page'>Invalid URL</div>}/>
        </Routes>
        </div>  
      </BrowserRouter>
    </div>
  );
}
export default App;