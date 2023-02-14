// import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';

export const requireAuthentication = async (context, cb) => {
  const token = await getToken(context);

  // const res = await fetch(
  //   `http://localhost:3000/api/users?userId=${token?.user?._id}`,
  //   {
  //     headers: {
  //       cookie: context.req.headers.cookie,
  //     },
  //   }
  // );


  const res = await fetch(
    `https://touring.vercel.app/api/users?userId=${token?.user?._id}`,
    {
      headers: {
        cookie: context.req.headers.cookie,
      },
    }
  );
  const data = await res.json();

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return cb({ token, data });
};
