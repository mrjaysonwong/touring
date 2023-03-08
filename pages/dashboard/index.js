import Head from 'next/head';
import { getToken } from 'next-auth/jwt';
import AccessDenied from '@components/layout/AccessDenied';
import ReportsDashboard from '@components/dashboard/sidenav/general/components/reports';

export default function Dashboard(props) {
  const { token } = props;
  const isAdmin = token.user.role === 'admin';

  return (
    <>
      <Head>
        <title>Reports: Overview | Touring</title>
      </Head>

      {isAdmin ? <ReportsDashboard /> : <AccessDenied />}
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
