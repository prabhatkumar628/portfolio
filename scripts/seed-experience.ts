import experiencesStatic from "../src/data/experience.static";
import dbConnect from "../src/lib/dbConnect";
import ExperienceModel from "../src/models/experience.model";

export async function seedExperience() {
  try {
    await dbConnect();
    await ExperienceModel.deleteMany();
    await ExperienceModel.insertMany(experiencesStatic);
    console.log("✅ Experience seeded successfully");
  } catch (error) {
    console.error("❌ Experience seeding failed:", error);
  }
}
