import { fetchUsersData } from './config';

export async function usersDataPage() {
  const users_data = await fetchUsersData();

  return users_data;
}
