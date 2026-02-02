import { z } from "zod";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const loginSchema = z.object({
  email: z.string().trim().regex(emailRegex, "Invalide Email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password is too long"),
});
