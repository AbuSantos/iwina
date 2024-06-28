{
  /**
  Since mongodb much like prisma doesnt work on the edge, we create an auth to trigger the middleware .
  
https://authjs.dev/getting-started/migrating-to-v5
  for more info:
  */
}
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import clientPromise from "@/lib/db";

// const mongo = new clientPromise()
export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      //setting the session id to the jwt sub
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      console.log(token);
      return token;
    },
  },
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  ...authConfig,
});
