import mongoose, { Schema } from "mongoose";
import { boolean, number } from "zod";

export interface ISettings {
  //site details
  key: string;
  siteName: string;
  siteLogo: { url: string; public_id: string };
  siteFavicon: { url: string; public_id: string };
  siteTitle: string;
  siteDescription: string;
  siteVideoLg: { url: string; public_id: string };
  siteVideoSm: { url: string; public_id: string };

  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  ogImage: { url: string; public_id: string };

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

  //personal details
  fullName: string;
  email: string;
  phone: string;
  resume: { url: string; public_id: string };
  isAvailableForHire: boolean;
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

  //hero section details
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: {
    text: string;
    highlight?: string;
  }[];
  heroImage: { url: string; public_id: string };
  heroSkills: string[];
  heroCTA: {
    primary: { text: string; link: string };
    secondary: { text: string; link: string };
  };

  // about us details
  aboutTitle: string;
  aboutDescription: string;
  aboutSubTitle: string;
  aboutMe: string[];
  projects: number;
  client: number;
  year_exp: number;
}

const settingsSchema = new Schema<ISettings>(
  {
    key: {
      type: String,
      default: "global",
      unique: true,
    },
    siteName: String,
    siteLogo: { url: String, public_id: String },
    siteFavicon: { url: String, public_id: String },
    siteTitle: String,
    siteDescription: String,
    siteVideoLg: { url: String, public_id: String },
    siteVideoSm: { url: String, public_id: String },
    metaTitle: String,
    metaDescription: String,
    metaKeywords: [String],
    ogImage: { url: String, public_id: String },

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

    fullName: String,
    email: String,
    phone: String,
    resume: { url: String, public_id: String },
    isAvailableForHire: { type: Boolean, default: true },
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
    heroDescription: [{ text: String, highlight: String }],
    heroImage: { url: String, public_id: String },
    heroSkills: [{ type: String, trim: true }],
    heroCTA: {
      primary: { text: String, link: String },
      secondary: { text: String, link: String },
    },

    aboutTitle: String,
    aboutDescription: String,
    aboutSubTitle: String,
    aboutMe: [{ type: String, trim: true }],
    projects: Number,
    client: Number,
    year_exp: Number,
  },
  { timestamps: true },
);

const SettingModel =
  (mongoose.models.Settings as mongoose.Model<ISettings>) ||
  mongoose.model<ISettings>("Settings", settingsSchema);
export default SettingModel;
