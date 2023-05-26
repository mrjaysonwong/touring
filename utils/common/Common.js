export const filteredUsers = (users) => {
  const data = users.map((user) => {
    return {
      id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role,
      active: user.active,
      banned: user.banned,
    };
  });

  return data;
};

export const API_ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_AUTH_URL
    : 'http://localhost:3000/';
