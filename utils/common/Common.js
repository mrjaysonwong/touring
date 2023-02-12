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
