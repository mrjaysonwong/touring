export async function fetchUsersData() {
  try {
    const url = '';

    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}


