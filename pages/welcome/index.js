import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@components/layout/Layout';
import { Container, Typography } from '@mui/material';
import InitialLoading from '@components/placeholder/loading/initialLoading';
import { getToken } from 'next-auth/jwt';
import { useSession } from 'next-auth/react';

export default function Welcome(props) {
  //   console.log(props);
  const [isLoading, setLoading] = useState(true);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== 'loading') {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [status]);

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
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Welcome {props.token.name}!
            </Typography>
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
