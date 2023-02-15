import Head from 'next/head';
import LandingHeader from '@components/header/LandingHeader';
import { getToken } from 'next-auth/jwt';

export default function Home(props) {
  // console.log('ssr', props);

  // const testData = props.data.result.map((user, index) => (
  //   <li key={index}>{user.name}</li>
  // ));

  return (
    <>
      <Head>
        <title>Touring</title>
      </Head>

      <LandingHeader data={props} />

      {/* {testData} */}
    </>
  );
}

/** SSR here */
export async function getServerSideProps(context) {
  const token = await getToken(context);

  return {
    props: {
      token,
    },
  };
}
