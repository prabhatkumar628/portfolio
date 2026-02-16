import AboutClient from './AboutClient';

export default function About() {
  return <AboutClient/>
}

export const generateMetadata = () => {
  return {
    title:
      "About Prabhat Kumar - MERN Stack & Next.js Developer | Skills, Experience & Expertise",

    description:
      "Learn more about Prabhat Kumar, a MERN Stack and Next.js Developer with experience building modern, scalable web applications using React, Next.js, TypeScript, Node.js, and MongoDB. Explore technical skills, development expertise, professional experience, and full-stack capabilities.",

    keywords: [
      "About Prabhat Kumar",
      "MERN Stack Developer Experience",
      "Next.js Developer Skills",
      "React Developer Profile",
      "Full Stack Developer Skills",
      "Node.js Developer Experience",
      "MongoDB Developer Portfolio",
      "JavaScript Developer Skills",
      "Frontend and Backend Developer",
      "Full Stack Developer India",
      "React Next.js Developer Profile",
      "Software Developer Experience",
      "Web Developer About Page",
      "Technical Skills Portfolio",
      "Full Stack Engineer Profile",
    ],

    openGraph: {
      title:
        "About Prabhat Kumar - MERN Stack & Next.js Developer",

      description:
        "Discover the skills, experience, and expertise of Prabhat Kumar, a full-stack developer specializing in MERN stack and Next.js, building modern and scalable web applications.",

      url: `${process.env.NEXTAUTH_URL}/about-us`,

      siteName: "Prabhat Kumar Portfolio",

      images: [
        {
          url: `${process.env.NEXTAUTH_URL}/og.png`,
          width: 1200,
          height: 630,
          alt: "About Prabhat Kumar - MERN Stack Developer",
        },
      ],

      type: "profile",
    },

    twitter: {
      card: "summary_large_image",

      title:
        "About Prabhat Kumar - Full Stack Developer",

      description:
        "MERN Stack and Next.js Developer with strong expertise in building scalable full-stack web applications using modern technologies.",

      images: [`${process.env.NEXTAUTH_URL}/og.png`],
    },

    robots: "index, follow",

    alternates: {
      canonical: `${process.env.NEXTAUTH_URL}/about-us`,
    },
  };
};

