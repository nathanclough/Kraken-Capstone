import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Gallery from './Gallery'
import Transaction from './Transaction'
import { KrakenAPI } from '../../api.js';

const api = new KrakenAPI()
const format = {
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
    color: "rgb(0, 110, 210)"
}
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
        <Box sx={{ p: 2 }}>
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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [nfts,setNfts] = React.useState([]);

  React.useEffect( () => {
    try{
    window.cardano.nami.enable()
      .then(res => res.getBalance()
        .then(bytes => api.getBalance(bytes)
        .then(res => {
          console.log(res)
          setNfts(res)}
          )
        )
      ) }
      catch(error){
        console.log(error)
      }
  }, [])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="My Gallery" {...a11yProps(0)} style={{...format}} />
          <Tab label="Transactions" {...a11yProps(1)} style={{...format}} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Gallery nfts={nfts}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Transaction/>
      </TabPanel>
    </Box>
  );
}