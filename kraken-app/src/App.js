import React from 'react';
import './index.css';
import './App.css';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Marketplace from './Pages/Marketplace';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar.jsx';
import { useState, useEffect } from 'react';
import CardView from './Pages/CardView';

function App() {
  //State of wallet initiated as false
  const [connected,setConnected] = useState(false)
  // Function to check if wallet is enabled and pass it to setConnected
  async function ckWallet(){
    
    let check = false;
    try{
      check = await window.cardano.nami.isEnabled();
      console.log(window.cardano.nami.isEnabled());
    }
    catch(err){
    console.log(err);
    }
    setConnected(check);
  }
  //fucntion that enables nami wallet when called
  async function Connect(){
    var connect = await window.cardano.nami.enable();
    ckWallet();
    return(connect);
  }
  //time buffer before checking if wallet exists
  useEffect(() => {
    setTimeout(()=>{
      ckWallet()
     }, 50)
  }, []);
  //If wallet is connected, display user profile
  let redir;
  if(connected === true){
    redir = <Route path="profile" element={<Profile/>} />;
  }
//URL routes to each page that's required
  return (
    <div >
      <BrowserRouter>  
      <div>
      <Navbar network="Cardano-testnet" connected={connected} Connect = {Connect} ckWallet = {ckWallet}/>
        <Routes>
          <Route path="/" element={<Home/>} />
          {redir}
          <Route path="marketplace" element={<Marketplace/>}/>
          <Route path="view" element={<CardView/>}/>
          <Route path="*" element={<div className='App-Page'>Invalid URL</div>}/>
        </Routes>
        </div>  
      </BrowserRouter>
    </div>
  );
}
export default App;