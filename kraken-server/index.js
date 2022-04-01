// server/index.js
const CardanocliJs = require("cardanocli-js");
var cors = require('cors')
const fs = require("fs");
const CSL = require("@emurgo/cardano-serialization-lib-nodejs")

const cardanocliJs = new CardanocliJs({
    network: "testnet-magic 1097911063",
    era: "alonzo",
    dir: "/app/data/testnet",
    shelleyGenesisPath: "/data/config/testnet-shelley-genesis.json",
    socketPath: "/ipc/node.socket",
  });

const express = require("express");

const PORT = process.env.PORT || 3003;

const wallet = cardanocliJs.wallet("KrakNFT");
const realAssetName = "KrakNFT"
const hexAssetName = Buffer.from(realAssetName).toString('hex')
console.log(cardanocliJs.queryUtxo("addr_test1qr65ngpmln0268ye88fan86hk2cvp2rf4sxtxymartvap3y68hdqaa8nm03pd7gc0wereyk8eyzst08hkpf54j5csk6s5396tw"))

const app = express();
app.use(cors())

app.get("/api", (req, res) => {
    res.json({ message: cardanocliJs.queryTip() });
  });

app.get("/balance",(req,res) => {
  let v = CSL.Value.from_bytes(Buffer.from(req.query.balance,'hex') )
  console.log(v.multiassets())
  res.json({balance: v.coin().to_str() })
})

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