import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  phone?: string;
  tokenVersion: number;
  otp: string;
  createdAt: Date;
  updatedAt: Date;
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userScheam = new Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
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
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "admin",
    },
    phone: String,
    tokenVersion: {
      type: Number,
      default: 0,
      select: false,
    },
    otp: {
      type: String,
    },
  },
  { timestamps: true },
);

const UserModel =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model("User", userScheam);
export default UserModel;
