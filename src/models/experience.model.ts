import mongoose, { Schema, Document } from "mongoose";

export interface IExperience extends Document {
  company: string;
  location: string;
  position: string;
  employmentType:
    | "full-time"
    | "part-time"
    | "contract"
    | "freelance"
    | "internship";
  startDate: Date;
  endDate: Date;
  isCurrent: boolean;
  description: string;
  achievements: string[];
}

const experienceScheam = new Schema<IExperience>(
  {
    company: {
      type: String,
      trim: true,
      required: true,
    },
    location: {
      type: String,
      trim: true,
      required: true,
    },
    position: {
      type: String,
      trim: true,
      required: true,
    },
    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "freelance", "contract", "internship"],
      default: "full-time",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    },
    achievements: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

const ExperienceModel =
  (mongoose.models.Experience as mongoose.Model<IExperience>) ||
  mongoose.model<IExperience>("Experience", experienceScheam);

export default ExperienceModel;
