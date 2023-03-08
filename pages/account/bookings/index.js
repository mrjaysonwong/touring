import Head from 'next/head';
import Layout from '@components/layout/Layout';
import { Button, Box, Container, Typography, CardMedia } from '@mui/material';
import { requireAuthentication } from '@utils/auth/RequireAuthentication';

export default function Bookings(props) {
  return (
    <>
      <Head>
        <title>Bookings | Touring</title>
      </Head>

      <Layout>
        <Container sx={{ mt: 10 }}>My Bookings</Container>
      </Layout>
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
