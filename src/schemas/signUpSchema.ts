import { z } from "zod";

export const usernameValidation = z
  .string()
  .max(20, { message: "Username should be at most 20 characters" })
  .min(2, {message: "Username should be atleast 2 characters"})
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6,{message: "password should be atleast 6 characters"})
})