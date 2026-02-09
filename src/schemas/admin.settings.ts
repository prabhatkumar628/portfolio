import { z } from "zod";

// ═══════════════════════════════════════════════════════════
// SHARED SUB-SCHEMAS
// ═══════════════════════════════════════════════════════════

const mediaFileSchema = z.object({
  url: z.string().min(1, "URL is required"),
  public_id: z.string().default("empty"),
});

const socialLinksSchema = z.object({
  github: z.string().url("Invalid GitHub URL").or(z.literal("")).optional(),
  linkedin: z.string().url("Invalid LinkedIn URL").or(z.literal("")).optional(),
  facebook: z.string().url("Invalid Facebook URL").or(z.literal("")).optional(),
  twitter: z.string().url("Invalid Twitter URL").or(z.literal("")).optional(),
  instagram: z
    .string()
    .url("Invalid Instagram URL")
    .or(z.literal(""))
    .optional(),
  youtube: z.string().url("Invalid YouTube URL").or(z.literal("")).optional(),
  discord: z.string().url("Invalid Discord URL").or(z.literal("")).optional(),
});

const featuresSchema = z.object({
  blogEnabled: z.boolean({ message: "Blog enabled must be a boolean" }),
  contactFormEnabled: z.boolean({
    message: "Contact form enabled must be a boolean",
  }),
  testimonialsEnabled: z.boolean({
    message: "Testimonials enabled must be a boolean",
  }),
  darkModeEnabled: z.boolean({
    message: "Dark mode enabled must be a boolean",
  }),
});

const heroDescriptionItemSchema = z.object({
  text: z.string().min(1, "Text is required"),
  highlight: z
    .enum(["purple", "pink", "indigo", "blue", "green", "red"])
    .optional()
    .refine(
      (val) =>
        !val ||
        ["purple", "pink", "indigo", "blue", "green", "red"].includes(val),
      {
        message: "Invalid highlight color",
      },
    ),
});

const heroCTASchema = z.object({
  primary: z.object({
    text: z
      .string()
      .min(1, "Primary CTA text is required")
      .max(50, "Text too long"),
    link: z.string().min(1, "Primary CTA link is required"),
  }),
  secondary: z.object({
    text: z
      .string()
      .min(1, "Secondary CTA text is required")
      .max(50, "Text too long"),
    link: z.string().min(1, "Secondary CTA link is required"),
  }),
});

// ═══════════════════════════════════════════════════════════
// 1. SITE SETTINGS SCHEMA
// ═══════════════════════════════════════════════════════════

export const siteSettingsSchema = z.object({
  siteName: z
    .string()
    .min(2, "Site name must be at least 2 characters")
    .max(100, "Site name must be less than 100 characters")
    .trim(),

  siteLogo: mediaFileSchema,

  siteFavicon: mediaFileSchema,

  siteTitle: z
    .string()
    .min(5, "Site title must be at least 5 characters")
    .max(200, "Site title must be less than 200 characters")
    .trim(),

  siteDescription: z
    .string()
    .min(20, "Site description must be at least 20 characters")
    .max(500, "Site description must be less than 500 characters")
    .trim(),

  siteVideoLg: mediaFileSchema,

  siteVideoSm: mediaFileSchema,

  metaTitle: z
    .string()
    .max(60, "Meta title should be less than 60 characters for SEO")
    .trim()
    .optional(),

  metaDescription: z
    .string()
    .max(160, "Meta description should be less than 160 characters for SEO")
    .trim()
    .optional(),

  metaKeywords: z
    .array(z.string().trim().min(1, "Keyword cannot be empty"))
    .max(20, "Maximum 20 keywords allowed")
    .default([]),

  ogImage: mediaFileSchema,

  googleAnalyticsId: z
    .string()
    .regex(/^(G-[A-Z0-9]+)?$/, "Invalid Google Analytics ID format")
    .optional()
    .or(z.literal("")),

  facebookPixelId: z
    .string()
    .regex(/^[0-9]*$/, "Invalid Facebook Pixel ID format")
    .optional()
    .or(z.literal("")),

  features: featuresSchema,

  maintenanceMode: z.boolean(),

  maintenanceMessage: z
    .string()
    .max(300, "Maintenance message too long")
    .trim()
    .optional()
    .or(z.literal("")),
});

// ═══════════════════════════════════════════════════════════
// 2. PERSONAL DETAILS SCHEMA
// ═══════════════════════════════════════════════════════════

export const personalDetailsSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
    .trim(),

  email: z.string().email("Invalid email address").toLowerCase().trim(),

  phone: z
    .string()
    .regex(/^[0-9]{10,15}$/, "Phone number must be 10-15 digits")
    .trim(),

  resume: mediaFileSchema,

  isAvailableForHire: z.boolean(),

  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(200, "Location must be less than 200 characters")
    .trim(),

  socialLinks: socialLinksSchema,
});

// ═══════════════════════════════════════════════════════════
// 3. HERO SECTION SCHEMA
// ═══════════════════════════════════════════════════════════

export const heroSectionSchema = z.object({
  heroTitle: z
    .string()
    .min(3, "Hero title must be at least 3 characters")
    .max(200, "Hero title must be less than 200 characters")
    .trim(),

  heroSubtitle: z
    .string()
    .min(10, "Hero subtitle must be at least 10 characters")
    .max(300, "Hero subtitle must be less than 300 characters")
    .trim(),

  heroDescription: z
    .array(heroDescriptionItemSchema)
    .min(1, "At least one description item is required")
    .max(20, "Maximum 20 description items allowed"),

  heroImage: mediaFileSchema,

  heroSkills: z
    .array(
      z
        .string()
        .min(1, "Skill name cannot be empty")
        .max(50, "Skill name too long")
        .trim(),
    )
    .min(3, "At least 3 skills required")
    .max(10, "Maximum 10 skills allowed"),

  heroCTA: heroCTASchema,
});

// ═══════════════════════════════════════════════════════════
// 4. ABOUT SECTION SCHEMA
// ═══════════════════════════════════════════════════════════

export const aboutSectionSchema = z.object({
  aboutTitle: z
    .string()
    .min(3, "About title must be at least 3 characters")
    .max(200, "About title must be less than 200 characters")
    .trim(),

  aboutDescription: z
    .string()
    .min(50, "About description must be at least 50 characters")
    .max(500, "About description must be less than 500 characters")
    .trim(),

  aboutSubTitle: z
    .string()
    .min(10, "About subtitle must be at least 10 characters")
    .max(300, "About subtitle must be less than 300 characters")
    .trim(),

  aboutMe: z
    .array(
      z
        .string()
        .min(20, "Each paragraph must be at least 20 characters")
        .max(1000, "Each paragraph must be less than 1000 characters")
        .trim(),
    )
    .min(1, "At least 1 paragraph required")
    .max(10, "Maximum 10 paragraphs allowed"),

  projects: z
    .number()
    .int("Project count must be an integer")
    .min(0, "Project count cannot be negative")
    .max(9999, "Project count too large"),

  client: z
    .number()
    .int("Client count must be an integer")
    .min(0, "Client count cannot be negative")
    .max(9999, "Client count too large"),

  year_exp: z
    .number()
    .int("Years of experience must be an integer")
    .min(0, "Years of experience cannot be negative")
    .max(100, "Years of experience seems unrealistic"),
});

// ═══════════════════════════════════════════════════════════
// COMBINED COMPLETE SETTINGS SCHEMA (All fields required)
// ═══════════════════════════════════════════════════════════

export const completeSettingsSchema = z.object({
  key: z.string().default("global"),
  ...siteSettingsSchema.shape,
  ...personalDetailsSchema.shape,
  ...heroSectionSchema.shape,
  ...aboutSectionSchema.shape,
});

// ═══════════════════════════════════════════════════════════
// UPDATE SCHEMAS (All fields optional for partial updates)
// ═══════════════════════════════════════════════════════════

export const updateSiteSettingsSchema = siteSettingsSchema.partial();
export const updatePersonalDetailsSchema = personalDetailsSchema.partial();
export const updateHeroSectionSchema = heroSectionSchema.partial();
export const updateAboutSectionSchema = aboutSectionSchema.partial();
export const updateCompleteSettingsSchema = completeSettingsSchema.partial();

// ═══════════════════════════════════════════════════════════
// TYPE INFERENCE
// ═══════════════════════════════════════════════════════════

export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;
export type PersonalDetailsInput = z.infer<typeof personalDetailsSchema>;
export type HeroSectionInput = z.infer<typeof heroSectionSchema>;
export type AboutSectionInput = z.infer<typeof aboutSectionSchema>;
export type CompleteSettingsInput = z.infer<typeof completeSettingsSchema>;

export type UpdateSiteSettingsInput = z.infer<typeof updateSiteSettingsSchema>;
export type UpdatePersonalDetailsInput = z.infer<typeof updatePersonalDetailsSchema>;
export type UpdateHeroSectionInput = z.infer<typeof updateHeroSectionSchema>;
export type UpdateAboutSectionInput = z.infer<typeof updateAboutSectionSchema>;
export type UpdateCompleteSettingsInput = z.infer<typeof updateCompleteSettingsSchema>;