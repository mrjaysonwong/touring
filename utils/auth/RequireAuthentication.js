// import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';

export const requireAuthentication = async (context, cb) => {
  const token = await getToken(context);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const API_ENDPOINT =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXTAUTH_URL
      : 'http://localhost:3000/';

  const res = await fetch(
    `${API_ENDPOINT}api/users?userId=${token?.user?._id}`,
    {
      headers: {
        cookie: context.req.headers.cookie,
      },
    }
  );

  // const res = await fetch(
  //   `https://touring.vercel.app/api/users?userId=${token?.user?._id}`,
  //   {
  //     headers: {
  //       cookie: context.req.headers.cookie,
  //     },
  //   }
  // );

  const data = await res.json();

  return cb({ token, data });
};
