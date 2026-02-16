import ContactClient from './ContactClient';

export default function Contact() {
  return <ContactClient/>
}

export const generateMetadata = () => {
  return {
    title:
      "Contact Prabhat Kumar - Hire Full Stack Developer | Next.js, React, MERN Stack",

    description:
      "Get in touch with Prabhat Kumar, a Full Stack Developer specializing in Next.js, React, TypeScript, Node.js, and MongoDB. Contact for freelance projects, full-time opportunities, collaborations, or web development services through multiple contact methods.",

    keywords: [
      "Contact Prabhat Kumar",
      "Hire Full Stack Developer",
      "Hire Next.js Developer",
      "Hire MERN Stack Developer",
      "React Developer Contact",
      "Freelance Web Developer Contact",
      "Full Stack Developer India Contact",
      "Contact Web Developer",
      "Developer Portfolio Contact",
      "Hire React Developer",
      "Next.js Developer Hire",
      "Software Developer Contact",
      "Freelance MERN Developer",
      "Web Developer for Hire",
      "Contact Developer Portfolio",
    ],

    openGraph: {
      title:
        "Contact Prabhat Kumar - Full Stack Developer for Hire",

      description:
        "Reach out to Prabhat Kumar for full-stack web development projects, freelance work, or job opportunities. Specialized in Next.js, React, and MERN stack.",

      url: `${process.env.NEXTAUTH_URL}/contact-us`,

      siteName: "Prabhat Kumar Portfolio",

      images: [
        {
          url: `${process.env.NEXTAUTH_URL}/og.png`,
          width: 1200,
          height: 630,
          alt: "Contact Prabhat Kumar - Full Stack Developer",
        },
      ],

      type: "website",
    },

    twitter: {
      card: "summary_large_image",

      title:
        "Contact Prabhat Kumar - Full Stack Developer",

      description:
        "Contact for freelance projects, collaborations, or full-time roles. Full Stack Developer specializing in Next.js, React, and MERN stack.",

      images: [`${process.env.NEXTAUTH_URL}/og.png`],
    },

    robots: "index, follow",

    alternates: {
      canonical: `${process.env.NEXTAUTH_URL}/contact-us`,
    },
  };
};
