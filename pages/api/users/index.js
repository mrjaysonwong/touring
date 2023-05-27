import connectMongo from 'database/connection';
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
} from '@pages/api/controllers/user';
// import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  try {
    connectMongo().catch(() =>
      res.status(500).json({ error: 'Connection Failed...!' })
    );

    // type of request
    const { method, query } = req;

    switch (method) {
      case 'GET':
        const session = await getSession({ req });
        if (!query.userId) {
          await getUsers(req, res, session);
          break;
        }

        await getUser(req, res, session);
        break;

      case 'POST':
        await createUser(req, res);
        break;
      case 'PATCH':
        await updateUser(req, res);
        break;
      case 'DELETE':
        res.status(200).json({ method, name: 'DELETE Request' });
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
        res.status(405).send(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.log('Method Error:', error.message);
    // throw new Error(error.message)
  }
}

