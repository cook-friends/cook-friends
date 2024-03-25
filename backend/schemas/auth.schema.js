import { z } from "zod";
import { checkIfEmailExists } from "../libs/checkIfEmailExists.js";

export const registerSchema = z.object({
    username: z
        .string({ required_error: "Username is required" })
        .min(1, { message: "Username must not be empty" }),
    email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Email is not valid" })
        .refine(async (value) => !(await checkIfEmailExists(value)), {
            message: "Email is already in use",
        }),
    password: z.string({ required_error: "Password is required" }).min(8, {
        message: "Password must be at least 8 characters long",
    }),
});

export const loginSchema = z.object({
    email: z.string({ required_error: "Email is required" }).email({
        message: "Email is not valid",
    }),
    password: z.string({ required_error: "Password is required" }),
});
