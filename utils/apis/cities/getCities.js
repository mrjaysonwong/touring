export const getCities = async (value) => {
  try {
    const apiUrl = `https://api.api-ninjas.com/v1/city?name=${value}&limit=5`;

    const options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'X-Api-Key': process.env.NINJA_KEY,
      },
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
