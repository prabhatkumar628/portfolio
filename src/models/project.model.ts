import mongoose, { Document, Schema } from "mongoose";

// ─── Click Analytics Interface ───────────────────────────
export interface IClickAnalytics {
  ipAddress?: string;
  userAgent?: string;
  browser?: {
    name?: string;
    version?: string;
  };
  os?: {
    name?: string;
    version?: string;
  };
  device?: {
    type?: string;
    vendor?: string;
    model?: string;
  };
  location?: {
    country?: string;
    city?: string;
    region?: string;
    latitude?: string;
    longitude?: string;
    timezone?: string;
  };
  referrer?: string;
  timestamp: Date;
}

// ─── Click Stats Interface ───────────────────────────────
export interface IClickStats {
  liveDemoLink: {
    count: number;
    clicks: IClickAnalytics[];
  };
  githubFrontendLink: {
    count: number;
    clicks: IClickAnalytics[];
  };
  githubBackendLink: {
    count: number;
    clicks: IClickAnalytics[];
  };
  githubMobileLink: {
    count: number;
    clicks: IClickAnalytics[];
  };
  totalClicks: number;
}

// ─── Main Project Interface ──────────────────────────────
export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  thumbnail: {
    url: string;
    public_id: string;
  };
  technologies: Array<{
    name: string;
    highlight: string;
  }>;
  liveDemoLink?: string;
  githubFrontendLink?: string;
  githubBackendLink?: string;
  githubMobileLink?: string;
  category:
    | "web"
    | "mobile"
    | "desktop"
    | "fullstack"
    | "frontend"
    | "backend"
    | "other";
  featured: boolean;
  status: "completed" | "in-progress" | "archived";
  clickStats: IClickStats;
  views: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Click Analytics Schema ──────────────────────────────
const clickAnalyticsSchema = new Schema<IClickAnalytics>(
  {
    ipAddress: { type: String },
    userAgent: { type: String },
    browser: {
      name: { type: String },
      version: { type: String },
    },
    os: {
      name: { type: String },
      version: { type: String },
    },
    device: {
      type: { type: String },
      vendor: { type: String },
      model: { type: String },
    },
    location: {
      country: { type: String },
      city: { type: String },
      region: { type: String },
      latitude: { type: String },
      longitude: { type: String },
      timezone: { type: String },
    },
    referrer: { type: String },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false },
);

// ─── Click Stats Schema ──────────────────────────────────
const clickStatsSchema = new Schema<IClickStats>(
  {
    liveDemoLink: {
      count: { type: Number, default: 0 },
      clicks: [clickAnalyticsSchema],
    },
    githubFrontendLink: {
      count: { type: Number, default: 0 },
      clicks: [clickAnalyticsSchema],
    },
    githubBackendLink: {
      count: { type: Number, default: 0 },
      clicks: [clickAnalyticsSchema],
    },
    githubMobileLink: {
      count: { type: Number, default: 0 },
      clicks: [clickAnalyticsSchema],
    },
    totalClicks: { type: Number, default: 0 },
  },
  { _id: false },
);

// ─── Main Project Schema ─────────────────────────────────
const projectSchema = new Schema<IProject>(
  {
    // Basic Info
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    thumbnail: {
      url: {
        type: String,
        required: [true, "Thumbnail URL is required"],
      },
      public_id: {
        type: String,
        default: "empty",
      },
    },

    // Technologies
    technologies: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        highlight: {
          type: String,
          default: "",
        },
        _id: false,
      },
    ],

    // Links
    liveDemoLink: {
      type: String,
      trim: true,
      default: "",
    },
    githubFrontendLink: {
      type: String,
      trim: true,
      default: "",
    },
    githubBackendLink: {
      type: String,
      trim: true,
      default: "",
    },
    githubMobileLink: {
      type: String,
      trim: true,
      default: "",
    },

    // Project Details
    category: {
      type: String,
      enum: [
        "web",
        "mobile",
        "desktop",
        "fullstack",
        "frontend",
        "backend",
        "other",
      ],
      default: "web",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["completed", "in-progress", "archived"],
      default: "completed",
    },

    // Click Tracking
    clickStats: {
      type: clickStatsSchema,
      default: () => ({
        liveDemoLink: { count: 0, clicks: [] },
        githubFrontendLink: { count: 0, clicks: [] },
        githubBackendLink: { count: 0, clicks: [] },
        githubMobileLink: { count: 0, clicks: [] },
        totalClicks: 0,
      }),
    },

    // Metadata
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// ─── Indexes ─────────────────────────────────────────────
projectSchema.index({ featured: 1, isPublished: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ createdAt: -1 });

// ─── Pre-save Hook (Generate Slug) ──────────────────────
projectSchema.pre("save", function () {
  if (this.isModified("title") && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
});

const ProjectModel =
  (mongoose.models.Project as mongoose.Model<IProject>) ||
  mongoose.model<IProject>("Project", projectSchema);

export default ProjectModel;
