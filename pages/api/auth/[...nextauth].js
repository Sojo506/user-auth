import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prismadb';
import { compare } from 'bcryptjs';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        console.log('🚀 ~ file: [...nextauth].js:23 ~ authorize ~ credentials', credentials);
        // check user existance
        const checkUser = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!checkUser) throw new Error('No user Found with Email Please Sign Up...!');

        // chech password
        const checkPassword = await compare(credentials.password, checkUser.password);

        // incorrect password
        if (!checkPassword || checkUser.email !== credentials.email)
          throw new Error("sername or Password doesn't match");

        return checkUser;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
