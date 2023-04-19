import {
  Typography,
  Box,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/system';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#f5f5f5',
  ...theme.typography.body1,
  padding: theme.spacing(2),
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
}));

const StyledBox = styled(Box)({
  display: 'flex',
  padding: 10,
  borderRadius: '50%',
  color: '#f5f5f5',
});

const SingleRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  margin: '0.5rem 0',
});

const Title = styled(Typography)({
  fontWeight: 600,
  textTransform: 'uppercase',
});

export default function ReportsOne() {
  const theme = useTheme();
  const breakpoint = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <Typography variant="h5" sx={{ mb: 5 }}>
        Reports
      </Typography>

      <Grid
        container
        spacing={2}
        direction={`${breakpoint ? 'row' : 'column'}`}
      >
        <Grid item xs={6} md={6} lg={3}>
          <Item>
            <SingleRow>
              <Title variant="body1">Total Bookings</Title>
              <StyledBox sx={{ bgcolor: 'darkcyan', ml: 'auto' }}>
                <LoyaltyIcon />
              </StyledBox>
            </SingleRow>

            <SingleRow>
              <StyledBox>
                <ArrowUpwardOutlinedIcon sx={{ color: '#388e3c' }} />
              </StyledBox>
              <Typography variant="h4">45</Typography>
            </SingleRow>
            <SingleRow>
              <StyledBox sx={{ color: '#388e3c' }}>+25%</StyledBox>
              <Typography variant="body1">Since last month</Typography>
            </SingleRow>
          </Item>
        </Grid>
        <Grid item xs={6} md={6} lg={3}>
          <Item>
            <SingleRow>
              <Title variant="body1">Total Earnings</Title>
              <StyledBox sx={{ bgcolor: 'GoldenRod', ml: 'auto' }}>
                <PaymentsOutlinedIcon />
              </StyledBox>
            </SingleRow>
            <SingleRow>
              <StyledBox>
                <ArrowUpwardOutlinedIcon sx={{ color: '#388e3c' }} />
              </StyledBox>
              <Typography variant="h4">$1250</Typography>
            </SingleRow>
            <SingleRow>
              <StyledBox sx={{ color: '#388e3c' }}>+12%</StyledBox>
              <Typography variant="body1">Since last month</Typography>
            </SingleRow>
          </Item>
        </Grid>
        <Grid item xs={6} md={6} lg={3}>
          <Item>
            <SingleRow>
              <Title variant="body1">Total Users</Title>
              <StyledBox sx={{ bgcolor: 'lightsalmon', ml: 'auto' }}>
                <PeopleOutlinedIcon />
              </StyledBox>
            </SingleRow>

            <SingleRow>
              <StyledBox>
                <ArrowUpwardOutlinedIcon sx={{ color: '#388e3c' }} />
              </StyledBox>
              <Typography variant="h4">78</Typography>
            </SingleRow>
            <SingleRow>
              <StyledBox sx={{ color: '#388e3c' }}>+32%</StyledBox>
              <Typography variant="body1">Since last month</Typography>
            </SingleRow>
          </Item>
        </Grid>
        <Grid item xs={6} md={6} lg={3}>
          <Item>
            <SingleRow>
              <Title variant="body1">Pending Bookings</Title>
              <StyledBox sx={{ bgcolor: 'brown', ml: 'auto' }}>
                <PendingActionsOutlinedIcon />
              </StyledBox>
            </SingleRow>

            <SingleRow>
              <StyledBox>
                <ArrowDownwardOutlinedIcon sx={{ color: '#d32f2f' }} />
              </StyledBox>
              <Typography variant="h4">3</Typography>
            </SingleRow>
            <SingleRow>
              <StyledBox sx={{ color: '#d32f2f' }}>-3%</StyledBox>
              <Typography variant="body1">Since last month</Typography>
            </SingleRow>
          </Item>
        </Grid>
      </Grid>
    </>
  );
}
