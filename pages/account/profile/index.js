import Head from 'next/head';
import Layout from '@components/layout/Layout';
import { createContext } from 'react';
import { useTheme } from '@mui/styles';
import { useRouter } from 'next/router';
import { Box, Container, useMediaQuery } from '@mui/material';
import { requireAuthentication } from '@utils/auth/RequireAuthentication';
import Tabs from '@components/tabs/account/Tabs';

export const DataContext = createContext();

export default function Profile(props) {
  const router = useRouter();

  const theme = useTheme();
  const breakpointMd = useMediaQuery(theme.breakpoints.up('md'));
  const breakpointSm = useMediaQuery(theme.breakpoints.up('sm'));

  const routerReplace = () => {
    router.replace(router.asPath, undefined, { scroll: false });
  };

  return (
    <>
      <Head>
        <title>Profile Settings | Touring</title>
      </Head>

      <Layout>
        <Container sx={{ my: 12 }}>
          <Box
            sx={{
              flexGrow: 1,
              display: `${breakpointMd ? 'flex' : 'block'}`,
            }}
          >
            <DataContext.Provider
              value={{
                ...props,
                routerReplace,
                breakpointSm,
              }}
            >
              <Tabs />
            </DataContext.Provider>
          </Box>
        </Container>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  return requireAuthentication(context, ({ session, data }) => {
    return {
      props: {
        session,
        data,
      },
    };
  });
}
