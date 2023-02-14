const authCredentials = async (credentials, req, Users, compare) => {
  // check if user exist
  const result = await Users.findOne({ email: credentials.email });

  // if no result of user
  if (!result) {
    throw new Error('No user found with the email');
  }

  // check password with bcrpyt compare(fn) both token and db session
  const checkPassword = await compare(credentials.password, result.password);

  // incorrect password || email
  if (!checkPassword || result.email !== credentials.email) {
    throw new Error('Email and Password do not match');
  }

  // modify payload user property
  let {
    email,
    name = `${result.firstName} ${result.lastName}`,
    role,
    image,
  } = result;

  let newObj = { email, name, role, image };

  return newObj;
};

export default authCredentials;
