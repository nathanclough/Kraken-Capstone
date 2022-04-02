// Imports and valid keys 
const CardanocliJs = require("cardanocli-js");

// Cardano Node config variables 
const fs = require("fs");
const CSL = require("@emurgo/cardano-serialization-lib-nodejs")
const POLICY = "c8b21d0e3825ac82db8add095b926d0a1be026a1cd0de4e752a87a16"
const mintTxs ={}
mintTxs[POLICY] = "e95f64857daf4ff763d9dff829d62c0c192b0f7818a7e87a4fc6c3b075572547"
const cardanocliJs = new CardanocliJs({
    network: "testnet-magic 1097911063",
    era: "alonzo",
    dir: "/app/data/testnet",
    shelleyGenesisPath: "/data/config/testnet-shelley-genesis.json",
    socketPath: "/ipc/node.socket",
  });

// Server config 
const express = require("express");
var cors = require('cors')
const PORT = process.env.PORT || 3003;
const app = express();
app.use(cors())

// Mint wallet 
const wallet = cardanocliJs.wallet("KrakNFT");
const realAssetName = "KrakNFT"
const hexAssetName = Buffer.from(realAssetName).toString('hex')

// Endpoint for verifying assets in wallet 
app.get("/balance",(req,res) => {
  let v = CSL.Value.from_bytes(Buffer.from(req.query.balance,'hex') )
  
  if(v.multiasset()){
    var keys = v.multiasset().keys()

    var key = keys.get(0)
    var policyHex = Buffer.from(key.to_bytes()).toString('hex')
    
    var asset = v.multiasset().get(key)
    
    var name = Buffer.from(
      asset.keys().get(0).name(),
      "hex"
    ).toString();
    
    var amt = asset.get(asset.keys().get(0)).to_str()
   
    if(policyHex != POLICY){
      res.json({"ERROR": "Invalid Policy Id"}) 
    }
    else{
      res.json({
        txHash: mintTxs[policyHex],
        policyId: policyHex,
        tokenName: name,
        value : amt })
    }
  }
  else{
  res.json({"ERROR": "No Tokens"})
  }
})

// Endpoints for 
app.get("/mintUtxos", (req, res) =>{
  let utxos = wallet.balance()
    .utxo.map(tx => {
      var policyId = Object.keys(tx.value).find(v => v.includes(`.${hexAssetName}`))
      
      if (policyId !== undefined){
        var policy = policyId.split('.')[0]
        
        return {
          txHash: tx.txHash,
          policyId: policy,
          tokenName: realAssetName,
          value : tx.value[policyId]
        }
      }
  })
  
  res.json({ 
        result: utxos.filter(x => x !== undefined)
    })
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});