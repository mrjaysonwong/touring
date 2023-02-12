import { sleep } from 'helpers/utils/common/Sleep';

export const getUser = async () => {
  try {
    const apiUrl = 'http://localhost:3000/api/users';
    // const apiUrl = `https://touring.vercel.app/api/users?userId=${userId}`;

    let res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error('An error occurred. Please try again.');
    }

    let data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
