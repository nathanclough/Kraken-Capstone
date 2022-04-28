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
        if(err || r === undefined){
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
        value: { lovelace: mintUtxo.value.lovelace + cardanocliJs.toLovelace(price) } 
      },
      // UTXO with NFT going to Buyer 
      {
        address: buyerAddress,
        value: { [krakNFT]: 1, lovelace: buyerUtxos.value.lovelace - cardanocliJs.toLovelace(price),  }
      } 
      
    ],
  };

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

                                                      
  const txCli = CSL.Transaction.from_bytes(Buffer.from("84a700828258200721fd0e7a7574464331d7a872c36b64b60a35f73332dcb4efbfbb676f73bf2e018258207a6af0748d1b8188290e5fe07a7aaf1a3ae42926fb74c3a23b5ef9ff562f4541010d80018282581d60becc77d8dc2640ac76a3c1f55c346d2a871015b897a6d765c1c94fff1a00af79e082583900f549a03bfcdead1c9939d3d99f57b2b0c0a869ac0cb3137d1ad9d0c49a3dda0ef4f3dbe216f9187bb23c92c7c90505bcf7b0534aca9885b5821a231da167a1581c51cb4d9d3e08ee1408eaa7afcceb939aaf1ae11be6c006d4730368aba1474b72616b4e465401021a0002db65031a0362022a08000e80a1008182582050e6ea506684aae679ef4eff9f60e9b51e2806b8b99a70ce2e18b0d05159f5fc584033f6f22527842f2eeaab3e8234d51ce65a706d96e61e84a9136c209822f8ebc9b32eb296e299bfbe3a23a025de390cd5786b41db48aa3e6fb8c0ce239e462707f5f6", "hex"));

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