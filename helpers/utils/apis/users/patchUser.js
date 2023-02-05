import { sleep } from 'helpers/utils/common/Sleep';

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
