import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@components/layout/Layout';
import { Container, Typography } from '@mui/material';
import InitialLoading from '@components/placeholder/loading/initialLoading';
import { getToken } from 'next-auth/jwt';

export default function Welcome(props) {
  //   console.log(props);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <Head>
        <title>Welcome | Touring</title>
      </Head>

      {isLoading ? (
        <InitialLoading />
      ) : (
        <Layout>
          <Container
            sx={{
              mt: 15,
              textAlign: 'center',
            }}
          >
            <Typography variant="h4">Welcome {props.token.name}!</Typography>
          </Container>
        </Layout>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const token = await getToken(context);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      token,
    },
  };
}
