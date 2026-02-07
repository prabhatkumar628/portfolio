// schemas/admin.settings.personal.details.ts

import { z } from "zod";

export const personalDetailsSchema = z.object({
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
  resume: z
    .string()
    .min(1, "Resume is required")
    .regex(/\.(pdf)$/i, "Must be a PDF file"),

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

export type PersonalDetailsFormValues = z.infer<typeof personalDetailsSchema>;

// Default values for the form
export const defaultPersonalDetails: PersonalDetailsFormValues = {
  fullName: "Prabhat Kumar",
  email: "kprabhat628@gmail.com",
  phone: "8294925485",
  resume: "/resume/prabat_kumar_2026.pdf",
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