import { z } from "zod";

export const aboutSectionUpdateScheam = z.object({
  aboutTitle: z
    .string()
    .min(1, "About title is required")
    .max(100, "Title must be less than 100 characters"),

  aboutDescription: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must be less than 2000 characters"),

  aboutSubTitle: z
    .string()
    .min(10, "SubTitle must be at least 10 characters")
    .max(500, "SubTitle must be less than 500 characters"),

  aboutMe: z
    .array(z.string())
    .min(1, "At least one aboutme is required")
    .max(10, "Maximum 10 aboutme allowed"),

  projects: z.coerce.number().int().min(0),
  client: z.coerce.number().int().min(0),
  year_exp: z.coerce.number().int().min(0),
});

export type AboutSectionUpdateFormInputs = z.infer<
  typeof aboutSectionUpdateScheam
>;

export const defaultAboutSection = {
  aboutTitle: "Full Stack Developer",
  aboutDescription:
    "Passionate about creating elegant, high-performance web applications that solve real-world problems. With 5+ years of experience in both frontend and backend development, I specialize in building scalable solutions using modern technologies.",
  aboutSubTitle:
    "Based in New Delhi, India 🇮🇳 | Available for freelance projects and full-time opportunities.",
  aboutMe: [
    "I'm a dedicated Full Stack Developer with a passion for transforming ideas into reality through code. My journey in web development started 5 years ago, and since then, I've been constantly learning and evolving with the ever-changing tech landscape.",
    "I believe in writing clean, maintainable code and creating user experiences that are not just functional, but delightful. My approach combines technical expertise with creative problem-solving to deliver solutions that exceed expectations.",
    "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through blog posts and mentoring. I'm always excited about new challenges and opportunities to grow.",
  ],
  projects: 10,
  client: 5,
  year_exp: 2,
};
