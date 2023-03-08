import Head from 'next/head';
import { getToken } from 'next-auth/jwt';
import AccessDenied from '@components/layout/AccessDenied';
import UserListDashboard from '@components/dashboard/sidenav/management/components/users/List.';

export default function UserList(props) {
  const { token } = props;
  const isAdmin = token.user.role === 'admin';
  return (
    <>
      <Head>
        <title>User: List | Touring</title>
      </Head>

      {isAdmin ? <UserListDashboard /> : <AccessDenied />}
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
