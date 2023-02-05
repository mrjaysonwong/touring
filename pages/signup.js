import Head from 'next/head';
import Register from '@components/credentials/Register';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function Signup() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (session) router.push('/');

  return (
    <>
      <Head>
        <title>Sign Up | Touring</title>
      </Head>

      <Register />
    </>
  );
}
