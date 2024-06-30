import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NewUser from "@/(models)/NewUser";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { connectToDB } from "./utils/database";

export default {
  providers: [
    GoogleProvider({
      // profile(profile) {
      //   console.log("profile", profile);
      //   //   // const points = profile.points || 0;
      //   //   const { sub, email, name, picture } = profile;
      //   //   // let userRole = "parent";

      //   return {
      //     id: sub,
      //     email,
      //     name,
      //     image,
      //     // points,
      //     // role: userRole,
      //   };
      // },

      clientId: process.env.CLIENT_ID || "",
      clientSecret: process.env.CLIENT_SECRET || "",
      // httpOptions: {
      //   timeout: 40000,
      // },
    }),
    Credentials({
      async authorize(credentials) {
        console.log(credentials, "credentials");

        //we validating the fields again
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await NewUser.findOne({ email: email });
          console.log(user);
          if (!user || !user.password) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
