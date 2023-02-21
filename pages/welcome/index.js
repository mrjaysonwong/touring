import { useState, useEffect } from 'react';
import Head from 'next/head';
import InitialLoading from '@components/placeholder/loading/InitialLoading';
import { getToken } from 'next-auth/jwt';
import { useSession } from 'next-auth/react';
import WelcomeHeader from '@components/header/WelcomeHeader';

export default function Welcome(props) {
  const [isLoading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== 'loading') {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [status]);

  return (
    <>
      <Head>
        <title>Welcome | Touring</title>
      </Head>

      {isLoading ? <InitialLoading /> : <WelcomeHeader data={session} />}
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
