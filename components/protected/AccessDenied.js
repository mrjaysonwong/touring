import Head from 'next/head';
import Link from 'next/link';
import Layout from '@components/layout/Layout';
import { styled } from '@mui/system';
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  TextField,
  MenuItem,
  ListSubheader,
} from '@mui/material';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

export default function AccessDenied() {
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Box>
          <DoDisturbIcon
            sx={{ color: '#b9121b', height: '100px', width: '100px' }}
          />
          <Typography variant="h2">Access Denied</Typography>
          <Typography variant="h6">
            Only admin users can see this page. <br />
          </Typography>
          <Link href="/">Return Home</Link>
          <br />
          <br />
          for testing admin. <br />
          <Typography variant="body1">
            Email: admin@touring.com <br />
            Password: test1234 <br />
          </Typography>
        </Box>
      </Container>
    </>
  );
}
