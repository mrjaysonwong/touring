import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongo from '@database/connection';
import Users from '@model/userSchema';
import { compare } from 'bcryptjs';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        connectMongo().catch(() => {
          throw new Error('Connection Failed...!');
        });

        // check if user exist
        const result = await Users.findOne({ email: credentials.email });

        // if no result of user
        if (!result) {
          throw new Error('No user found with the email');
        }

        // check password with bcrpyt compare(fn) both token and db session
        const checkPassword = await compare(
          credentials.password,
          result.password
        );

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
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      connectMongo();

      if (account?.provider === 'google' || account?.provider === 'github') {
        const [fName, lName] = user.name.split(' ');

        const providerAuthData = {
          id: user.id,
          firstName: fName,
          lastName: lName,
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

      return true;
    },
    jwt: async ({ token, user, account, profile }) => {
      if (user) {
        token.user = user;
      }

      return token;
    },
    session: async ({ session, token, user }) => {
      connectMongo();
      const result = await Users.findOne({ email: token.user.email });

      // add payload result property
      session.user = token.user;
      session.user.role = result.role;
      session.user.name = `${result.firstName} ${result.lastName}`;
      session.result = result;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
