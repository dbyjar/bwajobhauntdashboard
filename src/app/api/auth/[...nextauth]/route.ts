import { compareData } from "@/lib/utils";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../../lib/prisma";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET!,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const user = await prisma.company.findFirst({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) return null;

        const isMatch = await compareData(
          user.password,
          credentials?.password!
        );

        if (isMatch) return user;

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    newUser: "/signup",
  },
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.id;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
