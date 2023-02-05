import Head from 'next/head';
import LandingHeader from '@components/LandingHeader';

export default function Home() {
  return (
    <>
      <Head>
        <title>Touring</title>
      </Head>

      <LandingHeader />
    </>
  );
}
