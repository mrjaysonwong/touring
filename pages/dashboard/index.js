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

export default function Dashboard(props) {
  console.log(props);

  // const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Dashboard | Touring</title>
      </Head>

      {props.token.user.role !== 'admin' ? (
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
              sx={{ color: 'red', height: '100px', width: '100px' }}
            />
            <Typography variant="h2">Access Denied</Typography>
            <Typography variant="h6">
              Only Admin can view this page. <br />
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
      ) : (
        <Container sx={{ mt: 10 }}>
          <Typography variant="h6">
            Welcome Admin! You can view this content
          </Typography>
        </Container>
      )}
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
