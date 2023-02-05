import { getSession } from 'next-auth/react';

export const requireAuthentication = async (context, cb) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return cb({ session });
};
