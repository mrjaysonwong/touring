import connectMongo from 'database/connection';
import { postUser } from '@pages/api/controller/users/usersController';

/** explicit flag disables warnings unresolved requests. */
export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: 'Connection Failed...!' })
  );

  const { method } = req;

  if (method === 'POST') {
    await postUser(req, res);
    return;
  } else {
    res.status(405).send(`HTTP ${method} not valid, only POST Accepted`);
  }
}
