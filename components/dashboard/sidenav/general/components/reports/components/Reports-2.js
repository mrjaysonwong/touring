import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';

function createData(ref, tour, client, booking, status, amount) {
  return { ref, tour, client, booking, status, amount };
}

const rows = [
  createData('AA111', 'SAMAL TOURS', 'JOHN DOE', 2, 'PAID', '100'),
  createData('AA222', 'BORACAY TOURS', 'JANE SMITH', 3, 'PENDING', '300'),
  createData('AA333', 'JTOURS HIKING', 'ALEX REED', 2, 'PAID', '180'),
  createData(
    'AA444',
    'JAYSTINATION TOURS',
    'ALESHA KEYS',
    1,
    'CANCELLED',
    '150'
  ),
  createData('AA555', 'CITY TOURS', 'REX JOHNJOSN', 4, 'PAID', '400'),
  createData('AA666', 'LANDMARKS TOURS', 'CARLA TORRES', 8, 'PAID', '800'),
];

export default function ReportsTwo() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const breakpoint = useMediaQuery(theme.breakpoints.down('sm', '100'));

  return (
    <>
      <Paper
        sx={{
          my: 5,
          width: breakpoint ? 480 : '100%',
          backgroundColor: isDarkMode ? '#121212' : '#f5f5f5',
        }}
      >
        <TableContainer>
          <Typography
            sx={{ flex: '1 1 100%', m: 2 }}
            variant="h5"
            id="tableTitle"
            component="div"
          >
            Recent Bookings
          </Typography>
          <Table sx={{ width: '100%' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>BOOKING REF. #</TableCell>
                <TableCell align="right">TOUR NAME</TableCell>
                <TableCell align="right">CLIENT NAME</TableCell>
                <TableCell align="right">TOTAL BOOKING</TableCell>
                <TableCell align="right">STATUS</TableCell>
                <TableCell align="right">TOTAL AMOUNT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.ref}>
                  <TableCell component="th" scope="row">
                    {row.ref}
                  </TableCell>
                  <TableCell align="right">{row.tour}</TableCell>
                  <TableCell align="right">{row.client}</TableCell>
                  <TableCell align="right">{row.booking}</TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 500,
                      color: `${
                        row.status === 'PAID'
                          ? 'green'
                          : row.status === 'PENDING'
                          ? 'orange'
                          : 'red'
                      }`,
                    }}
                  >
                    {row.status}
                  </TableCell>
                  <TableCell align="right">${row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
