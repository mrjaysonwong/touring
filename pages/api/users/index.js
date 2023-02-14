import connectMongo from 'database/connection';
import {
  getUser,
  getUsers,
  postUser,
  updateUser,
} from '@pages/api/controllers/user';
import { getToken } from 'next-auth/jwt';

export default async function handler(req, res) {
  try {
    connectMongo().catch(() =>
      res.status(405).json({ error: 'Connection Failed...!' })
    );

    // type of request
    const { method, query } = req;

    switch (method) {
      case 'GET':
        const token = await getToken({ req });
        if (!query.userId) {
          await getUsers(req, res, token);
          break;
        }

        await getUser(req, res, token);
        break;

      case 'POST':
        await postUser(req, res);
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
