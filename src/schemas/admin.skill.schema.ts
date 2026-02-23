// schemas/admin.skill.schema.ts

import { z } from "zod";

const mediaFileSchema = z.object({
  url: z.string().optional().or(z.literal("")), // ✅ Allow empty string
  public_id: z.string().optional().or(z.literal("")), // ✅ Allow empty string
});

export const skillCreateSchema = z.object({
  name: z
    .string()
    .min(2, "Skill must be at least 2 characters")
    .max(20, "Skill must be no more than 20 characters"),
  emoji: z.string().refine((val) => {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    return [...segmenter.segment(val)].length === 1;
  }, "Only one emoji allowed"),
  image: mediaFileSchema.optional(), // ✅ Whole object optional
  isTop: z.boolean(),
  category: z.enum(["frontend", "backend", "tools"]),
});

export type SkillFormInputs = z.infer<typeof skillCreateSchema>;

// ✅ Fix default values
export const defaultSkillValues: SkillFormInputs = {
  name: "",
  emoji: "🎯",
  image: undefined, // ✅ Use undefined instead of empty object
  isTop: false,
  category: "frontend",
};
