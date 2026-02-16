import mongoose from "mongoose";
// import UserModel from "../models/user.model";
// import bcrypt from "bcryptjs";
// import { seedSkills } from "../../scripts/seed-skills";
// import { seedExperience } from "../../scripts/seed-experience";
import { seedSettings } from "../../scripts/seed-settings";
import SettingModel from "../models/settings.model";

type Connection = { isConnected: boolean };

const connection: Connection = {
  isConnected: false,
};
const DB_URL = `${process.env.MONGODB_URI}/my_portfolio`;

const dbConnect = async () => {
  if (connection.isConnected) {
    console.log(`MongoDB already connected`);
    return;
  }
  try {
    const db = await mongoose.connect(DB_URL, {
      maxPoolSize: 10,
    });
    connection.isConnected = db.connections[0].readyState === 1;
    console.log(`MongoDB connected !!! HOST:`, db.connection.host);
    // // skill seeding
    // await seedSkills();

    // // experience seeding
    // await seedExperience()

    //settings seeding
    const setting = await SettingModel.findOne({ key: "global" });
    if (!setting) {
      await seedSettings();
    }

    // admin seeding
    // const user = await UserModel.findOne({ email: "kprabhat628@gmail.com" });
    // if (user) {
    //   console.log(`User already available`);
    // } else {
    //   const hashedPassword = await bcrypt.hash("user@123", 10);
    //   const newUser = await UserModel.create({
    //     name: "Prabhat Kumar",
    //     email: "kprabhat628@gmail.com",
    //     password: hashedPassword,
    //   });
    //   console.log(`New User created successfully`, {
    //     name: newUser.name,
    //     email: newUser.email,
    //   });
    // }
  } catch (error) {
    console.log(`MongoDB connection ERROR:`, error);
    process.exit(1);
  }
};

export default dbConnect;
