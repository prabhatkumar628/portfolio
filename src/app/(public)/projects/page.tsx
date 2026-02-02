"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

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
    {
      id: 5,
      title: "Portfolio CMS",
      description:
        "Custom content management system for portfolio websites with markdown support, SEO optimization, and analytics.",
      image: "/images/projects/cms.jpg",
      technologies: [
        { name: "Next.js", color: "text-white" },
        { name: "MongoDB", color: "text-green-400" },
        { name: "Tailwind", color: "text-cyan-400" },
      ],
      liveDemo: "https://demo.example.com",
      github: "https://github.com/yourusername/project5",
      featured: false,
    },
    {
      id: 6,
      title: "AI Image Generator",
      description:
        "AI-powered image generation tool using Stable Diffusion API with custom prompts, style options, and gallery.",
      image: "/images/projects/ai.jpg",
      technologies: [
        { name: "Python", color: "text-yellow-400" },
        { name: "React", color: "text-cyan-400" },
        { name: "FastAPI", color: "text-green-400" },
      ],
      liveDemo: "https://demo.example.com",
      github: "https://github.com/yourusername/project6",
      featured: true,
    },
    {
      id: 7,
      title: "Social Media Analytics",
      description:
        "Analytics dashboard for social media metrics with data visualization, trend analysis, and automated reporting.",
      image: "/images/projects/analytics.jpg",
      technologies: [
        { name: "React", color: "text-cyan-400" },
        { name: "D3.js", color: "text-orange-400" },
        { name: "Node.js", color: "text-green-400" },
      ],
      liveDemo: "https://demo.example.com",
      github: "https://github.com/yourusername/project7",
      featured: false,
    },
    {
      id: 8,
      title: "Fitness Tracker App",
      description:
        "Mobile-responsive fitness tracking application with workout plans, calorie counter, and progress visualization.",
      image: "/images/projects/fitness.jpg",
      technologies: [
        { name: "React Native", color: "text-cyan-400" },
        { name: "Firebase", color: "text-yellow-400" },
        { name: "Redux", color: "text-purple-400" },
      ],
      liveDemo: "https://demo.example.com",
      github: "https://github.com/yourusername/project8",
      featured: false,
    },
    {
      id: 9,
      title: "Restaurant Booking System",
      description:
        "Online reservation system for restaurants with table management, menu display, and automated email confirmations.",
      image: "/images/projects/restaurant.jpg",
      technologies: [
        { name: "Next.js", color: "text-white" },
        { name: "Prisma", color: "text-blue-400" },
        { name: "PostgreSQL", color: "text-blue-400" },
      ],
      liveDemo: "https://demo.example.com",
      github: "https://github.com/yourusername/project9",
      featured: false,
    },
  ];

  const categories = ["All", "Web Apps", "Mobile", "AI/ML", "Dashboard"];
  const [activeCategory, setActiveCategory] = React.useState("All");

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
      <div className="mb-12 flex flex-wrap justify-center gap-3">
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
      </div>

      {/* ================= PROJECTS GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden hover:border-white/20 transition-all duration-300"
          >
            {/* Featured Badge */}
            {project.featured && (
              <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium">
                Featured
              </div>
            )}

            {/* Project Image */}
            <div className="relative h-48 bg-gradient-to-br from-purple-500/10 to-pink-500/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-[1]"></div>
              {/* Placeholder gradient - Replace with actual image */}
              <div className="w-full h-full bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20 flex items-center justify-center">
                <div className="text-6xl opacity-20">💻</div>
              </div>
              {/* Uncomment when you have images: */}
              {/* <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              /> */}
            </div>

            {/* Project Content */}
            <div className="p-6">
              {/* Project Title */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
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
              <p className="text-sm text-white/60 mb-6 line-clamp-3">
                {project.description}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  Live Demo
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-transparent backdrop-blur-sm text-center">
            <div className="text-4xl font-bold text-white mb-2">50+</div>
            <div className="text-sm text-white/60">Projects Completed</div>
          </div>
          <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-pink-500/10 to-transparent backdrop-blur-sm text-center">
            <div className="text-4xl font-bold text-white mb-2">30+</div>
            <div className="text-sm text-white/60">Happy Clients</div>
          </div>
          <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-transparent backdrop-blur-sm text-center">
            <div className="text-4xl font-bold text-white mb-2">15K+</div>
            <div className="text-sm text-white/60">Lines of Code</div>
          </div>
          <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-transparent backdrop-blur-sm text-center">
            <div className="text-4xl font-bold text-white mb-2">5+</div>
            <div className="text-sm text-white/60">Years Experience</div>
          </div>
        </div>
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
