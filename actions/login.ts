"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { connectToDB } from "@/utils/database";
import Kids from "@/(models)/Kids";
import bcrypt from "bcryptjs";

export const Login = async (values: z.infer<typeof LoginSchema>) => {
  //validating the data
  await connectToDB();
  // console.log(values);
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields) {
    return { error: "Invalid Fields" };
  }

  const { username, password } = validatedFields.data;
  console.log("Hello");

  try {
    // const foundKid = (await Kids.findOne({
    //   username: username,
    // })
    //   .lean()
    //   .exec()) as {
    //   password: string;
    //   _id: string;
    //   username: string;
    //   image: string;
    // };
    // console.log("Hello 2");
    // console.log("found", foundKid);

    // if (foundKid && typeof foundKid.password) {
    //   const match = await bcrypt.compare(password, foundKid.password);

    //   if (match) {
    //     return {
    //       id: foundKid._id,
    //       name: foundKid.username,
    //       image: foundKid.image,
    //     };
    //   }
    // }
    await signIn("credentials", {
      username,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log(error);
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
  return { success: "Login Successful" };
};
