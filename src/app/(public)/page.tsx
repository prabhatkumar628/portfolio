import React from "react";
import HomeClient from "./HomeClient";

export default function Home() {
  return <HomeClient />;
}

export const generateMetadata = () => {
  return {
    title:
      "Prabhat Kumar - MERN Stack & Next.js Developer | React, TypeScript, MongoDB Portfolio",

    description:
      "Prabhat Kumar is a MERN Stack and Next.js Developer specializing in building scalable, production-ready web applications using React, Next.js, TypeScript, Node.js, and MongoDB. Explore full-stack projects, modern UI systems, REST APIs, and real-world applications demonstrating expertise in frontend and backend development.",

    keywords: [
      "Prabhat Kumar",
      "MERN Stack Developer",
      "Next.js Developer",
      "React Developer",
      "Full Stack Developer Portfolio",
      "MongoDB Developer",
      "Node.js Developer",
      "TypeScript Developer",
      "React Next.js Portfolio",
      "Full Stack Web Developer India",
      "Frontend and Backend Developer",
      "Modern Web Applications",
      "REST API Developer",
      "JavaScript Developer Portfolio",
      "Hire MERN Stack Developer",
      "Next.js Portfolio Website",
      "React Projects Portfolio",
      "Full Stack Projects",
      "Software Developer Portfolio",
    ],

    openGraph: {
      title: "Prabhat Kumar - MERN Stack & Next.js Developer Portfolio",

      description:
        "Portfolio of Prabhat Kumar, a MERN Stack and Next.js Developer building scalable full-stack applications with React, Next.js, Node.js, TypeScript, and MongoDB.",

      url: `${process.env.NEXTAUTH_URL}`,
      siteName: "Prabhat Kumar Portfolio",

      images: [
        {
          url: `${process.env.NEXTAUTH_URL}/og.png`,
          width: 1200,
          height: 630,
          alt: "Prabhat Kumar MERN Stack Developer Portfolio",
        },
      ],

      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: "Prabhat Kumar - MERN Stack & Next.js Developer",

      description:
        "MERN Stack and Next.js Developer building scalable full-stack applications using React, Node.js, TypeScript, and MongoDB.",

      images: [`${process.env.NEXTAUTH_URL}/og.png`],
    },

    robots: "index, follow",

    alternates: {
      canonical: `${process.env.NEXTAUTH_URL}`,
    },
  };
};
