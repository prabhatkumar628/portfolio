import { z } from "zod";

export const employmentTypeEnum = z.enum([
  "full-time",
  "part-time",
  "contract",
  "freelance",
  "internship",
]);

export const experienceCreateSchema = z
  .object({
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
    employmentType: employmentTypeEnum.default("full-time"),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    isCurrent: z.boolean().default(false),
    description: z.string().max(2000, "Description too long").optional(),
    achievements: z.array(z.string().min(2).max(50)).optional(),
  })
  .refine((data) => data.isCurrent === true || data.endDate !== undefined, {
    message: "End date is required if job is not current",
    path: ["endDate"],
  })
  .refine((data) => !data.endDate || data.startDate <= data.endDate, {
    message: "Start date cannot be after end date",
    path: ["startDate"],
  });

export const experienceUpdateSchema = z
  .object({
    company: z
      .string()
      .min(2, "Company name is too short")
      .max(50, "Company name is too long")
      .optional(),
    location: z
      .string()
      .min(2, "Location is too short")
      .max(50, "Location is too long")
      .optional(),
    position: z
      .string()
      .min(2, "Position is too short")
      .max(50, "Position is too long")
      .optional(),
    employmentType: employmentTypeEnum.optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    isCurrent: z.boolean().optional(),
    description: z.string().max(2000).optional(),
    achievements: z.array(z.string().min(2).max(300)).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be updated",
  })
  .refine(
    (data) =>
      !data.startDate || !data.endDate || data.startDate <= data.endDate,
    {
      message: "Start date cannot be after end date",
      path: ["startDate"],
    },
  );
