import Head from 'next/head';
import { getToken } from 'next-auth/jwt';
import AccessDenied from '@components/layout/AccessDenied';
import CreateTourDashboard from '@components/dashboard/sidenav/management/components/tour/Create';

export default function CreateTour(props) {
  const { token } = props;
  const isAdmin = token.user.role === 'admin';
  return (
    <>
      <Head>
        <title>Create: Tour | Touring</title>
      </Head>

      {isAdmin ? <CreateTourDashboard /> : <AccessDenied />}
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
