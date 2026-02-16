import ProjectsClient from './ProjectsClient'

export default function Projects() {
  return <ProjectsClient/>
}

export const generateMetadata = () => {
  return {
    title:
      "Projects - Prabhat Kumar | Full Stack Developer Portfolio (Next.js, React, MERN)",

    description:
      "Explore real-world projects built by Prabhat Kumar using Next.js, React, TypeScript, Node.js, and MongoDB. View live demos, GitHub repositories, and full-stack applications showcasing modern frontend, backend, and MERN stack development skills.",

    keywords: [
      "Prabhat Kumar Projects",
      "Full Stack Developer Projects",
      "Next.js Projects",
      "React Projects",
      "MERN Stack Projects",
      "Web Developer Portfolio Projects",
      "JavaScript Projects",
      "MongoDB Projects",
      "Node.js Projects",
      "Frontend Projects",
      "Backend Projects",
      "Full Stack Web Applications",
      "GitHub Developer Portfolio",
      "Live Web Projects",
      "Developer Project Showcase",
      "React Developer Portfolio Projects",
      "Next.js Developer Portfolio Projects",
      "Software Developer Projects",
      "Real World Web Applications",
      "Full Stack Portfolio Projects",
    ],

    openGraph: {
      title:
        "Prabhat Kumar Projects - Full Stack Developer Portfolio",

      description:
        "Browse live web applications and full-stack projects built using Next.js, React, TypeScript, Node.js, and MongoDB. Includes GitHub source code and live demos.",

      url: `${process.env.NEXTAUTH_URL}/projects`,

      siteName: "Prabhat Kumar Portfolio",

      images: [
        {
          url: `${process.env.NEXTAUTH_URL}/og.png`,
          width: 1200,
          height: 630,
          alt: "Prabhat Kumar Full Stack Developer Projects",
        },
      ],

      type: "website",
    },

    twitter: {
      card: "summary_large_image",

      title:
        "Full Stack Developer Projects - Prabhat Kumar",

      description:
        "Explore real-world full-stack projects with live demos and GitHub repositories built using Next.js, React, and MERN stack.",

      images: [`${process.env.NEXTAUTH_URL}/og.png`],
    },

    robots: "index, follow",

    alternates: {
      canonical: `${process.env.NEXTAUTH_URL}/projects`,
    },
  };
};
