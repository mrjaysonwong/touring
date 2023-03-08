import Head from 'next/head';
import { getToken } from 'next-auth/jwt';
import AccessDenied from '@components/layout/AccessDenied';
import TourListDashboard from '@components/dashboard/sidenav/management/components/tours/List';

export default function TourList(props) {
  const { token } = props;
  const isAdmin = token.user.role === 'admin';
  return (
    <>
      <Head>
        <title>Tour: List | Touring</title>
      </Head>

      {isAdmin ? <TourListDashboard /> : <AccessDenied />}
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
