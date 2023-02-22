import Head from 'next/head';
import Layout from '@components/layout/Layout';
import { getToken } from 'next-auth/jwt';
import AccessDenied from '@components/protected/AccessDenied';
import Users from '@components/tabs/dashboard/admin/users';

export default function Dashboard(props) {
  return (
    <>
      <Head>
        <title>Dashboard | Touring</title>
      </Head>

      <Layout>
        {props.token.user.role !== 'admin' ? <AccessDenied /> : <Users />}
      </Layout>
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
