import { z } from "zod";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const profileSchema = z.object({
  name: z.string(),
  email: z.string().regex(emailRegex, "Invalide email formate"),
  phone: z.string().length(10).optional(),
});
export type ProfileFormInputs = z.infer<typeof profileSchema>;

export const updatePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, "Old password is required"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password too long"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UpdatePasswordInputs = z.infer<typeof updatePasswordSchema>;
