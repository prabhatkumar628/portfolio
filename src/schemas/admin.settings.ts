import { z } from "zod";

// ─── Sub-schemas ─────────────────────────────────────────

const heroDescriptionItemSchema = z.object({
  text: z.string().optional(),
  highlight: z.enum(["purple", "pink", "indigo", "blue", "green", "red"]).optional(),
});

const heroCTASchema = z.object({
  primary: z.object({
    text: z.string().optional(),
    link: z.string().optional(),
  }).optional(),
  secondary: z.object({
    text: z.string().optional(),
    link: z.string().optional(),
  }).optional(),
});

const socialLinksSchema = z.object({
  github: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  facebook: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
  youtube: z.string().url().optional().or(z.literal("")),
  discord: z.string().url().optional().or(z.literal("")),
});

const featuresSchema = z.object({
  blogEnabled: z.boolean().optional(),
  contactFormEnabled: z.boolean().optional(),
  testimonialsEnabled: z.boolean().optional(),
  darkModeEnabled: z.boolean().optional(),
});

// ─── Main Settings Update Schema ─────────────────────────

export const updateSettingsSchema = z.object({
  // Key (usually not updated, but optional)
  key: z.string().optional(),

  // ─── Site Details ────────────────────────────────────
  siteName: z.string().min(1).max(100).optional(),
  siteLogo: z.string().optional(),
  siteFavicon: z.string().optional(),
  siteTitle: z.string().max(200).optional(),
  siteDescription: z.string().max(500).optional(),
  siteVideoLg: z.string().optional(),
  siteVideoSm: z.string().optional(),
  
  // ─── SEO / Meta ──────────────────────────────────────
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  metaKeywords: z.array(z.string()).optional(),
  ogImage: z.string().optional(),

  // ─── Analytics ───────────────────────────────────────
  googleAnalyticsId: z.string().optional(),
  facebookPixelId: z.string().optional(),

  // ─── Features ────────────────────────────────────────
  features: featuresSchema.optional(),

  // ─── Maintenance ─────────────────────────────────────
  maintenanceMode: z.boolean().optional(),
  maintenanceMessage: z.string().optional(),

  // ─── Personal Details ────────────────────────────────
  fullName: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(15).optional(),
  resume: z.string().optional(),
  isAvailableForHire: z.boolean().optional(),
  location: z.string().max(200).optional(),
  socialLinks: socialLinksSchema.optional(),

  // ─── Hero Section ────────────────────────────────────
  heroTitle: z.string().max(200).optional(),
  heroSubtitle: z.string().max(300).optional(),
  heroDescription: z.array(heroDescriptionItemSchema).optional(),
  heroImage: z.string().optional(),
  heroSkills: z.array(z.string().max(50)).max(10).optional(),
  heroCTA: heroCTASchema.optional(),

  // ─── About Section ───────────────────────────────────
  aboutTitle: z.string().max(200).optional(),
  aboutDescription: z.string().max(500).optional(),
  aboutSubTitle: z.string().max(300).optional(),
  aboutMe: z.array(z.string().max(1000)).max(10).optional(),
  
  // ─── Stats ───────────────────────────────────────────
  projects: z.number().int().min(0).optional(),
  client: z.number().int().min(0).optional(),
  year_exp: z.number().int().min(0).optional(),
});

// ─── Type Inference ──────────────────────────────────────

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
