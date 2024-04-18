import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/utils/database";
import bcrypt from "bcrypt";
import User from "@/(models)/User";
import Kids from "@/(models)/Kids";
// import { profile } from "console";

// type ProfileType = {
//   email: string | undefined;
//   name: string | undefined;
//   image: string | undefined;
// };

const handler = NextAuth({
  providers: [
    GoogleProvider({
      profile(profile) {
        const points = profile.points || 0;
        const { sub, email, name, image } = profile;
        let userRole = "parent";

        return {
          id: sub,
          email,
          name,
          image,
          points,
          role: userRole,
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
          const foundKid = (await Kids.findOne({
            username: credentials.username,
          })
            .lean()
            .exec()) as {
            password: string;
            _id: string;
            username: string;
            image: string;
          };
          // console.log(foundUser, "found user");

          if (foundKid && typeof foundKid.password) {
            const match = await bcrypt.compare(
              credentials.password,
              foundKid.password
            );

            if (match) {
              return {
                id: foundKid._id,
                name: foundKid.username,
                image: foundKid.image,
              };
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
      // console.log("sessions start", session);
      try {
        await connectToDB();

        let query = {};
        if (session.user?.email) {
          query = { email: session.user.email };
        } else if (session.user?.name) {
          query = { username: session.user.name };
          // console.log(query, "query 2");
        }
        const parentUser = await User.findOne(query);
        const kidUser = await Kids.findOne(query);
        // console.log(kidUser, "kidUser");

        // Update the session user ID based on the user type
        if (parentUser) {
          //@ts-ignore
          session.user.id = parentUser._id.toString();
          session.user.role = "parent";
          //@ts-ignore
          session.user.image = parentUser.image.toString();
        } else if (kidUser) {
          //@ts-ignore
          session.user.id = kidUser._id.toString();
          session.user.role = "child";
          session.user.image = kidUser.image.toString();
        }

        return session;
      } catch (error) {
        console.error("Error retrieving session:", error);
        throw error;
      }
    },

    async signIn({ profile, account }) {
      // console.log(account, "account");

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
