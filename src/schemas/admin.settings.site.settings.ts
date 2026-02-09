import { z } from "zod";

const mediaFileSchema = z.object({
  url: z.string().min(1, "URL is required"),
  public_id: z.string().optional(),
});

export const siteSettingsUpdateSchema = z.object({
  // Basic Site Info
  siteName: z
    .string()
    .min(1, "Site name is required")
    .max(100, "Site name must be less than 100 characters"),
  siteLogo: mediaFileSchema,
  siteFavicon: mediaFileSchema,
  siteTitle: z
    .string()
    .min(1, "Site title is required")
    .max(150, "Site title must be less than 150 characters"),
  siteDescription: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  siteVideoLg: mediaFileSchema,
  siteVideoSm: mediaFileSchema,
  metaTitle: z
    .string()
    .max(60, "Meta title should be less than 60 characters")
    .optional()
    .or(z.literal("")),
  metaDescription: z
    .string()
    .max(160, "Meta description should be less than 160 characters")
    .optional()
    .or(z.literal("")),
  metaKeywords: z.array(z.string()).optional(),
  ogImage:mediaFileSchema,
  googleAnalyticsId: z
    .string()
    .regex(/^(G-[A-Z0-9]+|UA-[0-9]+-[0-9]+)?$/, "Invalid Google Analytics ID")
    .optional()
    .or(z.literal("")),
  facebookPixelId: z
    .string()
    .regex(/^[0-9]*$/, "Invalid Facebook Pixel ID")
    .optional()
    .or(z.literal("")),
  features: z.object({
    blogEnabled: z.boolean(),
    contactFormEnabled: z.boolean(),
    testimonialsEnabled: z.boolean(),
    darkModeEnabled: z.boolean(),
  }),
  maintenanceMode: z.boolean(),
  maintenanceMessage: z
    .string()
    .max(500, "Maintenance message must be less than 500 characters")
    .optional()
    .or(z.literal("")),
});

export type SiteSettingsUpdateFormInput = z.infer<
  typeof siteSettingsUpdateSchema
>;

// Default values for the form
export const defaultSiteSettings = {
  siteName: "Prabhat",
  siteLogo: { url: "/images/home/avatar/pra.webp", public_id: "empty" },
  siteFavicon: { url: "/icons/android-chrome-192x192.png", public_id: "empty" },
  siteTitle: "Software Engineer",
  siteDescription:
    "Crafting digital experiences that inspire and innovate. Transforming ideas into elegant, high-performance web solutions.",
  siteVideoLg: { url: "/images/home/bg2.mp4", public_id: "empty" },
  siteVideoSm: { url: "/images/home/bg.mp4", public_id: "empty" },
  metaTitle: "",
  metaDescription: "",
  metaKeywords: [],
  ogImage: { url: "/icons/android-chrome-512x512.png", public_id: "empty" },

  googleAnalyticsId: "",
  facebookPixelId: "",

  features: {
    blogEnabled: true,
    contactFormEnabled: true,
    testimonialsEnabled: true,
    darkModeEnabled: true,
  },

  maintenanceMode: false,
  maintenanceMessage:
    "Crafting digital experiences that inspire and innovate. Transforming ideas into elegant, high-performance web solutions.",
};
