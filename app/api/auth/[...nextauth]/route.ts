import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/utils/database";
import bcrypt from "bcrypt";
import User from "@/(models)/User";
import Kids from "@/(models)/Kids";
// import { profile } from "console";

type ProfileType = {
  email: string | undefined;
  name: string | undefined;
  image: string | undefined;
};

const handler = NextAuth({
  providers: [
    GoogleProvider({
      profile(profile) {
        const points = profile.points || 0;
        const { sub, email, name, image } = profile;

        return {
          id: sub,
          email,
          name,
          image,
          points,
        };
      },
      clientId: process.env.CLIENT_ID || "",
      clientSecret: process.env.CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "As Kids",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Your Username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "YourPassword",
        },
      },
      async authorize(credentials) {
        // console.log(credentials, "credentials");
        try {
          if (!credentials || !credentials.username || !credentials.password) {
            // Return null if required credentials are missing
            return null;
          }
          const foundUser = await Kids.findOne({
            username: credentials.username,
          })
            .lean()
            .exec();
          // console.log(foundUser, "found user");

          if (foundUser) {
            // console.log("User Exist");
            const match = await bcrypt.compare(
              credentials?.password,
              foundUser.password
            );
            if (match) {
              // console.log("Good Pass");
              delete foundUser.password;
              return foundUser;
            }
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async session({ session }) {
      console.log("sessions start", session);
      try {
        await connectToDB(); // Connect to the database

        let query = {};
        if (session.user?.email) {
          query = { email: session.user.email };
        } else if (session.user?.name) {
          query = { username: session.user.name };
          console.log(query, "query 2");
        }
        // console.log(session.user?.name, "query 3");
        // console.log(session.user?.email, "query 1");
        // Check if the session user is a parent or a kid
        // Check if the session user is a parent or a kid
        const parentUser = await User.findOne(query);
        const kidUser = await Kids.findOne(query);

        // Update the session user ID based on the user type
        if (parentUser) {
          session.user.id = parentUser._id.toString();
        } else if (kidUser) {
          session.user.id = kidUser._id.toString();
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
            username: profile?.name?.replace(" ", " ").toLowerCase(),
            image: profile?.picture,
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
});

export { handler as GET, handler as POST };

