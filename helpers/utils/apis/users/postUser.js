import { sleep } from 'helpers/utils/common/Sleep';

export const postUser = async (values) => {
  try {
    const apiUrl = 'api/auth/signup';

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
