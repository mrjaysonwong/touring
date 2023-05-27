import { API_ENDPOINT } from '@utils/common/Common';
import { getSession } from 'next-auth/react';
// import { getToken } from 'next-auth/jwt';

export const requireAuthentication = async (context, cb) => {
  const session = await getSession(context);
  // const token = await getToken(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const res = await fetch(
    `${API_ENDPOINT}/api/users?userId=${session?.user?._id}`,
    {
      headers: {
        cookie: context.req.headers.cookie,
      },
    }
  );

  const data = await res.json();

  return cb({ session, data });
};
