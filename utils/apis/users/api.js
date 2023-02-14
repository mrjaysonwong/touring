import { sleep } from '@utils/common/Sleep';

export async function getUsers() {
  try {
    // const apiUrl = 'http://localhost:3000/api/users';
    const apiUrl = `https://touring.vercel.app/api/users`;

    let res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error('An error occurred. Please try again.');
    }

    let data = await res.json();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const getUser = async (userId) => {
  try {
    const apiUrl = `http://localhost:3000/api/users?userId=${userId}`;
    // const apiUrl = `https://touring.vercel.app/api/users?userId=${userId}`;

    let res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error('An error occurred. Please try again.');
    }

    let data = await res.json();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const patchUser = async (userId, values) => {
  try {
    // const apiUrl = `http://localhost:3000/api/users?userId=${userId}`;
    const apiUrl = `https://touring.vercel.app/api/users?userId=${userId}`;

    await sleep(1000);

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    };

    let res = await fetch(apiUrl, options);

    if (!res.ok) {
      throw new Error('An error occurred. Please try again.');
    }

    let data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const postUser = async (values) => {
  try {
    // const apiUrl = 'http://localhost:3000/api/auth/signup';
    const apiUrl = 'https://touring.vercel.app/api/auth/signup';

    await sleep(1000);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    };

    let res = await fetch(apiUrl, options);

    if (res.status === 422) {
      throw new Error('Email Already Exists');
    } else if (!res.ok) {
      throw new Error('An error occurred. Please try again.');
    }

    // if (res.status === 422) {
    //   throw new Error('Email Already Exists');
    // } else if (res.status === 404) {
    //   throw new Error(`Error: ${res.status} Not Found`);
    // } else if (res.status >= 500) {
    //   throw new Error(`Error: ${res.status} Server Error`);
    // } else if (res.status >= 400 && res.status < 500) {
    //   throw new Error(`Error: ${res.status} Client Error`);
    // }

    let data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
