const authSignin = async (user, account, Users) => {
  if (account.provider === 'google' || account.provider === 'github') {
    const [fName, lName] = user.name.split(' ');

    const providerAuthData = {
      id: user.id,
      firstName: fName,
      lastName: lName ?? '',
      email: user.email,
      image: user.image,
      authProvider: account.provider,
    };

    const exist = await Users.findOne({
      email: user.email,
    });

    if (exist) {
      await Users.findOneAndUpdate(
        { email: user.email },
        {
          id: user.id,
          email: user.email,
          image: user.image,
          authProvider: account.provider,
        },
        { new: true }
      );
    } else {
      Users.create({
        id: providerAuthData.id,
        firstName: providerAuthData.firstName,
        lastName: providerAuthData.lastName,
        email: providerAuthData.email,
        image: providerAuthData.image,
        authProvider: providerAuthData.authProvider,
      });
    }
  }
};

export default authSignin;
