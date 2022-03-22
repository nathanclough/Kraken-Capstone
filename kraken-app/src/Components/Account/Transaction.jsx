import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'name', label: 'NFT Name', minWidth: 170 },
  { id: 'code', label: 'Date', minWidth: 100 },
  {
    id: 'population',
    label: 'Price (ADA)',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  }
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('Sea Kraken', '10/20/22', '200'),
  createData('Dune Kraken', '7/29/2022', '500'),
  createData('Shadow Kraken', '1/12/2021', '120'),
  createData('Sea Kraken', '5/28/2021', '550'),
  createData('Shadow Kraken', '11/21/2021', '500'),
  createData('Dune Kraken', '10/30/2020', '850'),
  createData('Shadow Kraken', '5/23/2020', '900'),
  createData('Sea Kraken', '1/29/2019', '200'),
  createData('Dune Kraken', '7/9/2021', '500'),
  createData('Shadow Kraken', '9/22/2021', '200'),
  createData('Sea Kraken', '10/24/2019', '200'),
  createData('Shadow Kraken', '1/10/2022', '350'),
  createData('Dune Kraken', '2/11/2022', '200'),
  createData('Sea Kraken', '4/29/2022', '500'),
  createData('Dune Kraken', '8/12/2019', '200'),
];

function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}export default StickyHeadTable;
