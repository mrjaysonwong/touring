import Head from 'next/head';
import '../styles/globals.css';
import PageProvider from 'helpers/theme/PageProvider';
import { SessionProvider } from 'next-auth/react';
import Layout from '@components/layout/Layout';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <SessionProvider session={pageProps.session}>
        <PageProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PageProvider>
      </SessionProvider>
    </>
  );
}
