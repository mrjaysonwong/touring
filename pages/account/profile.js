import Head from 'next/head';
import { createContext } from 'react';
import { useTheme } from '@mui/styles';
import { Box, Container, useMediaQuery } from '@mui/material';
import { requireAuthentication } from '@utils/auth/RequireAuthentication';
import Tabs from '@components/tabs/Tabs';

export const DataContext = createContext();

export default function Profile(props) {
  const theme = useTheme();
  const minWidth900px = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <Head>
        <title>Profile Settings | Touring</title>
      </Head>

      <Container sx={{ my: 12 }}>
        <Box
          sx={{
            flexGrow: 1,
            display: `${minWidth900px ? 'flex' : 'block'}`,
          }}
        >
          <DataContext.Provider
            value={{
              ...props,
            }}
          >
            <Tabs />
          </DataContext.Provider>
        </Box>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  return requireAuthentication(context, ({ token, data }) => {
    return {
      props: {
        token,
        data,
      },
    };
  });
}
