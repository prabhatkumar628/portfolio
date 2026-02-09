// schemas/admin.settings.hero.section.ts

import { z } from "zod";

// Schema for description with highlights
const heroDescriptionItemSchema = z.object({
  text: z.string().min(1, "Text is required"),
  highlight: z
    .string()
    .optional()
    .or(z.literal("")),
});

// Schema for Cloudinary image/video
const cloudinaryAssetSchema = z.object({
  url: z.string().min(1, "URL is required"),
  public_id: z.string().min(1, "Public ID is required"),
});

// Schema for CTA buttons
const ctaSchema = z.object({
  text: z.string().min(1, "Button text is required"),
  link: z.string().min(1, "Link is required"),
});

export const heroSectionUpdateSchema = z.object({
  // Hero Texts
  heroTitle: z
    .string()
    .min(1, "Hero title is required")
    .max(100, "Title must be less than 100 characters"),

  heroSubtitle: z
    .string()
    .min(1, "Hero subtitle is required")
    .max(200, "Subtitle must be less than 200 characters"),

  // Description with highlights
  heroDescription: z
    .array(heroDescriptionItemSchema)
    .min(1, "Description is required"),

  // Cloudinary Image
  heroImage: cloudinaryAssetSchema,

  // Skills array
  heroSkills: z
    .array(z.string())
    .min(1, "At least one skill is required")
    .max(10, "Maximum 10 skills allowed"),

  // CTA Buttons
  heroCTA: z.object({
    primary: ctaSchema,
    secondary: ctaSchema,
  }),
});

export type HeroSectionUpdateFormInputs = z.infer<typeof heroSectionUpdateSchema>;

// Default values for the form
export const defaultHeroSection = {
  heroTitle: "Software Engineer",
  heroSubtitle: "Building modern web experiences that inspire and innovate",
  heroDescription: [
    { text: "MERN & Next.js developer crafting " },
    { text: "fast", highlight: "purple" },
    { text: ", " },
    { text: "scalable", highlight: "pink" },
    { text: ", and " },
    { text: "modern", highlight: "indigo" },
    { text: " web experiences with React and Node.js." },
  ],
  heroImage: {
    url: "/images/home/avatar/pra.webp",
    public_id: "empty",
  },
  heroSkills: ["React", "Next.js", "TypeScript", "Tailwind", "Node.js"],
  heroCTA: {
    primary: { text: "My Work", link: "/projects" },
    secondary: { text: "Let's Talk", link: "/contact-us" },
  },
};

// Type exports for Cloudinary
export type CloudinaryAsset = z.infer<typeof cloudinaryAssetSchema>;
export type HeroDescriptionItem = z.infer<typeof heroDescriptionItemSchema>;