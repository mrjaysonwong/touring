import { API_ENDPOINT } from '@utils/common/Common';
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

  const res = await fetch(
    `${API_ENDPOINT}/api/users?userId=${token?.user?._id}`,
    {
      headers: {
        cookie: context.req.headers.cookie,
      },
    }
  );

  const data = await res.json();

  return cb({ token, data });
};
