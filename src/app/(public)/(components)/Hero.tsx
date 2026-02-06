"use client";
import React from "react";
import GradientButton from "./Button";
import Image from "next/image";
import Link from "next/link";
import { useSettings } from "../../../hooks/usePublic";

export default function Hero() {
  const { data: settingsData } = useSettings();
  return (
    <section className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      {/* ========== CONTENT WRAPPER ========== */}
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-5xl mx-auto">
        {/* ========== MAIN HEADLINE ========== */}
        <div className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-widest text-white/60">
            Trust me,
          </p>
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
            <span className="block text-white/90 mb-2">I{`'`}m a</span>
            <span className="block bg-linear-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent animate-gradient bg-size-[200%_auto]">
              {settingsData && <>{settingsData.heroTitle}</>}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 max-w-2xl">
            {settingsData && <>{settingsData.heroSubtitle}</>}
          </p>
        </div>

        {/* ========== ENHANCED GLOWING AVATAR ========== */}
        <div className="relative mt-8 flex justify-center items-center">
          {/* Layer 1,2,3: Outer Most Glow */}
          <div className="absolute -inset-10 bg-linear-to-r from-purple-500/30 via-pink-500/30 to-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -inset-6 bg-linear-to-r from-purple-500/50 via-pink-500/50 to-indigo-500/50 rounded-full blur-2xl animate-pulse [animation-delay:75ms]"></div>
          <div className="absolute -inset-3 bg-linear-to-r from-purple-500/70 via-pink-500/70 to-indigo-500/70 rounded-full blur-xl animate-pulse [animation-delay:150ms]"></div>

          {/* Rotating Rings */}
          <div className="absolute h-60 w-60 md:h-72 md:w-72 rounded-full border-2 border-dashed border-purple-500/30 animate-spin-slow"></div>
          <div className="absolute h-64 w-64 md:h-80 md:w-80 rounded-full border border-pink-500/20 animate-reverse-spin"></div>

          {/* Main Avatar Container */}
          <div className="relative group">
            {/* Gradient Border */}
            <div className="relative flex h-48 w-48 md:h-56 md:w-56 items-center justify-center rounded-full bg-linear-to-r from-purple-500 via-pink-500 to-indigo-500 p-1 transition-all duration-300">
              {/* Black Background with Image */}
              <div className="relative h-full w-full overflow-hidden rounded-full bg-black ring-2 ring-white/10 group-hover:ring-white/20 transition-all">
                {settingsData && (
                  <Image
                    src={settingsData.heroImage}
                    alt="Prabhat"
                    fill
                    className="object-cover rounded-full group-hover:scale-110 transition-transform duration-700"
                    priority
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ========== DESCRIPTION ========== */}
        <div className="max-w-2xl text-center space-y-4 mt-6">
          <p className="text-base md:text-lg text-white/70 leading-relaxed">
            {settingsData &&
              settingsData.heroDescription.map((item, index) =>
                item.highlight ? (
                  <span
                    key={index}
                    className={`font-semibold ${
                      item.highlight === "purple"
                        ? "text-purple-400"
                        : item.highlight === "pink"
                          ? "text-pink-400"
                          : item.highlight === "indigo"
                            ? "text-indigo-400"
                            : ""
                    }`}
                  >
                    {item.text}
                  </span>
                ) : (
                  <span key={index}>{item.text}</span>
                ),
              )}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {settingsData &&
              settingsData.heroSkills.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/80 hover:bg-white/10 hover:border-purple-500/30 transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
          </div>
        </div>

        {/* ========== CTA BUTTONS ========== */}
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          {settingsData && (
            <Link href={settingsData.heroCTA.primary.link}>
              <GradientButton gradient="purple" className="relative">
                <span className="flex items-center gap-2">
                  {settingsData.heroCTA.primary.text}
                </span>
              </GradientButton>
            </Link>
          )}
          {settingsData && (
            <Link href={settingsData.heroCTA.secondary.link}>
              <GradientButton variant="gray" className="group">
                <span className="flex items-center gap-2">
                  {settingsData.heroCTA.secondary.text}
                </span>
              </GradientButton>
            </Link>
          )}
        </div>

        {/* ========== SOCIAL PROOF / STATS ========== */}
        <div className="grid grid-cols-3 gap-6 md:gap-12 pt-8 w-full max-w-2xl">
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
            <div className="relative text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
              <p className="text-3xl md:text-4xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {settingsData && <>{settingsData.projects}+</>}
              </p>
              <p className="text-xs md:text-sm text-white/60 mt-1">Projects</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-pink-500/10 to-indigo-500/10 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
            <div className="relative text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
              <p className="text-3xl md:text-4xl font-bold bg-linear-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent">
                {settingsData && <>{settingsData.year_exp}+</>}
              </p>
              <p className="text-xs md:text-sm text-white/60 mt-1">Years Exp</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-indigo-500/10 to-purple-500/10 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
            <div className="relative text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
              <p className="text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {settingsData && <>{settingsData.client}+</>}
              </p>
              <p className="text-xs md:text-sm text-white/60 mt-1">Clients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
