import Head from 'next/head'
import { requireAuthentication } from 'helpers/utils/auth/RequireAuthentication';

export default function Dashboard() {
  return (
    <>
    <Head>
      <title>Dashboard | Touring</title>
    </Head>
    Dashboard page
    </>
  )
}

export async function getServerSideProps(context) {
  return requireAuthentication(context, ({ session }) => {
    return {
      props: {
        session,
      },
    };
  });
}
