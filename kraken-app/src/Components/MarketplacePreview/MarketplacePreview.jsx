import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import NFTCard from '../NFTCard/NFTCard.jsx';
//import { data } from '../../CardData.js';
import KrakNFT0 from '../../KrakNFT0.png';
import KrakNFT1 from '../../KrakNFT1.png';
import KrakNFT2 from '../../KrakNFT2.png';
import axios from 'axios'
const cards = [0, 1, 2];

const url = "http://localhost:3003/featured"

const blockfrost = "https://cardano-testnet.blockfrost.io/api/v0/txs/"

const config = {headers: {
  "project_id": "testnet7yHbEpE8tPf15bJ3j8A5BFrFCbNiNFCs"
}}


function MarketplacePreview(props) {
  const [images, setImages] = React.useState([""])
  const getImage = (index) => {
    if (index === 0 ){
      return images[0]
    }
    else if (index === 1){
      return KrakNFT1
    }
    else{
      return KrakNFT2;
    }
  }
  React.useEffect( () =>{
    axios.get(url).then( (response) => {
      console.log(response)
    })
    .catch(error => console.log(`error: ${error}`))

    axios.get(`${blockfrost}e95f64857daf4ff763d9dff829d62c0c192b0f7818a7e87a4fc6c3b075572547/metadata`,config)
    .then( (response) => 
    setImages([`https://ipfs.io/${response.data[0].json_metadata
      ["c8b21d0e3825ac82db8add095b926d0a1be026a1cd0de4e752a87a16"]
      ["KrakNFT"]["image"].replace(":","")}`]))
  }, [])

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };


  return (
    <>
    <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6, display: 'flex', flexGrow: 1, flexWrap: 'wrap' }}>
      <Container sx={{ py: 8 }} maxWidth="md">
          <Box sx={{ display: 'flex' }}> 
            {cards.map((card, index) => (
              <Box sx={{ display: 'flex', p: 1, m: 1, flexGrow: 1 }}>
                  <NFTCard name={`Nft ${index}`} image={getImage(index)}/>
              </Box>
            ))}
          </Box>
          <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
          <Pagination count={3} page={page} onChange={handleChange} />
          </Stack>
        </Container>
      </Box>
    </>
  );
}
export default MarketplacePreview;

/*function MarketplacePreview(props) {

  const [page, setCurrentPage] = React.useState(1);
  const handleChange = (event, page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <Box sx={{ bgcolor: 'background.paper', pt: 1, pb: 6, display: 'flex', flexGrow: 1, flexWrap: 'wrap'}}>
        <Container sx={{ py: 1 }} maxWidth="md">
          <Box sx={{ display: 'flex' }}> 
            {data.map((cards, key) => (
              <NFTCard key={data} name={data.name} image={data.image} />
            ))}
          </Box>
          <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
            <Pagination count={3} page={page} onChange={handleChange} />
          </Stack>
        </Container>
      </Box>
    </>
  );

}
export default MarketplacePreview;*/