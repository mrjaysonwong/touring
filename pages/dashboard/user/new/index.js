import Head from 'next/head';
import { getToken } from 'next-auth/jwt';
import AccessDenied from '@components/layout/AccessDenied';
import CreateUserDashboard from '@components/dashboard/sidenav/management/components/user/Create';

export default function CreateUser(props) {
  const { token } = props;

  const isAdmin = token.user.role === 'admin';
  return (
    <>
      <Head>
        <title>User: Create New | Touring</title>
      </Head>

      {isAdmin ? <CreateUserDashboard /> : <AccessDenied />}
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
