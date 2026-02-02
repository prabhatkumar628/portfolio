import mongoose, { Document, Schema, Types } from "mongoose";

export interface MessageType extends Document {
  name: string;
  email: string;
  phone: {
    countryCode: string;
    number: string;
  };
  subject: string;
  message: string;
  status: string;
  priority: string;
  adminNotes: string;
  reply: string;
  repliedAt: Date;
  ipAddress: string;
  userAgent: string;
  browser: string;
  os: string;
  device: string;
  country: string;
  city: string;
  repliedBy: Types.ObjectId;
  source: string;
  isSpam: boolean;
  spamScore: number;
  readAt: Date;
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const MessageSchema = new Schema<MessageType>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [emailRegex, "Please provide a valid email address"],
      maxlength: [50, "Email cannot be more than 50 characters"],
    },
    phone: {
      countryCode: {
        type: String,
        trim: true,
        match: [/^\+\d{1,4}$/, "Invalid country code"],
        required: function () {
          return !!this.phone?.number;
        },
      },
      number: {
        type: String,
        trim: true,
        match: [/^\d{6,14}$/, "Invalid phone number"],
      },
    },
    subject: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [2000, "Message cannot be more than 2000 characters"],
    },
    status: {
      type: String,
      enum: ["new", "read", "replied", "archived", "spam"],
      default: "new",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    adminNotes: {
      type: String,
      maxlength: 1000,
    },
    reply: {
      type: String,
      maxlength: 2000,
    },
    repliedAt: {
      type: Date,
    },
    repliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ipAddress: String,
    userAgent: String,
    browser: String,
    os: String,
    device: String,
    country: String,
    city: String,
    source: {
      type: String,
      enum: ["contact-form", "email", "chat", "other"],
      default: "contact-form",
    },
    isSpam: {
      type: Boolean,
      default: false,
    },
    spamScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    readAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

MessageSchema.pre("save", function () {
  if (this.isModified("status") && this.status === "read" && !this.readAt) {
    this.readAt = new Date();
  }

  if (this.isModified("reply") && this.reply && !this.repliedAt) {
    this.repliedAt = new Date();
    this.status = "replied";
  }
});

MessageSchema.index({ status: 1, createdAt: -1 });
MessageSchema.index({ email: 1 });
MessageSchema.index({ priority: 1, status: 1 });
MessageSchema.index({ isSpam: 1 });

export default mongoose.models.Message ||
  mongoose.model("Message", MessageSchema);
