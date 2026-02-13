"use client";
import { ArrowRight } from "lucide-react";
import GradientButton from "./(components)/Button";
import Hero from "./(components)/Hero";
import Link from "next/link";
import Image from "next/image";
import { GitHub, LinkIcon } from "./(components)/Svg";
import SkillsSlider from "./(components)/SkillsSlider";
import { useGetPublicProjects } from "../../hooks/usePublicProjects";
import { LinkType, useClickTrack } from "../../hooks/useClickTrack";
// import SkillsSlider3D from "./(components)/SkillsSlider";

export default function Home() {
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {data?.projects.map((project, i) => (
                <div
                  key={project._id.toString()}
                  className={`group relative p-4 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ${i == 3 ? "lg:hidden" : ""}`}
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
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                        >
                          <LinkIcon className="w-4 h-4" />
                          Live Demo
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
                              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300"
                            >
                              <GitHub className="w-4 h-4" />
                              {!project.githubBackendLink &&
                                !project.githubMobileLink &&
                                "GitHub"}
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
                              className="flex items-center justify-center px-4 py-2.5 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300"
                            >
                              <span className="text-xs">⚙️</span>
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
                              className="flex items-center justify-center px-4 py-2.5 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300"
                            >
                              <span className="text-xs">📱</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
      </main>
    </>
  );
}
