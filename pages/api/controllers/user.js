/** Controller */
import Users from '@model/userSchema';
import { hash } from 'bcryptjs';
import { filteredUsers } from '@utils/common/Common';

/** explicit flag disables warnings unresolved requests. */
export const config = {
  api: {
    externalResolver: true,
  },
};

// GET:http://localhost:3000/api/users
export async function getUsers(req, res, token) {
  try {
    if (!token || token.user.role !== 'admin') {
      res.status(403).json(`You don't have authorization to view this page.`);
      return;
    }

    const users = await Users.find({});

    if (!users) {
      return res.status(404).json({ error: 'Data not Found' });
    }

    res.status(200).json({
      total_users: users.length,
      // result: filteredUsers(users),
      result: users,
    });
  } catch (error) {
    res.status(422).json({ error: 'Error while fetching the data' });
  }
}

// GET:http://localhost:3000/api/users/userId
export async function getUser(req, res, token) {
  try {
    const { userId } = req.query;

    if (!token || token.user._id !== userId) {
      res.status(403).json(`You don't have authorization to view this page.`);
      return;
    }

    const user = await Users.findById(userId);

    res.status(200).json({
      result: user,
    });
  } catch (error) {
    res.status(422).json({ error: 'Error while fetching the data' });
  }
}

// POST:http://localhost:3000/api/users
export async function postUser(req, res) {
  try {
    if (!req.body) {
      return res.status(404).json({ success: false, error: 'Empty form data' });
    }

    const { firstName, lastName, email, password } = req.body;

    // check duplicate emails
    const checkExisting = await Users.findOne({ email });

    if (checkExisting) {
      return res.status(422).json({
        success: false,
        error: 'Email Already Exists',
      });
    }

    // hash password
    Users.create(
      {
        firstName,
        lastName,
        email,
        password: await hash(password, 12),
      },
      function (err, data) {
        if (err) {
          return res.status(500).json({ success: false, error: err });
        } else {
          // if no error
          res.status(201).json({
            success: true,
            message: 'Successfully Registered',
            user: data,
          });
        }
      }
    );
  } catch (error) {
    res.status(422).json({ error: 'Error while creating the data' });
  }
}

// PATCH:http://localhost:3000/api/users/userId
export async function updateUser(req, res) {
  try {
    const { userId } = req.query;
    const data = req.body;

    if (userId && data) {
      await Users.findByIdAndUpdate(userId, data, { new: true });

      return res.status(201).json({ success: true, ...data });
    }

    res.status(404).json({ success: false, error: 'User Not Selected...!' });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, error: 'Error while updating the data' });
  }
}
