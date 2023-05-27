import { API_ENDPOINT } from '@utils/common/Common';
import { sleep } from '@utils/common/Sleep';

export async function getUsers() {
  try {
    let res = await fetch(`${API_ENDPOINT}/api/users`);

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
    let res = await fetch(`${API_ENDPOINT}/api/users?userId${userId}`);

    if (!res.ok) {
      throw new Error('An error occurred. Please try again.');
    }

    let data = await res.json();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUser = async (userId, values) => {
  try {
    await sleep(1000);

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    };

    let res = await fetch(`${API_ENDPOINT}/api/users?userId=${userId}`, options);

    if (!res.ok) {
      throw new Error('An error occurred. Please try again.');
    }

    let data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createUser = async (values) => {
  try {
    await sleep(1000);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    };

    let res = await fetch(`${API_ENDPOINT}/api/auth/signup`, options);

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
