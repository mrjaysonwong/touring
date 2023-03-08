import Head from 'next/head';
import { getToken } from 'next-auth/jwt';
import AccessDenied from '@components/layout/AccessDenied';
import CreateInvoiceDashboard from '@components/dashboard/sidenav/management/components/invoice/Create';

export default function CreateInvoice(props) {
  const { token } = props;
  const isAdmin = token.user.role === 'admin';
  return (
    <>
      <Head>
        <title>Invoice: List | Touring</title>
      </Head>

      {isAdmin ? <CreateInvoiceDashboard /> : <AccessDenied />}
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
