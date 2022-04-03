import * as React from 'react';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import NFTCard from '../NFTCard/NFTCard.jsx';
import { KrakenAPI } from '../../api.js';
import FilterSearch from '../FilterSearch/FilterSearch.jsx'

const api = new KrakenAPI()

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function MarketplacePage(props) {
  const [nfts, setNfts] = React.useState([])
  const [value, setValue] = React.useState(0);
  const [search,setSearch] = React.useState({property: "name",value:""})

  const sort = (prop,direction) =>{
    var newNfts = [...nfts]
    newNfts = sortFunc({"nfts" :newNfts,"prop":prop, "direction":direction})
    setNfts(newNfts)
    
  }

  const sortFunc =(args) =>{
    args.nfts.sort((a, b) => (a.metadata[args.prop] > b.metadata[args.prop]) ? 1 : -1)
    if(args.direction === "desc"){
      args.nfts.reverse();
    }

    return args.nfts
  }

  React.useEffect( () =>{
    api.getMarketplaceNfts().then( (res) => {
            var n = sortFunc({"nfts" :res,"prop":"name", "direction":"asc"})  
            setNfts(n)
           })
  }, [])

  const setSearchVals = (args)=>{
    setSearch({property:args.property,value: args.value})
  }
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Buy NFTs From KrakNFT" {...a11yProps(1)}/>
          <Tab label="BUY NFTS FROM USERS" {...a11yProps(2)}/>
        </Tabs>
      </Box>
      <FilterSearch setSearch={setSearchVals} search={search} sort={sort}></FilterSearch>
      <TabPanel value={value} index={0}>
        <Container sx={{ py: 8 }} maxWidth="xl">
          <Typography variant="h6" gutterBottom component="div">
            NFTs for Sale by KrakNFT
          </Typography>
          <Grid
            sx={{ bgcolor: 'background.paper', pt: 8, pb: 8, display: 'flex', flexGrow: 1, flexWrap: 'wrap'}}
            container
            columnSpacing="row"
            spacing={2}
            className={MarketplacePage.container}
            justifyContent="flex-end"
          > 
            {nfts.filter(x => {              
              var res = x.metadata[search.property].toLowerCase().includes(search.value.toLowerCase())
              return res
            }).map((nft, index) => (
              <Grid item xs={4} sm={4} md={3}>
                  <NFTCard key={index} nft={nft} name={nft.metadata.name} image={nft.metadata.image}/>
              </Grid>
                  ))}
          </Grid>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Container sx={{ py: 8 }} maxWidth="xl">
          <Typography variant="h6" gutterBottom component="div">
            NFTs for Sale by Users
          </Typography>
        </Container>
      </TabPanel>
    </Box>
    </>
  );

}
export default MarketplacePage;