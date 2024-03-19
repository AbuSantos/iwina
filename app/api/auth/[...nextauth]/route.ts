import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/utils/database";
import bcrypt from "bcrypt";
import User from "@/(models)/User";
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
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Your Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "YourPassword",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials || !credentials.email || !credentials.password) {
            // Return null if required credentials are missing
            return null;
          }
          const foundUser = await User.findOne({ email: credentials?.email })
            .lean()
            .exec();
          if (foundUser) {
            console.log("User Exist");
            const match = await bcrypt.compare(
              credentials?.password,
              foundUser.password
            );
            if (match) {
              console.log("Good Pass");
              // delete foundUser.password;

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
      try {
        await connectToDB(); // Connect to the database

        const sessionUser = await User.findOne({
          email: session.user?.email,
        });

        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
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
