import { useState, useEffect } from 'react';
import Layout from '@components/layout/Layout';
import { Container, Box, Typography } from '@mui/material';
import InitialLoading from '@components/placeholder/loading/initialLoading';
import { requireAuthentication } from '@utils/auth/RequireAuthentication';
import { getToken } from 'next-auth/jwt';

export default function Welcome(props) {
  //   console.log(props);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
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
            <Typography variant="h4">
              Welcome to Touring, <br /> {props.token.name}!
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
