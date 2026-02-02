import mongoose, { Schema } from "mongoose";

export interface SettingsType {
  key: string;
  siteName: string;
  siteLogo: string;
  siteFavicon: string;
  siteTitle: string;
  siteDescription: string;
  email: string;
  phone: string;
  resume: string;
  location: string;
  socialLinks: {
    github: string;
    linkedin: string;
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
    discord: string;
  };

  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroImage: string;
  heroCTA: {
    primary: { text: string; link: string };
    secondary: { text: string; link: string };
  };

  metaTitle: string;
  metaDescription: string;
  metaKeywords: [string];
  ogImage: string;

  googleAnalyticsId: string;
  facebookPixelId: string;

  features: {
    blogEnabled: boolean;
    contactFormEnabled: boolean;
    testimonialsEnabled: boolean;
    darkModeEnabled: boolean;
  };

  maintenanceMode: boolean;
  maintenanceMessage: string;
}

const settingsSchema = new Schema<SettingsType>(
  {
    key: {
      type: String,
      default: "global",
      unique: true,
    },
    siteName: String,
    siteLogo: String,
    siteFavicon: String,
    siteTitle: String,
    siteDescription: String,
    email: String,
    phone: String,
    resume: String,
    location: String,
    socialLinks: {
      github: String,
      linkedin: String,
      facebook: String,
      twitter: String,
      instagram: String,
      youtube: String,
      discord: String,
    },

    heroTitle: String,
    heroSubtitle: String,
    heroDescription: String,
    heroImage: String,
    heroCTA: {
      primary: { text: String, link: String },
      secondary: { text: String, link: String },
    },

    metaTitle: String,
    metaDescription: String,
    metaKeywords: [String],
    ogImage: String,

    googleAnalyticsId: String,
    facebookPixelId: String,

    features: {
      blogEnabled: Boolean,
      contactFormEnabled: Boolean,
      testimonialsEnabled: Boolean,
      darkModeEnabled: Boolean,
    },

    maintenanceMode: Boolean,
    maintenanceMessage: String,
  },
  { timestamps: true },
);

const SettingModel =
  (mongoose.models.Settings as mongoose.Model<SettingsType>) ||
  mongoose.model<SettingsType>("Settings", settingsSchema);
export default SettingModel;
