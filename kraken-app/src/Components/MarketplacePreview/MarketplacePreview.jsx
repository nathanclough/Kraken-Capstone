import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import NFTCard from '../NFTCard/NFTCard.jsx';
import axios from 'axios'

const url = "http://localhost:3003/mintUtxos"
const blockfrost = "https://cardano-testnet.blockfrost.io/api/v0/txs/"
const config = {headers: {
  "project_id": "testnet7yHbEpE8tPf15bJ3j8A5BFrFCbNiNFCs"
}}


function MarketplacePreview(props) {
  const [utxos, setUtxos] = React.useState([])

  const getMintUtxos =  async () => axios.get(url).then( (response) => response.data["result"])
  
  const getMetaData = async (utxo) => axios.get(`${blockfrost}${utxo["txHash"]}/metadata`,config)
  .then( (response) => { 
      try
      {
        // If policy id doesn't match then the NFT is fake and would throw error 
        utxo.metadata = response.data[0].json_metadata[utxo.policyId][utxo.tokenName]
        return utxo
      }
      catch(error){
        console.log(utxo)
        return null
      }
    }
  ).catch(error => console.log(error))

  const getImageLink = (image) =>`https://ipfs.io/${image.replace(":","")}`

  React.useEffect( () =>{
    getMintUtxos().then((uts) =>{
      return uts.map( tx => getMetaData(tx) )
      }).then(res => Promise.all(res).then( (res) => setUtxos(res.filter(x => x !== null))))
    
  }, [])

  const [page, setPage] = React.useState(0);
  
  const handleChange = (event, value) => {
    console.log(event.target)
    setPage(value + 1);
  };


  return (
    <>
    <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6, display: 'flex', flexGrow: 1, flexWrap: 'wrap' }}>
      <Container sx={{ py: 8 }} maxWidth="md">
          <Box sx={{ display: 'flex' }}> 
            {utxos.map( (nft, index) => {
              return (
              <Box sx={{ display: 'flex', p: 1, m: 1, flexGrow: 1 }}>
                  <NFTCard name={nft.metadata.name} image={getImageLink(nft.metadata.image)}/>
              </Box>)
            }
            )}
          </Box>
          <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
          <Pagination count={0} page={page} onChange={handleChange} />
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default MarketplacePreview;