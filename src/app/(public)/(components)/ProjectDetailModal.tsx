"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ExternalLink, Calendar } from "lucide-react";
import { GitHub } from "./Svg";

// Project Detail Modal Component
export default function ProjectDetailModal({
  project,
  isOpen,
  onClose,
  onLinkClick,
}: any) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed h-screen inset-0 z-50 bg-black/90 backdrop-blur-md animate-in lg:animate-none fade-in duration-200 "
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 pointer-events-none">
        <div
          onClick={(e) => e.stopPropagation()}
          className="pointer-events-auto relative w-full h-full sm:h-auto sm:max-w-5xl sm:max-h-[95vh] overflow-y-auto hide-scrollbar bg-black sm:bg-black/95 sm:border border-white/20 sm:rounded-3xl shadow-2xl shadow-purple-500/20 animate-in lg:animate-none slide-in-from-bottom sm:slide-in-from-bottom-4 duration-300"
        >
          {/* Close Button - Fixed on mobile, sticky on desktop */}
          <div className="sticky top-0 z-20 flex justify-end p-4 sm:p-6 bg-linear-to-b from-black via-black/80 to-transparent">
            <button
              onClick={onClose}
              className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm border border-white/10 shadow-lg cursor-pointer"
              aria-label="Close modal"
            >
              <X size={22} />
            </button>
          </div>

          {/* Modal Content */}
          <div className="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 -mt-16 sm:-mt-20">
            {/* Project Image */}
            <div className="relative rounded-2xl overflow-hidden bg-linear-to-br from-purple-500/10 to-pink-500/10 mb-6">
              {project.thumbnail?.url ? (
                <Image
                  src={project.thumbnail.url}
                  alt={project.title}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              ) : (
                <div className="w-full h-64 flex items-center justify-center">
                  <div className="text-8xl opacity-20">💻</div>
                </div>
              )}

              {project.featured && (
                <div className="absolute top-4 left-4 z-30 px-4 py-2 rounded-full bg-linear-to-r from-purple-500 to-pink-500 text-white text-sm font-medium">
                  Featured
                </div>
              )}
            </div>

            {/* Project Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text leading-tight">
              {project.title}
            </h2>

            {/* Category, Status & Meta Info */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              {/* Category */}
              <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs sm:text-sm font-medium">
                <span className="text-sm sm:text-base">📂</span>
                <span className="capitalize">{project.category}</span>
              </span>

              {/* Status */}
              <span
                className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium ${
                  project.status === "completed"
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : project.status === "in-progress"
                      ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                }`}
              >
                {project.status === "completed" && "✅"}
                {project.status === "in-progress" && "🚧"}
                {project.status === "archived" && "📦"}
                <span className="capitalize">
                  {project.status.replace("-", " ")}
                </span>
              </span>

              {/* Created Date */}
              {project.createdAt && (
                <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 text-white/60 border border-white/10 text-xs sm:text-sm">
                  <Calendar size={14} className="hidden sm:inline" />
                  {formatDate(project.createdAt)}
                </span>
              )}
            </div>

            {/* Technologies Section */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-xs sm:text-sm font-semibold text-white/70 uppercase tracking-wider mb-3 sm:mb-4">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map(
                  (tech: Record<string, string>, index: number) => (
                    <span
                      key={index}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors ${tech.highlight || "text-white"}`}
                    >
                      {tech.name}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-xs sm:text-sm font-semibold text-white/70 uppercase tracking-wider mb-3 sm:mb-4">
                About This Project
              </h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Live Demo Button */}
              {project.liveDemoLink && (
                <button
                  onClick={() => {
                    onLinkClick({
                      link: project.liveDemoLink,
                      linkType: "liveDemoLink",
                      projectId: project._id.toString(),
                    });
                    onClose();
                  }}
                  className="w-full flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-linear-to-r from-purple-500 to-pink-500 text-white text-sm sm:text-base font-medium hover:shadow-lg hover:shadow-purple-500/50 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <ExternalLink size={18} className="sm:w-5 sm:h-5" />
                  <span>View Live Demo</span>
                </button>
              )}

              {/* GitHub Links */}
              {(project.githubFrontendLink ||
                project.githubBackendLink ||
                project.githubMobileLink) && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                  {project.githubFrontendLink && (
                    <button
                      onClick={() => {
                        onLinkClick({
                          link: project.githubFrontendLink,
                          linkType: "githubFrontendLink",
                          projectId: project._id.toString(),
                        });
                        onClose();
                      }}
                      className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 active:scale-[0.98] transition-all backdrop-blur-sm cursor-pointer"
                    >
                      <GitHub className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm font-medium">
                        Frontend
                      </span>
                    </button>
                  )}
                  {project.githubBackendLink && (
                    <button
                      onClick={() => {
                        onLinkClick({
                          link: project.githubBackendLink,
                          linkType: "githubBackendLink",
                          projectId: project._id.toString(),
                        });
                        onClose();
                      }}
                      className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 active:scale-[0.98] transition-all backdrop-blur-sm cursor-pointer"
                    >
                      <span className="text-base sm:text-lg">⚙️</span>
                      <span className="text-xs sm:text-sm font-medium">
                        Backend
                      </span>
                    </button>
                  )}
                  {project.githubMobileLink && (
                    <button
                      onClick={() => {
                        onLinkClick({
                          link: project.githubMobileLink,
                          linkType: "githubMobileLink",
                          projectId: project._id.toString(),
                        });
                        onClose();
                      }}
                      className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 active:scale-[0.98] transition-all backdrop-blur-sm cursor-pointer"
                    >
                      <span className="text-base sm:text-lg">📱</span>
                      <span className="text-xs sm:text-sm font-medium">
                        Mobile
                      </span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
