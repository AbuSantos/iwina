import Google from "next-auth/providers/google";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { connectToDB } from "@/utils/database";
import bcrypt from "bcryptjs";
import User from "@/(models)/User";
import Kids from "@/(models)/Kids";


export default {
  providers: [
    Google({
      profile(profile) {
        console.log("profile", profile);
        const points = profile.points || 0;
        const { sub, email, name, picture } = profile;
        let userRole = "parent";

        return {
          id: sub,
          email,
          name,
          image: picture,
          points,
          role: userRole,
        };
      },

      clientId: process.env.CLIENT_ID || "",
      clientSecret: process.env.CLIENT_SECRET || "",
      // httpOptions: {
      //   timeout: 40000,
      // },
    }),
    Credentials({
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
              credentials?.password,
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
} satisfies NextAuthConfig;
