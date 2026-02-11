// schemas/admin.experience.schema.ts

import { z } from "zod";

export const experienceSchema = z.object({
  company: z
    .string()
    .min(2, "Company name is too short")
    .max(50, "Company name is too long"),
  location: z
    .string()
    .min(2, "Location is too short")
    .max(50, "Location is too long"),
  position: z
    .string()
    .min(2, "Position is too short")
    .max(50, "Position is too long"),

  employmentType: z.enum([
    "full-time",
    "part-time",
    "contract",
    "freelance",
    "internship",
  ]),

  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),

  isCurrent: z.boolean(),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),

  achievements: z
    .array(z.string().min(1, "Achievement cannot be empty"))
    .min(1, "At least one achievement is required")
    .max(100, "Maximum 10 achievements allowed"),
});

export type ExperienceFormInputs = z.infer<typeof experienceSchema>;

export const defaultExperienceValues: ExperienceFormInputs = {
  company: "",
  location: "",
  position: "",
  employmentType: "full-time",
  startDate: new Date(),
  endDate: undefined,
  isCurrent: false,
  description: "",
  achievements: [],
};
