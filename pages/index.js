import Head from 'next/head';
import LandingHeader from '@components/header/LandingHeader';

export default function Home() {
  // console.log('ssr', props);

  // const testData = props.data.result.map((user, index) => (
  //   <li key={index}>{user.name}</li>
  // ));

  return (
    <>
      <Head>
        <title>Touring</title>
      </Head>

      <LandingHeader />

      {/* {testData} */}
    </>
  );
}

/** SSR here */
// export async function getServerSideProps(context) {
//   const res = await fetch('http://localhost:3000/api/users');
//   const data = await res.json();

//   console.log(data)

//   return {
//     props: {
//       data: data,
//     },
//   };
// }
