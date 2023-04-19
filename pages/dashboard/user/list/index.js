import Head from 'next/head';
import { getToken } from 'next-auth/jwt';
import AccessDenied from '@components/layout/AccessDenied';
import UserListDashboard from '@components/dashboard/sidenav/management/components/users/List.';
import { API_ENDPOINT } from '@utils/common/Common';

export default function UserList(props) {
  const { token, data } = props;
  const isAdmin = token.user.role === 'admin';

  return (
    <>
      <Head>
        <title>User: List | Touring</title>
      </Head>

      {isAdmin ? <UserListDashboard data={data} /> : <AccessDenied />}
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

  const res = await fetch(`${API_ENDPOINT}api/users`, {
    headers: {
      cookie: context.req.headers.cookie,
    },
  });

  const data = await res.json();

  return {
    props: {
      token,
      data,
    },
  };
}
