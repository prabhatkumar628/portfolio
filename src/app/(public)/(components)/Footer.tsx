"use client";
import React from "react";
import Image from "next/image";

import { useSettings } from "../../../hooks/usePublic";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { data: settingsData } = useSettings();

  return (
    <footer className="w-full bg-black/40 backdrop-blur-xl border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative group">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-r from-purple-500 to-indigo-500 p-1">
                  <div className="relative h-full w-full overflow-hidden rounded-full bg-black">
                    {settingsData && (
                      <Image
                        src={settingsData.siteLogo.url}
                        alt="Prabhat"
                        fill
                        className="object-cover"
                        priority
                      />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold bg-linear-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Prabhat
                </h3>
                <p className="text-white/60 text-sm">Full Stack Developer</p>
              </div>
            </div>

            <p className="text-white/70 text-sm leading-relaxed max-w-md">
              {settingsData && <>{settingsData.maintenanceMessage}</>}
            </p>

            {/* Status Badges */}
            <div className="flex gap-3 mt-6">
              {settingsData?.isAvailableForHire && (
                <div className="px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  <span className="text-xs text-white/70">
                    Available for work
                  </span>
                </div>
              )}
              <div className="px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center gap-1">
                <span className="text-xs">⚡</span>
                <span className="text-xs text-white/70">Quick response</span>
              </div>
            </div>
          </div>

          {/* Column 2: Connect */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">
              Let{"'"}s Connect
            </h3>
            <p className="text-sm text-white/60 mb-6">
              Follow me on social platforms for updates and tech content!
            </p>

            {/* Minimal Social Links */}
            <div className="mb-3">
              <SocialLinks className="rounded-full hover:scale-110" />
            </div>

            {/* Email Contact */}
            {settingsData?.email && (
              <a
                href={`mailto:${settingsData.email}`}
                className="p-4 rounded-xl bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 flex items-center gap-2 hover:border-purple-400/40 transition-colors"
              >
                <span className="text-lg">📧</span>
                <span className="text-xs text-white/80 truncate">
                  {settingsData.email}
                </span>
              </a>
            )}
          </div>
        </div>

        {/* Gradient Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-white/20 to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {currentYear}{" "}
            <span className="text-white font-semibold">
              {settingsData && <>{settingsData.siteName}</>}
            </span>
            . All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Made with <span className="text-red-400 animate-pulse">❤️</span>{" "}
            using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
