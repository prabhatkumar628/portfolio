import settingsStatic from "../src/data/settings.static";
import dbConnect from "../src/lib/dbConnect";
import SettingModel from "../src/models/settings.model";

export async function seedSettings() {
  try {
    await dbConnect();
    await SettingModel.deleteMany();
    await SettingModel.create(settingsStatic);
    console.log("✅ Setting seeded successfully");
  } catch (error) {
    console.error("❌ Setting Seeding failed:", error);
  }
}
