"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { GitHub, LinkIcon } from "../(components)/Svg";
import { useGetPublicProjects } from "@/hooks/usePublicProjects";
import { useAdminLayoutContext } from "../../../context/adminLayoutContext/AdminLayoutContext";

export default function ProjectsPage() {
  // ─── States ──────────────────────────────────────────────
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [category, setCategory] = useState("all");

  const { globalSearch, scrollContainerRef,handleSearchChange,clearSearch,searchInput } = useAdminLayoutContext();
  // ─── Fetch Projects ──────────────────────────────────────
  const { data, isLoading, isError } = useGetPublicProjects({
    page,
    limit,
    search: globalSearch,
    category: category !== "all" ? category : "",
  });

  const projects = data?.projects || [];
  const totalPages = data?.pagination.totalPages || 1;
  const currentPage = data?.pagination.currentPage || 1;
  const totalProjects = data?.pagination.totalProjects || 0;
  const hasNextPage = data?.pagination.hasNextPage || false;
  const hasPrevPage = data?.pagination.hasPrevPage || false;

  // data?.pagination.currentPage

  // ─── Categories ──────────────────────────────────────────
  const categories = [
    { value: "all", label: "All Projects", icon: "🎯" },
    { value: "web", label: "Web Apps", icon: "🌐" },
    { value: "mobile", label: "Mobile", icon: "📱" },
    { value: "fullstack", label: "Full-stack", icon: "🔧" },
    { value: "frontend", label: "Frontend", icon: "🎨" },
    { value: "backend", label: "Backend", icon: "⚙️" },
  ];

  useEffect(() => {
    if (scrollContainerRef?.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [page, scrollContainerRef]); // ✅ Runs AFTER page state updates

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  // ─── Pagination Numbers ──────────────────────────────────
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      {/* ================= PAGE HEADER ================= */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          My{" "}
          <span className="bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Projects Portfolio
          </span>
        </h1>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          A showcase of my recent work. From web applications to mobile apps,
          each project represents a unique challenge and solution.
        </p>
      </div>

      {/* ================= SEARCH BAR ================= */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-white/40" />
          </div>
          <input
            type="text"
            placeholder="Search projects by name, tech stack..."
            value={searchInput}
            onChange={(e) => {
              handleSearchChange(e.target.value)
              setPage(1);
            }}
            className="w-full pl-14 pr-14 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
          {searchInput && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-5 flex items-center text-white/40 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          {/* Search Indicator */}
          {/* ////////////////////////////////////////////////////////////////////// */}
          {/* {searchInput && debouncedSearch !== searchInput && (
            <div className="absolute right-14 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            </div>
          )} */}
        </div>
      </div>

      {/* ================= CATEGORY FILTERS ================= */}
      <div className="mb-10">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={`group px-5 py-2.5 rounded-full border transition-all duration-300 ${
                category === cat.value
                  ? "bg-linear-to-r from-purple-500 to-pink-500 border-transparent text-white shadow-lg shadow-purple-500/30"
                  : "border-white/20 text-white/70 hover:border-purple-500/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-sm font-medium flex items-center gap-2">
                <span className="text-base">{cat.icon}</span>
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ================= LOADING STATE ================= */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl animate-pulse"
            >
              {/* Image Skeleton */}
              <div className="h-48 rounded-2xl bg-white/5 mb-4" />
              {/* Title Skeleton */}
              <div className="h-6 bg-white/5 rounded-lg mb-3 w-3/4" />
              {/* Tech Tags Skeleton */}
              <div className="flex gap-2 mb-4">
                <div className="h-6 w-16 bg-white/5 rounded-full" />
                <div className="h-6 w-20 bg-white/5 rounded-full" />
                <div className="h-6 w-16 bg-white/5 rounded-full" />
              </div>
              {/* Description Skeleton */}
              <div className="space-y-2 mb-6">
                <div className="h-3 bg-white/5 rounded w-full" />
                <div className="h-3 bg-white/5 rounded w-full" />
                <div className="h-3 bg-white/5 rounded w-2/3" />
              </div>
              {/* Buttons Skeleton */}
              <div className="flex gap-2">
                <div className="h-10 bg-white/5 rounded-xl flex-1" />
                <div className="h-10 w-24 bg-white/5 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= ERROR STATE ================= */}
      {isError && !isLoading && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">😕</div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-white/60 mb-6">
            Failed to load projects. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            Refresh Page
          </button>
        </div>
      )}

      {/* ================= EMPTY STATE ================= */}
      {!isLoading && !isError && projects.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-white mb-2">
            No projects found
          </h3>
          <p className="text-white/60 mb-6">
            {searchInput || category !== "all"
              ? "Try adjusting your search or filters"
              : "No projects available at the moment"}
          </p>
          {(searchInput || category !== "all") && (
            <button
              onClick={() => {
                clearSearch();
                setCategory("all");
                setPage(1);
              }}
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* ================= PROJECTS GRID ================= */}
      {!isLoading && !isError && projects.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {projects.map((project) => (
              <div
                key={project._id.toString()}
                className="group relative p-4 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative rounded-2xl overflow-hidden h-48 bg-linear-to-br from-purple-500/10 to-pink-500/10 mb-4">
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10" />
                  {project.thumbnail?.url ? (
                    <Image
                      src={project.thumbnail.url}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-6xl opacity-20">💻</div>
                    </div>
                  )}
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full bg-linear-to-r from-yellow-500/90 to-orange-500/90 backdrop-blur-sm text-white text-xs font-medium">
                      ⭐ Featured
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div>
                  {/* Project Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:bg-linear-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {project.title}
                  </h3>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies
                      ?.slice(0, 4)
                      .map((tech, index: number) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/5 ${tech.highlight || "text-white"}`}
                        >
                          {tech.name}
                        </span>
                      ))}
                    {project.technologies?.length > 4 && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-white/60">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Project Description */}
                  <p className="text-sm h-15 overflow-hidden text-white/60 mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {project.liveDemoLink && (
                      <a
                        href={project.liveDemoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                      >
                        <LinkIcon className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}

                    {/* GitHub Links */}
                    {(project.githubFrontendLink ||
                      project.githubBackendLink ||
                      project.githubMobileLink) && (
                      <div className="flex gap-2">
                        {project.githubFrontendLink && (
                          <a
                            href={project.githubFrontendLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300"
                            title="Frontend Repository"
                          >
                            <GitHub className="w-4 h-4" />
                            {!project.githubBackendLink &&
                              !project.githubMobileLink &&
                              "GitHub"}
                          </a>
                        )}
                        {project.githubBackendLink && (
                          <a
                            href={project.githubBackendLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center px-4 py-2.5 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300"
                            title="Backend Repository"
                          >
                            <span className="text-xs">⚙️</span>
                          </a>
                        )}
                        {project.githubMobileLink && (
                          <a
                            href={project.githubMobileLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center px-4 py-2.5 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300"
                            title="Mobile Repository"
                          >
                            <span className="text-xs">📱</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ================= PAGINATION ================= */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
              {/* Page Info */}
              <div className="text-sm text-white/60">
                Showing{" "}
                <span className="text-white font-medium">
                  {(currentPage - 1) * limit + 1}
                </span>{" "}
                -{" "}
                <span className="text-white font-medium">
                  {Math.min(currentPage * limit, totalProjects)}
                </span>{" "}
                of{" "}
                <span className="text-white font-medium">{totalProjects}</span>{" "}
                projects
              </div>

              {/* Pagination Buttons */}
              <div className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={() => {
                    setPage((p) => Math.max(1, p - 1));
                  
                  }}
                  disabled={!hasPrevPage}
                  className={`p-2 rounded-xl border transition-all ${
                    hasPrevPage
                      ? "border-white/20 text-white hover:bg-white/10 hover:border-purple-500/50"
                      : "border-white/10 text-white/30 cursor-not-allowed"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Page Numbers */}
                <div className="flex gap-1">
                  {getPageNumbers().map((pageNum, index) =>
                    pageNum === "..." ? (
                      <span
                        key={`dots-${index}`}
                        className="px-3 py-2 text-white/40"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={pageNum}
                        onClick={() => {
                          setPage(pageNum as number);
                          
                        }}
                        className={`min-w-10 px-3 py-2 rounded-xl border transition-all ${
                          currentPage === pageNum
                            ? "bg-linear-to-r from-purple-500 to-pink-500 border-transparent text-white shadow-lg shadow-purple-500/30"
                            : "border-white/20 text-white hover:bg-white/10 hover:border-purple-500/50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ),
                  )}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => {
                    setPage((p) => Math.min(totalPages, p + 1));
                   
                  }}
                  disabled={!hasNextPage}
                  className={`p-2 rounded-xl border transition-all ${
                    hasNextPage
                      ? "border-white/20 text-white hover:bg-white/10 hover:border-purple-500/50"
                      : "border-white/10 text-white/30 cursor-not-allowed"
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* ================= CTA SECTION ================= */}
      <div className="text-center">
        <div className="p-12 rounded-3xl bg-linear-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 border border-purple-500/20">
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
              className="px-8 py-3 rounded-full bg-linear-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
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
