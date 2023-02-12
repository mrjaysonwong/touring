import Head from 'next/head';
import { Button, Box, Container, Typography, CardMedia } from '@mui/material';
import { requireAuthentication } from '@utils/auth/RequireAuthentication';

export default function Bookings(props) {
  return (
    <>
      <Head>
        <title>Bookings | Touring</title>
      </Head>

      <Container sx={{ mt: 10 }}>My Bookings</Container>
    </>
  );
}

export async function getServerSideProps(context) {
  return requireAuthentication(context, ({ session }) => {
    return {
      props: {
        session,
      },
    };
  });
}
