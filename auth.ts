{
  /**
  Since mongodb much like prisma doesnt work on the edge, we create an auth to trigger the middleware .
  
https://authjs.dev/getting-started/migrating-to-v5
  for more info:
  */
}
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "@/auth.config";
import clientPromise from "@/lib/db";
import { getUserById } from "./data/user";



// const mongo = new clientPromise()
export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      //setting the session id to the jwt sub
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token }) {
      console.log(token);
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.role = existingUser.role;
      console.log(existingUser);
      return token;
    },
  },
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  ...authConfig,
});
