"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";

export const Login = async (values: z.infer<typeof LoginSchema>) => {
  //validating the data
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields) {
    return { error: "Invalid Fields" };
  }

  return { success: "Login Successful" };
};
