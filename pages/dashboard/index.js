import Head from 'next/head';
import Link from 'next/link';
import { requireAuthentication } from '@utils/auth/RequireAuthentication';
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
// import { useSession } from 'next-auth/react';

export default function Dashboard(props) {
  // console.log(props);

  // const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Dashboard | Touring</title>
      </Head>

      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        {props.token?.user?.role !== 'admin' && (
          <Box>
            <DoDisturbIcon
              sx={{ color: 'red', height: '100px', width: '100px' }}
            />
            <Typography variant="h2">Access Denied</Typography>
            <Typography variant="h6">
              Only Admin can view this page. <br />
              <Link href="/">Return Home</Link>
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  return requireAuthentication(context, ({ token }) => {
    return {
      props: {
        token,
      },
    };
  });
}
