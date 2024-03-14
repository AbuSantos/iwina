import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@/models/User";

type ProfileType = {
  email: string | undefined;
  name: string | undefined;
  image: string | undefined;
};

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID || "",
      clientSecret: process.env.CLIENT_SECRET || "",
    }),
  ],

  callbacks: {
    async session({ session }) {
      try {
        await connectToDB(); // Connect to the database

        const sessionUser = await User.findOne({
          email: session.user?.email,
        });

        if (sessionUser) {
          session?.user?.id = sessionUser._id.toString();
        }

        return session;
      } catch (error) {
        console.error("Error retrieving session:", error);
        throw error;
      }
    },

    async signIn({ profile }: { profile: ProfileType }) {
      try {
        await connectToDB(); // Connect to the database

        const userExist = await User.findOne({
          email: profile?.email,
        });

        if (!userExist) {
          await User.create({
            email: profile?.email,
            // Ensure there's no space in the username and convert to lowercase
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: profile?.image,
          });
        }
      } catch (error) {
        console.error("Error signing in:", error);
        throw error;
      }
    },
  },
});

export { handler as GET, handler as POST };
