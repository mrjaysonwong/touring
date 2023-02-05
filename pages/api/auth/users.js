import connectMongo from 'database/connection';
import {
  getUsers,
  postUser,
  updateUser,
} from '@pages/api/controller/users/usersController';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  try {
    connectMongo().catch(() =>
      res.status(405).json({ error: 'Connection Failed...!' })
    );

    // type of request
    const { method } = req;

    if (method === 'GET') {
      const session = await getSession({ req });

      if (!session || session.user.role !== 'admin') {
        res.status(403).send(`You don't have authorization to view this page.`);
        return;
      }
    }

    switch (method) {
      case 'GET':
        await getUsers(req, res);
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
    console.log('Error:', error.message);
    // throw new Error(error.message)
  }
}
