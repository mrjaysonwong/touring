import Head from 'next/head';
import Layout from '@components/layout/Layout';
import { Container } from '@mui/material';

export default function Tours() {
  return (
    <>
      <Head>
        <title>Tours | Touring</title>
      </Head>

      <Layout>
        <Container sx={{ mt: 10 }}>Tour Page</Container>
      </Layout>
    </>
  );
}
