import { z } from "zod";

export const skillCreateSchema = z.object({
  name: z
    .string()
    .min(2, "Skill must be at least 2 characters")
    .max(20, "Skill must be no more than 20 characters"),

  emoji: z
    .string()
    .refine((val) => [...val].length === 1, "Only one emoji allowed"),

  category: z.enum(["frontend", "backend", "tools"]),
});

export const skillUpdateSchema = z.object({
  name: z
    .string()
    .min(2, "Skill must be at least 2 characters")
    .max(20, "Skill must be no more than 20 characters")
    .optional(),

  emoji: z
    .string()
    .refine((val) => [...val].length === 1, "Only one emoji allowed")
    .optional(),

  category: z.enum(["frontend", "backend", "tools"]).optional(),
});
