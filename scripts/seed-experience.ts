import dbConnect from "../src/lib/dbConnect";
import ExperienceModel from "../src/models/experience.model";

export const experiences = [
  {
    company: "Tech Innovations Inc.",
    location: "Remote",
    position: "Senior Full Stack Developer",
    employmentType: "full-time",
    startDate: new Date("2023-01-01"),
    endDate: new Date(), // current job
    isCurrent: true,
    description:
      "Leading development of scalable web applications using React, Next.js, and Node.js. Mentoring junior developers and architecting solutions.",
    achievements: [
      "Built 5+ enterprise-level applications",
      "Reduced loading time by 40%",
      "Implemented CI/CD pipelines",
    ],
  },
  {
    company: "Digital Solutions Ltd.",
    location: "Bangalore, India",
    position: "Full Stack Developer",
    employmentType: "full-time",
    startDate: new Date("2021-01-01"),
    endDate: new Date("2023-01-01"),
    isCurrent: false,
    description:
      "Developed and maintained multiple client projects, focusing on responsive design and performance optimization.",
    achievements: [
      "Delivered 15+ client projects",
      "Improved code quality by 30%",
      "Led team of 3 developers",
    ],
  },
  {
    company: "StartUp Ventures",
    location: "Delhi, India",
    position: "Frontend Developer",
    employmentType: "full-time",
    startDate: new Date("2019-01-01"),
    endDate: new Date("2021-01-01"),
    isCurrent: false,
    description:
      "Created modern, user-friendly interfaces and collaborated with designers to bring concepts to life.",
    achievements: [
      "Redesigned company website",
      "Increased user engagement by 50%",
      "Implemented design systems",
    ],
  },
];

export async function seedExperience() {
  try {
    await dbConnect();
    await ExperienceModel.deleteMany();
    await ExperienceModel.insertMany(experiences);
    console.log("✅ Experience seeded successfully");
  } catch (error) {
    console.error("❌ Experience seeding failed:", error);
  }
}
