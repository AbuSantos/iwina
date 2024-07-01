import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import authConfig from "@/auth.config";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/db";
import { connectToDB } from "./utils/database";
import User from "./(models)/User";
import Kids from "./(models)/Kids";
export const { auth, handlers, signIn, signOut } = NextAuth({
  //   providers: [Credentials, Google],

  callbacks: {
    async session({ session }) {
      console.log("sessions start", session);
      try {
        await connectToDB();
        let query = {};
        if (session.user?.email) {
          query = { email: session.user.email };
        } else if (session.user?.name) {
          query = { username: session.user.name };
        }
        const parentUser = await User.findOne(query);
        const kidUser = await Kids.findOne(query);
        // console.log(kidUser, "kidUser");
        // Update the session user ID based on the user type
        if (parentUser) {
          (session.user as any).id = parentUser._id.toString();
          (session.user as any).role = "parent";
          (session.user as any).image = session.user.image;
          // session.user.image = parentUser.image;
        } else if (kidUser) {
          (session.user as any).id = kidUser._id.toString();
          //@ts-ignore
          session.user.role = "child";
          session.user.image = kidUser.image.toString();
        }
        return session;
      } catch (error) {
        console.error("Error retrieving session:", error);
        throw error;
      }
    },
    async jwt({ token }) {
      console.log(token);
      // if (!token.sub) return token;

      // const existingUser = await getUserById(token.sub);
      // if (!existingUser) return token;

      // token.role = existingUser.role;
      // console.log(existingUser);
      return token;
    },
    async signIn({ profile, account }) {
      try {
        await connectToDB(); // Connect to the database
        const userExist = await User.findOne({
          email: profile?.email,
        });

        if (!userExist) {
          await User.create({
            email: profile?.email,
            // Ensure there's no space in the username and convert to lowercase
            username: profile?.name?.replace(" ", " ").toLowerCase(),
            image: profile?.image,
            points: 0,
            completedTasks: [],
            ongoingTasks: [],
            kids: [],
          });
        }

        return true;
      } catch (error) {
        console.error("Error signing in:", error);
        throw error;
      }
    },
  },
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  ...authConfig,
});
