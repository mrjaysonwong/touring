import Head from 'next/head';
// import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import AccessDenied from '@components/layout/AccessDenied';
import ReportsDashboard from '@components/dashboard/sidenav/general/components/reports';

export default function Dashboard(props) {
  const { session } = props;

  const isAdmin = session.user.role === 'admin';

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
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
