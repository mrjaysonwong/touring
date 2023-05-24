import Head from 'next/head';
import Signin from '@components/credentials/Signin';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (session) router.push('/');

  return (
    <>
      <Head>
        <title>Login | Touring</title>
      </Head>

      <Signin />
    </>
  );
}
