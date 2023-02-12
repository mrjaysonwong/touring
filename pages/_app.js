import { createContext } from 'react';
import Head from 'next/head';
import '../styles/globals.css';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@src/theme/createEmotionCache';
import parseCookies from '@utils/theme/parseCookies';
import MuiThemeProvider from '@utils/common/ThemeProvider';
import { SessionProvider } from 'next-auth/react';
import Layout from '@components/layout/Layout';

export const ThemeMode = createContext();

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    themeSetting,
  } = props;

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <SessionProvider session={pageProps?.session}>
        <CacheProvider value={emotionCache}>
          <ThemeMode.Provider value={themeSetting}>
            <MuiThemeProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </MuiThemeProvider>
          </ThemeMode.Provider>
        </CacheProvider>
      </SessionProvider>
    </>
  );
};

export default MyApp;

MyApp.getInitialProps = async ({ ctx }) => {
  let themeSetting;
  if (ctx.req && ctx.req.headers.cookie) {
    themeSetting = parseCookies(ctx).cookieColorMode;
  }

  return {
    themeSetting,
  };
};
