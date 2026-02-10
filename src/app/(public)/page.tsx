"use client";
import { ArrowRight } from "lucide-react";
import GradientButton, { GradientButtonSoft } from "./(components)/Button";
import Hero from "./(components)/Hero";
import Link from "next/link";
import Image from "next/image";
import { GitHub, LinkIcon } from "./(components)/Svg";
import SkillsSlider from "./(components)/SkillsSlider";
// import SkillsSlider3D from "./(components)/SkillsSlider";


export default function Home() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with shopping cart, payment integration, and admin dashboard for inventory management.",
      image: "/images/home/avatar/pra.webp",
      technologies: [
        { name: "React", color: "text-cyan-400" },
        { name: "Next.js", color: "text-white" },
        { name: "Tailwind", color: "text-cyan-400" },
      ],
      liveDemo: "https://demo.example.com",
      github: "https://github.com/yourusername/project1",
      featured: true,
    },
    {
      id: 2,
      title: "Real-time Chat Application",
      description:
        "WebSocket-based chat app with real-time messaging, user authentication, and file sharing capabilities.",
      image: "/images/home/avatar/pra.webp",
      technologies: [
        { name: "Node.js", color: "text-green-400" },
        { name: "Socket.io", color: "text-white" },
        { name: "MongoDB", color: "text-green-400" },
      ],
      liveDemo: "https://demo.example.com",
      github: "https://github.com/yourusername/project2",
      featured: true,
    },
    {
      id: 3,
      title: "Task Management Dashboard",
      description:
        "Kanban-style project management tool with drag-and-drop functionality, team collaboration, and progress tracking.",
      image: "/images/home/avatar/pra.webp",
      technologies: [
        { name: "React", color: "text-cyan-400" },
        { name: "Express", color: "text-gray-400" },
        { name: "PostgreSQL", color: "text-blue-400" },
      ],
      liveDemo: "https://demo.example.com",
      github: "https://github.com/yourusername/project3",
      featured: false,
    },
    {
      id: 4,
      title: "Weather Forecast App",
      description:
        "Beautiful weather application with 7-day forecast, location-based weather, and interactive charts using API integration.",
      image: "/images/home/avatar/pra.webp",
      technologies: [
        { name: "TypeScript", color: "text-blue-400" },
        { name: "React", color: "text-cyan-400" },
        { name: "Chart.js", color: "text-pink-400" },
      ],
      liveDemo: "https://demo.example.com",
      github: "https://github.com/yourusername/project4",
      featured: false,
    },
  ];

   const skillData = {
    frontendData: [
      { name: "React", emoji: "⚛️" },
      { name: "Next.js", emoji: "▲" },
      { name: "TypeScript", emoji: "📘" },
      { name: "Tailwind", emoji: "🎨" },
    ],
    backendData: [
      { name: "Node.js", emoji: "🟢" },
      { name: "MongoDB", emoji: "🍃" },
      { name: "Express", emoji: "🚂" },
    ],
    toolsData: [
      { name: "Git", emoji: "🔧" },
      { name: "Docker", emoji: "🐳" },
      { name: "VS Code", emoji: "💻" },
    ],
  };
  return (
    <>
      <Hero />
      <div>
        <SkillsSlider skillData={skillData} />
      </div>
      <main className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6">
        {/* ================= PAGE HEADER ================= */}
        <div className="flex items-center justify-between">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
              Latest{" "}
              <span className="bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
          </div>
          <div className="flex md:justify-end">
            <Link href={"/projects"}>
              <GradientButton variant="outline" size="sm">
                <div className="flex items-center gap-2">
                  View All <span className="hidden sm:inline">Projects</span>{" "}
                  <ArrowRight size={20} />
                </div>
              </GradientButton>
            </Link>
          </div>
        </div>

        {/* ================= PROJECTS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative p-4 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden hover:border-white/20 transition-all duration-300 ${index == 3 ? "lg:hidden" : ""}`}
            >
              {/* Project Image */}
              <div className="relative rounded-2xl overflow-hidden h-48 bg-linear-to-br from-purple-500/10 to-pink-500/10">
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-1"></div>
                {/* Placeholder gradient - Replace with actual image */}
                <div className="w-full h-full bg-linear-to-br from-purple-900/20 via-black to-pink-900/20 flex items-center justify-center">
                  <div className="text-6xl opacity-20">💻</div>
                </div>
                {/* Uncomment when you have images: */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Project Content */}
              <div className="mt-4">
                {/* Project Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                  {project.title}
                </h3>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/5 ${tech.color}`}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>

                {/* Project Description */}
                <p className="text-sm text-white/60 mb-6 line-clamp-3 h-14 overflow-hidden">
                  {project.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <GradientButton
                    gradient="purple"
                    className="rounded-xl w-full"
                    size="sm"
                  >
                    <LinkIcon className="w-4 h-4 me-1" />
                    Live Demo
                  </GradientButton>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300"
                  >
                    <GitHub className="w-4 h-4" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
