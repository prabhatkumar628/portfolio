import mongoose, { Schema, Document } from "mongoose";

export interface ISkill extends Document {
  name: string;
  emoji: string;
  image?: { url: string; public_id: string };
  isTop: boolean;
  category: "frontend" | "backend" | "tools";
}

const skillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    emoji: {
      type: String,
      trim: true,
      required: true,
    },
    image: {
      url: String,
      public_id: { type: String, default: "empty" },
    },
    isTop: Boolean,
    category: {
      type: String,
      enum: ["frontend", "backend", "tools"],
      required: true,
    },
  },
  { timestamps: true },
);

skillSchema.index({ name: 1, category: 1 }, { unique: true });

const SkillModel =
  (mongoose.models.Skill as mongoose.Model<ISkill>) ||
  mongoose.model<ISkill>("Skill", skillSchema);

export default SkillModel;
