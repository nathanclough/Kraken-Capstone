import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FilterListIcon from '@mui/icons-material/FilterList';
import Typography from '@mui/material/Typography';

export default function FilterSearch(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    function set_props(){
        
    };

  return (
    <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, flexWrap: 'wrap'}}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search NFTs"
        inputProps={{ 'aria-label': 'Search NFTs' }}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon/>
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton sx={{ p: '10px' }} aria-label="filter">
        <Typography>
            Filter
        </Typography>
        <FilterAltIcon/>
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton sx={{ p: '10px' }} aria-label="filter" onClick={handleClick} >
        <Typography>
            Sort
        </Typography>
        <FilterListIcon/>
      </IconButton>
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => {
            handleClose();
            props.sort = "Name_Asc"}}>Name Ascending<ArrowUpwardIcon/></MenuItem>
        <MenuItem onClick={() => {
            handleClose();
            props.sort = "Name_Des"}}>Name Descending<ArrowDownwardIcon/></MenuItem>
        <MenuItem onClick={handleClose}>ID Number Ascending<ArrowUpwardIcon/></MenuItem>
        <MenuItem onClick={handleClose}>ID Number Descending<ArrowDownwardIcon/></MenuItem>
      </Menu>
    </Paper>
    </div>
  );
}