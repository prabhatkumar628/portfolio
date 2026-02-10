"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GitHub, LinkIcon } from "../(components)/Svg";
import GradientButton from "../(components)/Button";

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with shopping cart, payment integration, and admin dashboard for inventory management.",
      image: "/images/projects/ecommerce.jpg",
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
      image: "/images/projects/chat.jpg",
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
      image: "/images/projects/dashboard.jpg",
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
      image: "/images/projects/weather.jpg",
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

  return (
    <main className="mx-auto max-w-7xl p-4 py-12">
      {/* ================= PAGE HEADER ================= */}
      <div className="mb-16 text-center">
        <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl mb-4">
          My{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Projects Portfolio
          </span>
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          A showcase of my recent work. From web applications to mobile apps,
          each project represents a unique challenge and solution.
        </p>
      </div>

      {/* ================= FILTER CATEGORIES ================= */}
      {/* <div className="mb-12 flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full border transition-all duration-300 ${
              activeCategory === category
                ? "bg-gradient-to-r from-purple-500 to-pink-500 border-transparent text-white"
                : "border-white/20 text-white/70 hover:border-purple-500/50 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div> */}

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

      {/* ================= CTA SECTION ================= */}
      <div className="text-center">
        <div className="p-12 rounded-3xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 border border-purple-500/20">
          <h2 className="text-3xl font-bold text-white mb-4">
            Have a Project in Mind?
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            I{`'`}m always excited to work on new and challenging projects. Let
            {`'`}s collaborate and create something amazing together!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            >
              Get In Touch 💬
            </Link>
            <a
              href="mailto:prabhat.dev@gmail.com"
              className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
            >
              Email Me 📧
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
