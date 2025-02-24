import NextAuth, { type DefaultSession } from "next-auth";
import GitHub from 'next-auth/providers/github'

import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

import { getUserById } from "@/utils/getUser";

// Define custom types
type Role = "USER" | "ADMIN";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"]
  }

  interface User {
    role: Role;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [GitHub],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
          const user = await getUserById(token.sub);
          if (user) {
            session.user.role = user.role as Role;
          }
        }
      }
      return session;
    },
  },
});
