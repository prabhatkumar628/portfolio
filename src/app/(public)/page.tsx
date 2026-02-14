"use client";
import { ArrowRight, Eye } from "lucide-react";
import GradientButton from "./(components)/Button";
import Hero from "./(components)/Hero";
import Link from "next/link";
import Image from "next/image";
import { GitHub, LinkIcon } from "./(components)/Svg";
import SkillsSlider from "./(components)/SkillsSlider";
import { useGetPublicProjects } from "../../hooks/usePublicProjects";
import { LinkType, useClickTrack } from "../../hooks/useClickTrack";
import ProjectDetailModal from "./projects/ProjectDetailModal";
import { useState } from "react";
import { IProject } from "../../models/project.model";
// import SkillsSlider3D from "./(components)/SkillsSlider";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  const { data, isLoading, isError } = useGetPublicProjects({
    page: 1,
    limit: 4,
  });

  const { mutate: clickTrack, isPending: clickTrackPending } = useClickTrack();
  const handleLinkClick = ({
    linkType,
    projectId,
    link,
  }: {
    linkType: LinkType;
    projectId: string;
    link: string;
  }) => {
    const openLink = () => {
      const anchor = document.createElement("a");
      anchor.href = link;
      anchor.rel = "noopener noreferrer";
      anchor.target = "_blank";
      anchor.click();
    };

    clickTrack(
      { linkType, projectId },
      {
        onSuccess: () => {
          openLink();
        },
        onError: () => {
          openLink();
        },
      },
    );
  };
  return (
    <>
      <Hero />
      <SkillsSlider />
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

        {/* ================= LOADING STATE ================= */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl animate-pulse ${i == 3 ? "lg:hidden" : ""}`}
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

        {/* ================= PROJECTS GRID ================= */}
        {!isLoading &&
          !isError &&
          data?.projects &&
          data?.projects?.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {data?.projects.map((project, i) => (
                  <div
                    key={project._id.toString()}
                    className={`group relative p-4 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ${i == 3 ? "lg:hidden" : ""}`}
                  >
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

                      {/* Desktop: Hover Overlay (md and above) */}
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="hidden lg:flex absolute inset-0 z-20 items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <div className="flex flex-col items-center gap-2 text-white bg-white/10 py-2 px-3 rounded-2xl border border-white/20 shadow-2xl transform scale-90 group-hover:scale-100 transition-transform cursor-pointer">
                          <Eye size={16} className="drop-shadow-lg" />
                          <span className="text-sm font-semibold tracking-wide">
                            View Details
                          </span>
                        </div>
                      </button>

                      {/* Mobile: Always visible pill button at bottom (below md) */}
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="lg:hidden absolute bottom-1 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-white bg-black/40 backdrop-blur-md py-2 px-4 rounded-full border border-white/10 text-xs font-medium shadow-lg active:scale-95 transition-all cursor-pointer"
                      >
                        <Eye size={16} />
                        <span>View Details</span>
                      </button>

                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-3 right-3 z-30 px-3 py-1 rounded-full bg-linear-to-r from-yellow-500/90 to-orange-500/90 backdrop-blur-sm text-white text-xs font-medium shadow-lg">
                          ⭐ Featured
                        </div>
                      )}
                    </div>

                    {/* Project Content */}
                    <div>
                      {/* Project Title - Also clickable */}
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="w-full text-left mb-3"
                      >
                        <h3 className="text-xl font-bold text-white group-hover:bg-linear-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 cursor-pointer">
                          {project.title}
                        </h3>
                      </button>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies
                          ?.slice(0, 4)
                          .map((tech, index: number) => (
                            <span
                              key={index}
                              className={`px-2 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/5 ${tech.highlight || "text-white"}`}
                            >
                              {tech.name}
                            </span>
                          ))}
                        {project.technologies?.length > 4 && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-white/60">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Project Description */}
                      <p className="text-sm text-white/60 h-15 overflow-hidden mb-6 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {project.liveDemoLink && (
                          <button
                            disabled={clickTrackPending}
                            onClick={() =>
                              handleLinkClick({
                                link: project.liveDemoLink!,
                                linkType: "liveDemoLink",
                                projectId: project._id.toString(),
                              })
                            }
                            type="button"
                            className="flex-1 flex items-center whitespace-nowrap justify-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <LinkIcon className="w-4 h-4" />
                            <span className="hidden sm:inline whitespace-nowrap">
                              Live Demo
                            </span>
                            <span className="sm:hidden">Demo</span>
                          </button>
                        )}

                        {/* GitHub Links */}
                        {(project.githubFrontendLink ||
                          project.githubBackendLink ||
                          project.githubMobileLink) && (
                          <div className="flex gap-2">
                            {project.githubFrontendLink && (
                              <button
                                title="Frontend Repository"
                                disabled={clickTrackPending}
                                onClick={() =>
                                  handleLinkClick({
                                    link: project.githubFrontendLink!,
                                    linkType: "githubFrontendLink",
                                    projectId: project._id.toString(),
                                  })
                                }
                                type="button"
                                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                              >
                                <GitHub className="w-4 h-4" />
                                {!project.githubBackendLink &&
                                  !project.githubMobileLink && (
                                    <>
                                      <span className="hidden sm:inline">
                                        GitHub
                                      </span>
                                      <span className="sm:hidden">Code</span>
                                    </>
                                  )}
                              </button>
                            )}
                            {project.githubBackendLink && (
                              <button
                                title="Backend Repository"
                                disabled={clickTrackPending}
                                onClick={() =>
                                  handleLinkClick({
                                    link: project.githubBackendLink!,
                                    linkType: "githubBackendLink",
                                    projectId: project._id.toString(),
                                  })
                                }
                                type="button"
                                className="flex items-center justify-center px-3 sm:px-4 py-1.5 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                              >
                                <span className="text-base">⚙️</span>
                              </button>
                            )}
                            {project.githubMobileLink && (
                              <button
                                title="Mobile Repository"
                                disabled={clickTrackPending}
                                onClick={() =>
                                  handleLinkClick({
                                    link: project.githubMobileLink!,
                                    linkType: "githubMobileLink",
                                    projectId: project._id.toString(),
                                  })
                                }
                                type="button"
                                className="flex items-center justify-center px-3 sm:px-4 py-1.5 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                              >
                                <span className="text-base">📱</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <ProjectDetailModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                onLinkClick={handleLinkClick}
              />
            </>
          )}
      </main>
    </>
  );
}
