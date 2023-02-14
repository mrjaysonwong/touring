// import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';

export const requireAuthentication = async (context, cb) => {
  const token = await getToken(context);

  const res = await fetch(
    `http://localhost:3000/api/users/?userId=63de0ba6c4e8b31f73761137`,
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
