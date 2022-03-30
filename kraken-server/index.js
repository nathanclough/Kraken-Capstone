// server/index.js
const CardanocliJs = require("cardanocli-js");
var cors = require('cors')

const cardanocliJs = new CardanocliJs({
    network: "testnet-magic 1097911063",
    era: "alonzo",
    dir: "/app/data/testnet",
    shelleyGenesisPath: "/data/config/testnet-shelley-genesis.json",
    socketPath: "/ipc/node.socket",
  });

const express = require("express");

const PORT = process.env.PORT || 3003;

const app = express();
app.use(cors())

app.get("/api", (req, res) => {
    res.json({ message: cardanocliJs.queryTip() });
  });

// maybe mongo db database 


// mints nft with given ipfs link
// store the policy id and mint transaction id  


// Return list of utxos that contain NFT's

const policyId = "c8b21d0e3825ac82db8add095b926d0a1be026a1cd0de4e752a87a16.4b72616b4e4654"

app.get("/featured", (req, res) =>{
  
  cliResult = 
  [
    { "txHash":"e95f64857daf4ff763d9dff829d62c0c192b0f7818a7e87a4fc6c3b075572547",
      "txId":0,
      "value":
        {
          "lovelace":998145311,
          "undefined":null
        }
    },
    { "txHash":"e95f64857daf4ff763d9dff829d62c0c192b0f7818a7e87a4fc6c3b075572547",
      "txId":1,
      "value":
        {
          "lovelace":1500000,
          "c8b21d0e3825ac82db8add095b926d0a1be026a1cd0de4e752a87a16.4b72616b4e4654":1,
          "undefined":null
        }
    }
  ]


  res.json({
        
        result: cardanocliJs.queryUtxo("addr_test1vzlvca7cmsnyptrk50ql2hp5d54gwyq4hzt6d4m9c8y5llczh2rd6")
    })
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});