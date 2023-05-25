import { useState, useEffect } from 'react';
import Head from 'next/head';
import LinearIndeterminate from '@components/loaders/indeterminate/LoaderStyle-2';
import { getToken } from 'next-auth/jwt';
import { useSession } from 'next-auth/react';
import WelcomeHeader from '@components/header/welcome/WelcomeHeader';


export default function Welcome() {
  const [isLoading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== 'loading') {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [status]);

  return (
    <>
      <Head>
        <title>Welcome | Touring</title>
      </Head>

      {isLoading ? <LinearIndeterminate /> : <WelcomeHeader data={session} />}

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

  if (token.user.role === 'admin') {
    return {
      redirect: {
        destination: '/dashboard',
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
