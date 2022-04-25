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
var bodyParser = require('body-parser');
var cors = require('cors')
const PORT = process.env.PORT || 3003;
const app = express();
app.use(cors())
app.use(bodyParser.json())

// Mint wallet 
const wallet = cardanocliJs.wallet("KrakNFT");
const realAssetName = "KrakNFT"
const hexAssetName = Buffer.from(realAssetName).toString('hex')

// Database configuration
// Connection URL
const PolicyModel = require("./PolicyModel");
const mongoose = require("mongoose");
const url = 'mongodb://kraken-db:27017/';

mongoose.connect(url)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


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
    
    // Check database for supplied policy id 
    PolicyModel.findOne( {policyId: policyHex}, (err, r) => {
        if(err){
          res.json({"ERROR": "Invalid Policy Id"}) 
        }
        else{

          if(policyHex != r.policyId){
            res.json({"ERROR": "Invalid Policy Id"}) 
          }
          else{
            res.json({
              txHash: r.mintTx,
              policyId: r.policyId,
              tokenName: name,
              value : amt })
          }
        }
    })
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
          value : tx.value[policyId],
          txId: tx.txId
        }
      }
  })
  
  res.json({ 
        result: utxos.filter(x => x !== undefined)
    })
});

app.post("/buy",(req,res) => {
  var buyerAddress = CSL.Address.from_bytes(Buffer.from(req.body.buyerAddress,'hex')).to_bech32(); // addr_test... format
  var policyId = req.body.policyId
  var mintTx = req.body.mintTx
  var price = req.body.price
  var mintTxId = req.body.txId
  var buyerUtxos = cardanocliJs.queryUtxo(buyerAddress).filter( utxo => utxo.value.lovelace > cardanocliJs.toLovelace(price))[0]
  
  let mintUtxos = wallet.balance().utxo

  mintUtxo = mintUtxos.find( tx => {
    return tx.txHash === mintTx && tx.txId === mintTxId})

  var krakNFT = policyId + "." + hexAssetName

  let txInfo = {
    txIn: [mintUtxo,buyerUtxos],
    txOut: [
      
      // UTXO with payment going to KrakNFT
      { address: wallet.paymentAddr, 
        value: { lovelace: cardanocliJs.toLovelace(price) } 
      },
      // UTXO with NFT going to Buyer 
      {
        address: buyerAddress,
        value: { [krakNFT]: 1, lovelace: buyerUtxos.value.lovelace - cardanocliJs.toLovelace(price),  }
      } 

    ],
    changeAddress: wallet.paymentAddr
  };

  console.log(txInfo)
  console.log("inputs")
  txInfo.txIn.forEach( o => console.log(o))

  console.log("outputs")
  txInfo.txOut.forEach( o => console.log(o))

  let tx = cardanocliJs.transactionBuild(txInfo);

  //sign the transaction
  let txSigned = cardanocliJs.transactionSign({
    txBody: tx,
    signingKeys: [wallet.payment.skey],
  });

  console.log(txSigned.cborHex)
  // return so buyer can verify and sign 
  res.json({"tx": txSigned})
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});