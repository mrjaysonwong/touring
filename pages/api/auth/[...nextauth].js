import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongo from '@database/connection';
import Users from '@model/userSchema';
import { compare } from 'bcryptjs';
import authSignin from '@utils/auth/authSignin';
import authCredentials from '@utils/auth/authCredentials';

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

        // helper f(n)
        const userCredentials = authCredentials(
          credentials,
          req,
          Users,
          compare
        );

        return userCredentials;
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      connectMongo().catch(() => {
        throw new Error('Connection Failed...!');
      });

      // helper f(n)
      authSignin(user, account, Users);

      return true;
    },
    jwt: async ({ token, user, account, profile }) => {
      if (user) {
        token.user = user;
      }

      return token;
    },
    session: async ({ session, token, user }) => {
      connectMongo().catch(() => {
        throw new Error('Connection Failed...!');
      });

      const result = await Users.findOne({ email: token.user.email });

      // add result property from db to session object
      session.user = token.user;
      session.user.role = result.role;
      session.user.name = `${result.firstName} ${result.lastName}`;
      session.user._id = result._id;

      return session;
    },
  },
  pages: {
    signIn: '/login',
  },

  secret: process.env.NEXTAUTH_SECRET,
});
