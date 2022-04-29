const { readFileSync } = require('fs');

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

const signTransaction = (
  txBody, // CSL transactionBody 
) => {
  var signingKeyHexCBOR ="776a070c9e49b1dedc2f53861fee32086be5420cbcd6280899dd6c4d46c03096"
  const signKey = CSL.PrivateKey.from_normal_bytes(Buffer.from(signingKeyHexCBOR,'hex'));
  const txHash = CSL.hash_transaction(txBody);
  const witnesses = CSL.TransactionWitnessSet.new();
  const vkeyWitnesses = CSL.Vkeywitnesses.new();
  vkeyWitnesses.add(CSL.make_vkey_witness(txHash, signKey));

  witnesses.set_vkeys(vkeyWitnesses);

  const transaction = CSL.Transaction.new(txBody, witnesses);

  return transaction;
};


// Endpoint for verifying assets in wallet 
app.get("/balance",async (req,res) => {
  let v = CSL.Value.from_bytes(Buffer.from(req.query.balance,'hex') )
  const submit = () =>{
    result.json()
  }
  if(v.multiasset()){
    var keys = v.multiasset().keys()
    console.log(keys.len())
    var result = []

    for(let i = 0; i<keys.len(); i++){
      var key = keys.get(i)
      var policyHex = Buffer.from(key.to_bytes()).toString('hex')
      
      var asset = v.multiasset().get(key)
      
      var name = Buffer.from(
        asset.keys().get(0).name(),
        "hex"
      ).toString();
      
      var amt = asset.get(asset.keys().get(0)).to_str()

      var r = await PolicyModel.findOne( {policyId: policyHex}).exec()        
      if(!( r === null || policyHex != r.policyId)){
            
              result.push({
                txHash: r.mintTx,
                policyId: r.policyId,
                tokenName: name,
                value : amt })
            }
          }
    
      console.log(result)
      res.json({"result" : result}) 
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

  var buyerTxOut = JSON.parse(JSON.stringify(buyerUtxos))
  buyerTxOut.value.lovelace -= cardanocliJs.toLovelace(price)
  delete buyerTxOut.value.undefined
  console.log(buyerTxOut)
  
  let txInfo = {
    txIn: [mintUtxo,buyerUtxos],
    txOut: [
      
      // UTXO with payment going to KrakNFT
      { address: wallet.paymentAddr, 
        value: { lovelace: mintUtxo.value.lovelace + cardanocliJs.toLovelace(price) } 
      },
      // UTXO with NFT going to Buyer 
      {
        address: buyerAddress,
        value: { ...buyerTxOut.value, [krakNFT]: 1  }
      } 
      
    ],
  };
  console.log(txInfo.txOut[1])
  let raw = cardanocliJs.transactionBuildRaw({...txInfo});

  let fee = cardanocliJs.transactionCalculateMinFee({
    ...txInfo,
    txBody: raw,
    witnessCount:2
  });

  console.log(fee)
  txInfo.txOut[1].value.lovelace -= fee;

  let cliTx = cardanocliJs.transactionBuildRaw({...txInfo,fee,changeAddress: wallet.paymentAddr});
  var s = cardanocliJs.transactionSign({txBody: cliTx,
    signingKeys: [wallet.payment.skey],
  })
  console.log(s);


  const fromFile = readFileSync(s);
  var jsonTx = JSON.parse(fromFile)                                                
  
  const txCli = CSL.Transaction.from_bytes(Buffer.from(jsonTx.cborHex, "hex"));

  const txBody = txCli.body();

  const witnessSet = txCli.witness_set();

  witnessSet.vkeys()?.free();
  
  const ba = CSL.BaseAddress.from_address(CSL.Address.from_bytes(Buffer.from(req.body.buyerAddress,'hex')));

  console.log(ba)

  const requiredSigners = CSL.Ed25519KeyHashes.new();
  requiredSigners.add(ba.payment_cred().to_keyhash());

  txBody.set_required_signers(requiredSigners);
  
  const tx = CSL.Transaction.new(txBody, witnessSet);

  const signed = signTransaction(tx.body())
  
  const encodedTx = Buffer.from(signed.to_bytes()).toString("hex");
  console.log(encodedTx)
  res.json({"tx": encodedTx})
})

app.post("/submitTx",(req,res) => {
  var txVkeyWitnesses = CSL.TransactionWitnessSet.from_bytes(
    Buffer.from(req.body.witnessSet, "hex")
  );

  var vkeys = txVkeyWitnesses.vkeys()
  console.log(vkeys.len())

  var transaction = CSL.Transaction.from_bytes(Buffer.from(req.body.transaction ,"hex"))

  var signingKeyHexCBOR ="776a070c9e49b1dedc2f53861fee32086be5420cbcd6280899dd6c4d46c03096"
  const signKey = CSL.PrivateKey.from_normal_bytes(Buffer.from(signingKeyHexCBOR,'hex'));
  const txHash = CSL.hash_transaction(transaction.body());
  
  var vkey = CSL.make_vkey_witness(txHash, signKey)
  vkeys.add(vkey)
  console.log(vkeys.len())

  txVkeyWitnesses.set_vkeys(vkeys)
 
  const txSigned = CSL.Transaction.new(transaction.body(),txVkeyWitnesses)
  
  res.json({"tx":  Buffer.from(txSigned.to_bytes()).toString("hex")})
})


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});