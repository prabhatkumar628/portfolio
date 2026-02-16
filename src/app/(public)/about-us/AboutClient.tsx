"use client";
import Image from "next/image";
import GradientButton, { GradientButtonSoft } from "../(components)/Button";
import {
  useExperience,
  useSettings,
  useSkills,
} from "../../../hooks/usePublic";
import { IExperience } from "../../../models/experience.model";
import Link from "next/link";
import SocialLinks from "../(components)/SocialLinks";
// import { getCloudinaryDownloadUrl } from "../../../lib/upload/cloudinary";

export default function AboutClient() {
  const { data: skillData } = useSkills();
  const { data: experienceData } = useExperience();
  const { data: settingsData } = useSettings();

  // let downloadUrl;
  // if (settingsData) {
  //   downloadUrl = settingsData.resume.url.replace(
  //     "/upload/",
  //     "/upload/fl_attachment/",
  //   );
  // }

  const downloadUrl = settingsData?.resume?.url
  ? getCloudinaryDownloadUrl(settingsData.resume.url)
  : null;

  // lib/cloudinary.ts
   function getCloudinaryDownloadUrl(url: string): string {
    if (!url) return "";

    const parts = url.split("/upload/");
    if (parts.length !== 2) return url;

    // Add fl_attachment to force download
    return `${parts[0]}/upload/fl_attachment/${parts[1]}`;
  }

  return (
    <main className="mx-auto max-w-7xl p-4 py-12">
      {/* ================= HERO SECTION ================= */}
      <div className="mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image + Social Links */}
          <div className="flex flex-col items-center">
            {/* Image */}
            <div className="relative group w-full max-w-sm">
              <div className="absolute -inset-1 bg-linear-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-3xl blur-2xl opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl p-2">
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  {settingsData?.heroImage.url && (
                    <Image
                      src={settingsData.heroImage.url}
                      alt="Prabhat"
                      fill
                      className="object-cover"
                      priority
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-8 w-full max-w-sm">
              <h3 className="text-white/60 text-sm font-medium mb-4 text-center">
                Connect with me
              </h3>
              <div className=" flex justify-center items-center">
                <SocialLinks className="rounded-xl" />
              </div>
            </div>
          </div>

          {/* Right: Intro */}
          <div>
            <GradientButtonSoft className="mb-6">
              👋 Hello, I{`'`}m
            </GradientButtonSoft>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {settingsData?.fullName && <>{settingsData.fullName}</>}
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold bg-linear-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent mb-6">
              {settingsData?.aboutTitle && <>{settingsData.aboutTitle}</>}
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-6">
              {settingsData?.aboutDescription && (
                <>{settingsData.aboutDescription}</>
              )}
            </p>
            <p className="text-white/60 leading-relaxed mb-8">
              {settingsData?.aboutSubTitle && <>{settingsData.aboutSubTitle}</>}
            </p>
            <div className="flex flex-wrap gap-4">
              {settingsData?.resume && downloadUrl && (
                <a href={downloadUrl} target="_blank">
                  <GradientButton
                    gradient="purple"
                    size="md"
                    className="rounded-full"
                  >
                    Download Resume
                  </GradientButton>
                </a>
              )}

              <Link href={"/projects"}>
                <GradientButton variant="outline">View Projects</GradientButton>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ABOUT ME SECTION ================= */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          About Me
        </h2>
        <div className="h-1 w-20 bg-linear-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-12"></div>

        <div className="max-w-4xl mx-auto">
          <div className="p-8 rounded-3xl space-y-6 border border-white/10 bg-black/40 backdrop-blur-xl">
            {settingsData?.aboutMe &&
              settingsData.aboutMe.map((item, index) => (
                <p
                  key={index}
                  className="text-lg text-white/80 leading-relaxed"
                >
                  {item}
                </p>
              ))}
          </div>
        </div>
      </div>

      {/* ================= TECH STACK SECTION ================= */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          Tech Stack & Skills
        </h2>
        <div className="h-1 w-20 bg-linear-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-12"></div>

        {/* Category Legend */}
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-linear-to-r from-purple-500 to-pink-500"></div>
            <span className="text-sm text-white/60">Frontend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-linear-to-r from-green-500 to-emerald-500"></div>
            <span className="text-sm text-white/60">Backend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-linear-to-r from-blue-500 to-cyan-500"></div>
            <span className="text-sm text-white/60">Tools</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* All Technologies in One Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Frontend */}
            {skillData?.frontendData &&
              skillData?.frontendData?.map((tech, index) => (
                <div key={`frontend-${index}`} className="group relative">
                  <div className="absolute inset-0 bg-linear-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm hover:border-purple-500/50 hover:bg-white/5 transition-all duration-300 text-center">
                    <div className="text-4xl mb-3">{tech.emoji}</div>
                    <h3 className="text-sm font-medium text-white/90">
                      {tech.name}
                    </h3>
                    <span className="text-xs text-purple-400/60 mt-1 block">
                      Frontend
                    </span>
                  </div>
                </div>
              ))}

            {/* Backend */}
            {skillData?.backendData &&
              skillData.backendData.map((tech, index) => (
                <div key={`backend-${index}`} className="group relative">
                  <div className="absolute inset-0 bg-linear-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm hover:border-green-500/50 hover:bg-white/5 transition-all duration-300 text-center">
                    <div className="text-4xl mb-3">{tech.emoji}</div>
                    <h3 className="text-sm font-medium text-white/90">
                      {tech.name}
                    </h3>
                    <span className="text-xs text-green-400/60 mt-1 block">
                      Backend
                    </span>
                  </div>
                </div>
              ))}

            {/* Tools */}
            {skillData?.toolsData &&
              skillData.toolsData.map((tech, index) => (
                <div key={`tools-${index}`} className="group relative">
                  <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm hover:border-blue-500/50 hover:bg-white/5 transition-all duration-300 text-center">
                    <div className="text-4xl mb-3">{tech.emoji}</div>
                    <h3 className="text-sm font-medium text-white/90">
                      {tech.name}
                    </h3>
                    <span className="text-xs text-blue-400/60 mt-1 block">
                      Tools
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* ================= EXPERIENCE TIMELINE ================= */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          Professional Experience
        </h2>
        <div className="h-1 w-20 bg-linear-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-12"></div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experienceData &&
            experienceData.map((exp: IExperience, index) => {
              const formatMonthYear = (date: string | Date) => {
                const d = new Date(date);
                return d.toLocaleString("en-US", {
                  month: "short", // March → Mar | change to "long" if needed
                  year: "numeric",
                });
              };

              return (
                <div
                  key={index}
                  className="relative pl-8 md:pl-12 border-l-2 border-purple-500/30"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-linear-to-r from-purple-500 to-pink-500"></div>

                  <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl hover:bg-white/5 transition-all duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {exp.position}
                        </h3>
                        <p className="text-purple-400 font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <GradientButtonSoft>
                        {formatMonthYear(exp.startDate)} -{" "}
                        {exp.isCurrent
                          ? "Current"
                          : exp.endDate
                            ? formatMonthYear(exp.endDate)
                            : ""}
                      </GradientButtonSoft>
                    </div>

                    <p className="text-white/70 mb-4">{exp.description}</p>

                    <div className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span className="text-sm text-white/60">
                            {achievement}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* ================= CTA SECTION ================= */}
      <div className="text-center">
        <div className="p-12 rounded-3xl bg-linear-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 border border-purple-500/20">
          <h2 className="text-3xl font-bold text-white mb-4">
            Let{`'`}s Work Together!
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            I{`'`}m always excited to work on new projects and collaborate with
            amazing people. Let{`'`}s create something extraordinary together!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={"/contact-us"}>
              <GradientButton
                gradient="purple"
                size="md"
                className="rounded-full"
              >
                Get In Touch
              </GradientButton>
            </Link>
            <Link href={"/projects"}>
              <GradientButton variant="outline">View My Work</GradientButton>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

