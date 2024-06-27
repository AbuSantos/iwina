"use server";
import NewUser from "@/(models)/NewUser";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcrypt";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields) {
    return { error: "Invalid Fields" };
  }

  const hashPassword = await bcrypt.hash(validatedFields.data.password, 10);
  // newKid.password = hashPassword;
  const user = new NewUser({
    name: validatedFields.data.username,
    email: validatedFields.data.email,
    password: hashPassword,
  });

  await user.save();
  return { success: "Succesfully Registered" };
};
