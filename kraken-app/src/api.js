import axios from 'axios'

const url = "http://localhost:3003/mintUtxos"
const blockfrost = "https://cardano-testnet.blockfrost.io/api/v0/txs/"
const config = {headers: {
  "project_id": "testnet7yHbEpE8tPf15bJ3j8A5BFrFCbNiNFCs"
}}

const getImageLink = (image) =>`https://ipfs.io/${image.replace(":","")}`

const getMintUtxos =  async () => axios.get(url).then( (response) => response.data["result"])

const getMetaData = async (utxo) => axios.get(`${blockfrost}${utxo["txHash"]}/metadata`,config)
.then( (response) => { 
    try
    {
        // If policy id doesn't match then the NFT is fake and would throw error 
        utxo.metadata = response.data[0].json_metadata[utxo.policyId][utxo.tokenName]
        utxo.metadata.image = getImageLink(utxo.metadata.image)
        return utxo
    }
    catch(error){
        console.log(utxo)
        return null
    }
    }
).catch(error => console.log(error))

export class KrakenAPI {
    async getMarketplaceNfts(){
        return getMintUtxos().then((uts) =>{
            return uts.map( tx => getMetaData(tx) )
            }).then(res => Promise.all(res).then( (res) => res.filter(x => x !== null)))
        
    }

    getMarketplacePreview(){
        return this.getMarketplaceNfts().then(res => res.slice(0,3))
    }
}