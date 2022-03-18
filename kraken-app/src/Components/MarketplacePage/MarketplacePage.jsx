import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import NFTCard from '../NFTCard/NFTCard.jsx';
//import { data } from '../../CardData.js';
import KrakNFT0 from '../../KrakNFT0.png';
import KrakNFT1 from '../../KrakNFT1.png';
import KrakNFT2 from '../../KrakNFT2.png';

const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


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

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getImage = (index) => {
    if (index === 0 ){
      return KrakNFT0
    }
    else if (index === 1){
      return KrakNFT1
    }
    else{
      return KrakNFT2;
    }
  }

  return (
    <>
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Buy NFTs From Users" {...a11yProps(0)}/>
          <Tab label="Buy NFTs From KrakNFT" {...a11yProps(1)}/>
          <Tab label="Sell Your Owned NFTs" {...a11yProps(2)}/>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Container sx={{ py: 8 }} maxWidth="xl">
          <Typography variant="h6" gutterBottom component="div">
            NFTs for Sale by Users
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}> 
            {cards.map((card, index) => (
              <NFTCard name={`Nft ${index}`} image={getImage(index)}/>
            ))}
          </Box>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Container sx={{ py: 8 }} maxWidth="xl">
          <Typography variant="h6" gutterBottom component="div">
            NFTs for Sale by KrakNFT
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}> 
            {cards.map((card, index) => (
              <NFTCard name={`Nft ${index}`} image={getImage(index)}/>
            ))}
          </Box>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Container sx={{ py: 8 }} maxWidth="xl">
          <Typography variant="h6" gutterBottom component="div">
            NFTs for Sale by You
          </Typography>
        </Container>
      </TabPanel>
    </Box>
    </>
  );

}
export default MarketplacePage;