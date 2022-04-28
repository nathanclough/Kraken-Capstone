import axios from 'axios'

const url = "http://localhost:3003/"
const blockfrost = "https://cardano-testnet.blockfrost.io/api/v0/txs/"
const config = {headers: {
  "project_id": "testnet7yHbEpE8tPf15bJ3j8A5BFrFCbNiNFCs"
}}

const getImageLink = (image) =>`https://ipfs.io/${image.replace(":","")}`

const getMintUtxos =  async () => axios.get(`${url}mintUtxos`).then( (response) => response.data["result"])

const getMetadata = async (utxo) => axios.get(`${blockfrost}${utxo["txHash"]}/metadata`,config)
.then( (response) => { 
    try
    {
        // If policy id doesn't match then the NFT is fake and would throw error 
        utxo.metadata = response.data[0].json_metadata[utxo.policyId][utxo.tokenName]
        utxo.metadata.image = getImageLink(utxo.metadata.image)
        return utxo
    }
    catch(error){
        console.log(error)
        console.log(utxo)
        return null
    }
    }
).catch(error => console.log(error))

export class KrakenAPI {
    async getMarketplaceNfts(){
        return getMintUtxos().then((uts) =>{
            return uts.map( tx => getMetadata(tx) )
            }).then(res => Promise.all(res).then( (res) => res.filter(x => x !== null)))
        
    }

    getMarketplacePreview(){
        return this.getMarketplaceNfts().then(res => res.slice(0,3))
    }

    getBalance(balance){
        return axios.get(`${url}balance`, {params: {balance}}).then(r =>{
            if(r.data.hasOwnProperty('ERROR')){
                return []
            }
            return getMetadata(r.data)
                    .then(r => {
                        console.log(r)
                    return [r]
                    })
    })

    }

    async getBuyTransaction( buyerAddress, buyerUtxos, policyId, mintTx, price,txId){
        var req = {
            "buyerAddress": buyerAddress,
            "buyerUtxos": buyerUtxos,
            "policyId": policyId,
            "mintTx": mintTx,
            "price": price,
            "txId": txId
        }
        console.log(req)
        return axios.post(`${url}buy`, req, {headers:{
            "Content-Type": "application/json"
        }}).then(r => {
            console.log(r)
            return r.data.tx
        })
    }

    async getFinalSignedTransaction(witness,buyTx){
        var req = {
            witnessSet : witness,
            transaction: buyTx

        }
        console.log(req)
        return axios.post(`${url}submitTx`, req, {headers:{
            "Content-Type": "application/json"
        }}).then(r => {
            console.log(r)
            return r.data.tx
        })
    }
}