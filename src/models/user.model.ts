import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  profession?: string;
  skills?: string[];
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    portfolio?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userScheam = new Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      match: [emailRegex, "Invalide email formate"],
      required: true,
    },
    password: {
      type: String,
      required: true,
      select:false,
    },
    phone: {
      type: String,
    },
    avatar: {
      type: String,
    },
    profession: {
      type: String,
    },
    skills: [String],

    socialLinks: {
      linkedin: String,
      github: String,
      twitter: String,
      portfolio: String,
    },
  },
  { timestamps: true },
);

const UserModel =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model("User", userScheam);
export default UserModel;
