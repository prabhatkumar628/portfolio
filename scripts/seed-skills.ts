import skillsStatic from "../src/data/skills.static";
import dbConnect from "../src/lib/dbConnect";
import SkillModel from "../src/models/skill.model";

export async function seedSkills() {
  try {
    await dbConnect();
    await SkillModel.deleteMany();
    await SkillModel.insertMany(skillsStatic);
    console.log("✅ Skills seeded successfully");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
}
