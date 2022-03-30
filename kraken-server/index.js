// server/index.js
const CardanocliJs = require("cardanocli-js");
var cors = require('cors')

const cardanocliJs = new CardanocliJs({
    network: "testnet-magic 1097911063",
    era: "alonzo",
    dir: "/data/testnet",
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

// Return list of utxos that contain NFT's
app.get("/featured", (req, res) =>{
    res.json({
        result: cardanocliJs.queryUtxo("addr_test1vzlvca7cmsnyptrk50ql2hp5d54gwyq4hzt6d4m9c8y5llczh2rd6")
    })
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});