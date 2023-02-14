import { getSession } from 'next-auth/react';

export const requireAuthentication = async (context, cb) => {
  const session = await getSession(context);

  const res = await fetch(
    `http://localhost:3000/api/users?userId=${session?.user._id}`,
    {
      headers: {
        cookie: context.req.headers.cookie,
      },
    }
  );
  const data = await res.json();

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return cb({ session, data });
};
