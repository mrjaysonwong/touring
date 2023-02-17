import Head from 'next/head';
import Layout from '@components/layout/Layout';
import { Container } from '@mui/material';

export default function About() {
  return (
    <>
      <Head>
        <title>About | Touring</title>
      </Head>

      <Layout>
        <Container sx={{ mt: 10 }}>About Page</Container>
      </Layout>
    </>
  );
}
