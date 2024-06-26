import * as z from "zod";
{
  /**
Define a schema for login validation using Zod
 The LoginSchema ensures that the input object contains:
- An 'email' field which must be a valid email string
- A 'password' field which must be a non-empty string

@Usage:
   This schema can be used to validate user input for a login form

*/
}
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(1, {
    message: "Password is Required!",
  }),
});

export const RegisterSchema = z.object({
  user_name: z.string().min(1, {
    message: "Name is required!",
  }),
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(6, {
    message: "Password must be more 6 characters!",
  }),
});
