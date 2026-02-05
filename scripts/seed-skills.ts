import dbConnect from "../src/lib/dbConnect";
import SkillModel from "../src/models/skill.model";

export const skills = [
  // frontend data
  { category: "frontend", emoji: "⚛️", name: "React.js" },
  { category: "frontend", emoji: "▲", name: "Next.js" },
  { category: "frontend", emoji: "📘", name: "TypeScript" },
  { category: "frontend", emoji: "🎨", name: "Tailwind CSS" },
  { category: "frontend", emoji: "⚡", name: "JavaScript" },
  { category: "frontend", emoji: "🌐", name: "HTML/CSS" },
  // backend data
  { category: "backend", emoji: "🟢", name: "Node.js" },
  { category: "backend", emoji: "🚂", name: "Express.js" },
  { category: "backend", emoji: "▲", name: "Next.js" },
  { category: "backend", emoji: "🍃", name: "MongoDB" },
  { category: "backend", emoji: "🐘", name: "PostgreSQL" },
  { category: "backend", emoji: "🔌", name: "REST APIs" },
  // tools data
  { category: "tools", emoji: "📦", name: "Git/GitHub" },
  { category: "tools", emoji: "🐳", name: "Docker" },
  { category: "tools", emoji: "💻", name: "VS Code" },
  { category: "tools", emoji: "🎯", name: "Figma" },
  { category: "tools", emoji: "📮", name: "Postman" },
  { category: "tools", emoji: "🔥", name: "Firebase" },
];

export async function seedSkills() {
  try {
    await dbConnect();
    await SkillModel.deleteMany();
    await SkillModel.insertMany(skills);
    console.log("✅ Skills seeded successfully");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
}
