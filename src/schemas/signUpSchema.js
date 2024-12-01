import { z } from "zod";

export const usernameValidation=z
     .string()
     .min(1,"username must be atleast 2 character")
     .max(15,"username must be less then 15 characters")
     .regex(/^[a-zA-Z0-9]+$/,"username must not contain special character")

export const signUpSchema=z.object({
    username:usernameValidation,
    email:z.string().email({message:"invalid email address"}),
    password:z.string().min(6,{message:"password must be at least 6 character"})
})

