import { z } from "zod";

export const siteSettingsSchema = z.object({
  // Basic Site Info
  siteName: z
    .string()
    .min(1, "Site name is required")
    .max(100, "Site name must be less than 100 characters"),
  
  siteLogo: z
    .string()
    .min(1, "Site logo is required")
    .regex(/\.(jpg|jpeg|png|webp|svg)$/i, "Must be a valid image file"),
  
  siteFavicon: z
    .string()
    .min(1, "Site favicon is required")
    .regex(/\.(png|ico|svg)$/i, "Must be a valid favicon file"),
  
  siteTitle: z
    .string()
    .min(1, "Site title is required")
    .max(150, "Site title must be less than 150 characters"),
  
  siteDescription: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  
  // Video Backgrounds
  siteVideoLg: z
    .string()
    .regex(/\.(mp4|webm|ogg)$/i, "Must be a valid video file")
    .optional()
    .or(z.literal("")),
  
  siteVideoSm: z
    .string()
    .regex(/\.(mp4|webm|ogg)$/i, "Must be a valid video file")
    .optional()
    .or(z.literal("")),
  
  // SEO Meta Tags
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
  
  metaKeywords: z
    .array(z.string())
    .optional(),
  
  ogImage: z
    .string()
    .regex(/\.(jpg|jpeg|png|webp)$/i, "Must be a valid image file")
    .optional()
    .or(z.literal("")),
  
  // Analytics
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
  
  // Features Toggle
  features: z.object({
    blogEnabled: z.boolean(), 
    contactFormEnabled: z.boolean(),
    testimonialsEnabled: z.boolean(),
    darkModeEnabled: z.boolean(),
  }),
  
  // Maintenance Mode
  maintenanceMode: z.boolean(),
  
  maintenanceMessage: z
    .string()
    .max(500, "Maintenance message must be less than 500 characters")
    .optional()
    .or(z.literal("")),
});

export type SiteSettingsFormValues = z.infer<typeof siteSettingsSchema>;

// Default values for the form
export const defaultSiteSettings: SiteSettingsFormValues = {
  siteName: "Prabhat",
  siteLogo: "/images/home/avatar/pra.webp",
  siteFavicon: "/icons/android-chrome-192x192.png",
  siteTitle: "Software Engineer",
  siteDescription: "Crafting digital experiences that inspire and innovate. Transforming ideas into elegant, high-performance web solutions.",
  siteVideoLg: "/images/home/bg2.mp4",
  siteVideoSm: "/images/home/bg.mp4",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: [],
  ogImage: "/icons/android-chrome-512x512.png",
  googleAnalyticsId: "",
  facebookPixelId: "",
  features: {
    blogEnabled: true,
    contactFormEnabled: true,
    testimonialsEnabled: true,
    darkModeEnabled: true,
  },
  maintenanceMode: false,
  maintenanceMessage: "",
};









