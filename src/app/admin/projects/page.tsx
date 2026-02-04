"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ProjectsPage() {
  const [view, setView] = useState("grid"); // grid or list
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      slug: "ecommerce-platform",
      description: "Full-featured e-commerce platform with shopping cart, payment integration, and admin dashboard.",
      thumbnail: "/projects/ecommerce.jpg",
      category: "web-app",
      technologies: ["React", "Next.js", "MongoDB", "Stripe"],
      status: "completed",
      isPublished: true,
      featured: true,
      views: 1234,
      likes: 89,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      title: "Real-time Chat Application",
      slug: "chat-app",
      description: "WebSocket-based chat app with real-time messaging and file sharing.",
      thumbnail: "/projects/chat.jpg",
      category: "web-app",
      technologies: ["Node.js", "Socket.io", "React", "MongoDB"],
      status: "completed",
      isPublished: true,
      featured: false,
      views: 856,
      likes: 45,
      createdAt: "2024-01-10",
    },
    {
      id: 3,
      title: "AI Image Generator",
      slug: "ai-image-generator",
      description: "AI-powered image generation tool using Stable Diffusion API.",
      thumbnail: "/projects/ai.jpg",
      category: "ai-ml",
      technologies: ["Python", "FastAPI", "React", "TensorFlow"],
      status: "in-progress",
      isPublished: false,
      featured: true,
      views: 432,
      likes: 28,
      createdAt: "2024-01-20",
    },
    {
      id: 4,
      title: "Task Management Dashboard",
      slug: "task-manager",
      description: "Kanban-style project management tool with drag-and-drop functionality.",
      thumbnail: "/projects/dashboard.jpg",
      category: "dashboard",
      technologies: ["React", "Express", "PostgreSQL", "Redux"],
      status: "completed",
      isPublished: true,
      featured: false,
      views: 678,
      likes: 52,
      createdAt: "2024-01-05",
    },
    {
      id: 5,
      title: "Mobile Fitness App",
      slug: "fitness-app",
      description: "Cross-platform fitness tracking app with workout plans and progress tracking.",
      thumbnail: "/projects/fitness.jpg",
      category: "mobile",
      technologies: ["React Native", "Firebase", "Redux"],
      status: "archived",
      isPublished: false,
      featured: false,
      views: 234,
      likes: 12,
      createdAt: "2023-12-20",
    },
  ];

  const stats = [
    { label: "Total Projects", value: projects.length, color: "from-purple-500 to-pink-500" },
    { label: "Published", value: projects.filter(p => p.isPublished).length, color: "from-green-500 to-emerald-500" },
    { label: "Drafts", value: projects.filter(p => !p.isPublished).length, color: "from-yellow-500 to-orange-500" },
    { label: "Featured", value: projects.filter(p => p.featured).length, color: "from-blue-500 to-cyan-500" },
  ];

  const filters = [
    { label: "All", value: "all" },
    { label: "Published", value: "published" },
    { label: "Drafts", value: "drafts" },
    { label: "Featured", value: "featured" },
  ];

  const filteredProjects = projects.filter(p => {
    if (filter === "all") return true;
    if (filter === "published") return p.isPublished;
    if (filter === "drafts") return !p.isPublished;
    if (filter === "featured") return p.featured;
    return true;
  });

  const getStatusBadge = (status) => {
    const badges = {
      completed: { text: "Completed", color: "bg-green-500/20 text-green-400 border-green-500/30" },
      "in-progress": { text: "In Progress", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
      archived: { text: "Archived", color: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
    };
    return badges[status] || badges.completed;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-white/60">Manage your portfolio projects</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Project
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl"
          >
            <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
              {stat.value}
            </div>
            <div className="text-sm text-white/60">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters & View Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                filter === f.value
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 p-1 rounded-xl bg-white/5 border border-white/10">
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded-lg transition-all ${
              view === "grid" ? "bg-purple-500 text-white" : "text-white/60 hover:text-white"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-lg transition-all ${
              view === "list" ? "bg-purple-500 text-white" : "text-white/60 hover:text-white"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Projects Grid/List */}
      {view === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden hover:border-white/20 transition-all"
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                  💼
                </div>
                {project.featured && (
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium">
                    Featured
                  </div>
                )}
                {!project.isPublished && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-medium">
                    Draft
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-sm text-white/60 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-lg text-xs bg-white/5 text-white/70 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 rounded-lg text-xs text-white/50">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-white/50">
                  <span className="flex items-center gap-1">
                    👁️ {project.views}
                  </span>
                  <span className="flex items-center gap-1">
                    ❤️ {project.likes}
                  </span>
                  <span className={`ml-auto px-2 py-0.5 rounded-full text-xs border ${getStatusBadge(project.status).color}`}>
                    {getStatusBadge(project.status).text}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="flex-1 px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm font-medium text-center hover:bg-purple-500/30 transition-all"
                  >
                    Edit
                  </Link>
                  <button className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white text-sm transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl hover:bg-white/5 transition-all"
            >
              {/* Thumbnail */}
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center text-3xl shrink-0">
                💼
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3 mb-2">
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  {project.featured && (
                    <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium shrink-0">
                      Featured
                    </span>
                  )}
                  {!project.isPublished && (
                    <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-medium shrink-0">
                      Draft
                    </span>
                  )}
                  <span className={`ml-auto px-2 py-0.5 rounded-full text-xs border ${getStatusBadge(project.status).color} shrink-0`}>
                    {getStatusBadge(project.status).text}
                  </span>
                </div>
                <p className="text-sm text-white/60 mb-3 line-clamp-1">{project.description}</p>
                <div className="flex items-center gap-6 text-sm text-white/50">
                  <span>👁️ {project.views}</span>
                  <span>❤️ {project.likes}</span>
                  <span>📅 {new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm font-medium hover:bg-purple-500/30 transition-all"
                >
                  Edit
                </Link>
                <button className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredProjects.length === 0 && (
        <div className="p-12 text-center rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="text-6xl mb-4">📁</div>
          <p className="text-white/60 mb-4">No projects found</p>
          <Link
            href="/admin/projects/new"
            className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            Create Your First Project
          </Link>
        </div>
      )}
    </div>
  );
}