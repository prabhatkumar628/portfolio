import { ISettings } from "../models/settings.model";

export const defaultSiteSettings = {
  siteName: "Prabhat",
  siteLogo: { url: "/images/home/avatar/pra.webp", public_id: "empty" },
  siteFavicon: { url: "/icons/android-chrome-192x192.png", public_id: "empty" },
  siteTitle: "Software Engineer",
  siteDescription:
    "Crafting digital experiences that inspire and innovate. Transforming ideas into elegant, high-performance web solutions.",
  siteVideoLg: { url: "/images/home/bg2.mp4", public_id: "empty" },
  siteVideoSm: { url: "/images/home/bg.mp4", public_id: "empty" },
  metaTitle: "",
  metaDescription: "",
  metaKeywords: [],
  ogImage: { url: "/icons/android-chrome-512x512.png", public_id: "empty" },

  googleAnalyticsId: "",
  facebookPixelId: "",

  features: {
    blogEnabled: true,
    contactFormEnabled: true,
    testimonialsEnabled: true,
    darkModeEnabled: true,
  },

  maintenanceMode: false,
  maintenanceMessage:
    "Crafting digital experiences that inspire and innovate. Transforming ideas into elegant, high-performance web solutions.",
};

export const defaultPersonalDetails = {
  fullName: "Prabhat Kumar",
  email: "kprabhat628@gmail.com",
  phone: "8294925485",
  resume: { url: "/resume/prabat_kumar_2026.pdf", public_id: "empty" },
  isAvailableForHire: true,
  location: "Noida Sec-71",
  socialLinks: {
    github: "https://github.com/prabhatkumar628",
    linkedin: "https://linkedin.com/in/prabhatkumar628",
    facebook: "",
    twitter: "https://x.com/prabhatkumar628",
    instagram: "https://www.instagram.com/prabhatkumar628",
    youtube: "https://www.youtube.com/@prabhatui",
    discord: "",
  },
};

export const defaultHeroSection = {
  heroTitle: "Software Engineer",
  heroSubtitle: "Building modern web experiences that inspire and innovate",
  heroDescription: [
    { text: "MERN & Next.js developer crafting " },
    { text: "fast", highlight: "purple" },
    { text: ", " },
    { text: "scalable", highlight: "pink" },
    { text: ", and " },
    { text: "modern", highlight: "indigo" },
    { text: " web experiences with React and Node.js." },
  ],
  heroImage: { url: "/images/home/avatar/pra.webp", public_id: "empty" },
  heroSkills: ["React", "Next.js", "TypeScript", "Tailwind", "Node.js"],
  heroCTA: {
    primary: { text: "My Work", link: "/projects" },
    secondary: { text: "Let's Talk", link: "/contact-us" },
  },
};

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

const settingsStatic: Partial<ISettings> = {
  key: "global",
  //site details
  ...defaultSiteSettings,

  //Personal Details
  ...defaultPersonalDetails,

  //hero seciton details
  ...defaultHeroSection,

  //about section details
  ...defaultAboutSection,
};
export default settingsStatic;
