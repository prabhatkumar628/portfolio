// schemas/admin.settings.personal.details.ts

import { z } from "zod";

const mediaFileSchema = z.object({
  url: z.string().min(1, "URL is required"),
  public_id: z.string().optional(),
});

export const personalDetailsUpdateSchema = z.object({
  // Basic Info
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name must be less than 100 characters"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9]{10}$/, "Phone must be 10 digits"),

  location: z
    .string()
    .min(1, "Location is required")
    .max(200, "Location must be less than 200 characters"),

  // Resume
  resume: mediaFileSchema,

  // Availability
  isAvailableForHire: z.boolean(),

  // Social Links
  socialLinks: z.object({
    github: z
      .string()
      .regex(/^(https?:\/\/)?(www\.)?github\.com\/.+$|^$/, "Invalid GitHub URL")
      .optional()
      .or(z.literal("")),

    linkedin: z
      .string()
      .regex(/^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/.+$|^$/, "Invalid LinkedIn URL")
      .optional()
      .or(z.literal("")),

    facebook: z
      .string()
      .regex(/^(https?:\/\/)?(www\.)?facebook\.com\/.+$|^$/, "Invalid Facebook URL")
      .optional()
      .or(z.literal("")),

    twitter: z
      .string()
      .regex(/^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/.+$|^$/, "Invalid Twitter/X URL")
      .optional()
      .or(z.literal("")),

    instagram: z
      .string()
      .regex(/^(https?:\/\/)?(www\.)?instagram\.com\/.+$|^$/, "Invalid Instagram URL")
      .optional()
      .or(z.literal("")),

    youtube: z
      .string()
      .regex(/^(https?:\/\/)?(www\.)?youtube\.com\/.+$|^$/, "Invalid YouTube URL")
      .optional()
      .or(z.literal("")),

    discord: z
      .string()
      .regex(/^(https?:\/\/)?(www\.)?(discord\.gg|discord\.com)\/.+$|^$/, "Invalid Discord URL")
      .optional()
      .or(z.literal("")),
  }),
});

export type PersonalDetailsUpdateFormInputs = z.infer<typeof personalDetailsUpdateSchema>;

// Default values for the form
export const defaultPersonalDetails = {
  fullName: "Prabhat Kumar",
  email: "kprabhat628@gmail.com",
  phone: "8294925485",
  resume: { url: "/resume/prabat_kumar_2026.pdf", public_id: "empty" },
  isAvailableForHire: true,
  location: "Noida Sec-71",
  socialLinks: {
    github: "https://github.com/prabhatkumar628",
    linkedin: "https://linkedin.com/in/prabhatkumar628",
    facebook: "",
    twitter: "https://x.com/prabhatkumar628",
    instagram: "https://www.instagram.com/prabhatkumar628",
    youtube: "https://www.youtube.com/@prabhatui",
    discord: "",
  },
};