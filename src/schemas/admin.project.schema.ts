// schemas/admin.project.schema.ts

import { z } from "zod";

// ─── Technology Schema (FIXED) ────────────────────────────
const technologySchema = z.object({
  name: z
    .string()
    .min(1, "Technology name is required")
    .max(50, "Technology name too long"),
  highlight: z.string().optional(),
});

export const projectSchema = z.object({
  //
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title cannot exceed 200 characters"),
  //
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description cannot exceed 2000 characters"),
  //
  thumbnail: z.object({
    url: z.string().optional().or(z.literal("")), // ✅ Allow empty string
    public_id: z.string().optional().or(z.literal("")), // ✅ Allow empty string
  }),
  technologies: z
    .array(technologySchema)
    .min(1, "At least one technology is required")
    .max(15, "Maximum 15 technologies allowed"),
  liveDemoLink: z.string().optional(),
  githubFrontendLink: z.string().optional(),
  githubBackendLink: z.string().optional(),
  githubMobileLink: z.string().optional(),
  category: z.enum([
    "web",
    "mobile",
    "desktop",
    "fullstack",
    "frontend",
    "backend",
    "other",
  ]),
  featured: z.boolean(),
  status: z.enum(["completed", "in-progress", "archived"]),
  isPublished: z.boolean(),
});
export const projectUpdateSchema = z.object({
  //
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title cannot exceed 200 characters"),
  //
  slug:z.string().optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description cannot exceed 2000 characters"),
  //
  thumbnail: z.object({
    url: z.string().optional().or(z.literal("")), // ✅ Allow empty string
    public_id: z.string().optional().or(z.literal("")), // ✅ Allow empty string
  }),
  technologies: z
    .array(technologySchema)
    .min(1, "At least one technology is required")
    .max(15, "Maximum 15 technologies allowed"),
  liveDemoLink: z.string().optional(),
  githubFrontendLink: z.string().optional(),
  githubBackendLink: z.string().optional(),
  githubMobileLink: z.string().optional(),
  category: z.enum([
    "web",
    "mobile",
    "desktop",
    "fullstack",
    "frontend",
    "backend",
    "other",
  ]),
  featured: z.boolean(),
  status: z.enum(["completed", "in-progress", "archived"]),
  isPublished: z.boolean(),
});

export type ProjectFormInputs = z.infer<typeof projectSchema>;

export const defaultProjectValues: ProjectFormInputs = {
  title: "",
  description: "",
  thumbnail: { public_id: "", url: "" },
  technologies: [],
  liveDemoLink: "",
  githubFrontendLink: "",
  githubBackendLink: "",
  githubMobileLink: "",
  category: "web",
  featured: false,
  status: "completed",
  isPublished: true,
};

// ─── Helper: Validate at least one link ──────────────────
export const validateProjectLinks = (data: ProjectFormInputs) => {
  const hasGithubLink =
    data.githubFrontendLink || data.githubBackendLink || data.githubMobileLink;

  if (!hasGithubLink && !data.liveDemoLink) {
    return {
      valid: false,
      message: "At least one link (Live Demo or GitHub) is required",
    };
  }

  return { valid: true };
};

// ─── Helper: Tech highlight colors ───────────────────────
export const techHighlightColors = [
  { value: "text-blue-400", label: "Blue" },
  { value: "text-green-400", label: "Green" },
  { value: "text-purple-400", label: "Purple" },
  { value: "text-pink-400", label: "Pink" },
  { value: "text-yellow-400", label: "Yellow" },
  { value: "text-cyan-400", label: "Cyan" },
  { value: "text-orange-400", label: "Orange" },
  { value: "text-red-400", label: "Red" },
  { value: "text-indigo-400", label: "Indigo" },
];

// ─── Helper: Category options ────────────────────────────
export const categoryOptions = [
  { value: "web", label: "🌐 Web Application", icon: "🌐" },
  { value: "mobile", label: "📱 Mobile App", icon: "📱" },
  { value: "desktop", label: "💻 Desktop App", icon: "💻" },
  { value: "fullstack", label: "🔧 Full-stack", icon: "🔧" },
  { value: "frontend", label: "🎨 Frontend", icon: "🎨" },
  { value: "backend", label: "⚙️ Backend/API", icon: "⚙️" },
  { value: "other", label: "📦 Other", icon: "📦" },
];

// ─── Helper: Status options ──────────────────────────────
export const statusOptions = [
  {
    value: "completed",
    label: "✅ Completed",
    color: "text-green-400",
    bgColor: "bg-green-500/20",
    borderColor: "border-green-500/30",
  },
  {
    value: "in-progress",
    label: "🚧 In Progress",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/20",
    borderColor: "border-yellow-500/30",
  },
  {
    value: "archived",
    label: "📦 Archived",
    color: "text-gray-400",
    bgColor: "bg-gray-500/20",
    borderColor: "border-gray-500/30",
  },
];

// ─── Helper: Common technologies (autocomplete) ───────────
export const commonTechnologies = [
  // Frontend
  { name: "React", highlight: "text-cyan-400" },
  { name: "Next.js", highlight: "text-white" },
  { name: "Vue.js", highlight: "text-green-400" },
  { name: "Angular", highlight: "text-red-400" },
  { name: "Svelte", highlight: "text-orange-400" },
  { name: "TypeScript", highlight: "text-blue-400" },
  { name: "JavaScript", highlight: "text-yellow-400" },
  { name: "Tailwind CSS", highlight: "text-cyan-400" },
  { name: "Bootstrap", highlight: "text-purple-400" },
  { name: "SASS/SCSS", highlight: "text-pink-400" },

  // Backend
  { name: "Node.js", highlight: "text-green-400" },
  { name: "Express", highlight: "text-white" },
  { name: "NestJS", highlight: "text-red-400" },
  { name: "Python", highlight: "text-blue-400" },
  { name: "Django", highlight: "text-green-400" },
  { name: "FastAPI", highlight: "text-cyan-400" },
  { name: "Flask", highlight: "text-white" },
  { name: "Go", highlight: "text-cyan-400" },
  { name: "Rust", highlight: "text-orange-400" },
  { name: "Java", highlight: "text-red-400" },
  { name: "Spring Boot", highlight: "text-green-400" },

  // Database
  { name: "MongoDB", highlight: "text-green-400" },
  { name: "PostgreSQL", highlight: "text-blue-400" },
  { name: "MySQL", highlight: "text-blue-400" },
  { name: "Redis", highlight: "text-red-400" },
  { name: "SQLite", highlight: "text-cyan-400" },
  { name: "Firebase", highlight: "text-yellow-400" },
  { name: "Supabase", highlight: "text-green-400" },

  // Mobile
  { name: "React Native", highlight: "text-cyan-400" },
  { name: "Flutter", highlight: "text-blue-400" },
  { name: "Swift", highlight: "text-orange-400" },
  { name: "Kotlin", highlight: "text-purple-400" },

  // DevOps & Tools
  { name: "Docker", highlight: "text-blue-400" },
  { name: "Kubernetes", highlight: "text-blue-400" },
  { name: "AWS", highlight: "text-orange-400" },
  { name: "Azure", highlight: "text-blue-400" },
  { name: "Vercel", highlight: "text-white" },
  { name: "Netlify", highlight: "text-cyan-400" },
  { name: "GitHub Actions", highlight: "text-white" },
  { name: "Git", highlight: "text-orange-400" },

  // Other
  { name: "GraphQL", highlight: "text-pink-400" },
  { name: "REST API", highlight: "text-green-400" },
  { name: "WebSocket", highlight: "text-yellow-400" },
  { name: "tRPC", highlight: "text-blue-400" },
  { name: "Prisma", highlight: "text-white" },
  { name: "Drizzle", highlight: "text-green-400" },
];

// ─── Helper: Get technology suggestions based on input ────
export const getTechSuggestions = (input: string) => {
  if (!input) return [];

  const searchTerm = input.toLowerCase();
  return commonTechnologies
    .filter((tech) => tech.name.toLowerCase().includes(searchTerm))
    .slice(0, 5); // Max 5 suggestions
};
