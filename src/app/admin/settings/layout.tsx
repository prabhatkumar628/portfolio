"use client";

import React, { ReactNode, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SiteSettings from "./site-settings/page";
import PersonalDetails from "./personal-details/page";
import HeroSection from "./hero-section/page";
import AboutSecton from "./about-section/page";

export default function SettingsPage({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const sections = [
    {
      id: "site",
      name: "Site Settings",
      path: "/admin/settings/site-settings",
      icon: "🌐",
      description: "Basic site configuration",
    },
    {
      id: "personal",
      name: "Personal Details",
      path: "/admin/settings/personal-details",
      icon: "👤",
      description: "Your personal information",
    },
    {
      id: "hero",
      name: "Hero Section",
      path: "/admin/settings/hero-section",
      icon: "🎯",
      description: "Homepage hero settings",
    },
    {
      id: "about",
      name: "About Section",
      path: "/admin/settings/about-section",
      icon: "📝",
      description: "About page configuration",
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-white/60">
          Manage your portfolio settings and configurations
        </p>
      </div>

      {/* Section Navigation */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {sections.map((section) => (
          <Link
            href={section.path}
            key={section.id}
            className={`p-4 rounded-2xl border transition-all text-left ${
              pathname === section.path
                ? "bg-linear-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 shadow-lg shadow-purple-500/20"
                : "bg-black/40 border-white/10 hover:border-white/20 hover:bg-white/5"
            } backdrop-blur-xl`}
          >
            <button>
              <div className="text-3xl mb-2">{section.icon}</div>
              <h3
                className={`font-semibold mb-1 ${
                  pathname === section.path ? "text-white" : "text-white/80"
                }`}
              >
                {section.name}
              </h3>
              <p className="text-xs text-white/50">{section.description}</p>
            </button>
          </Link>
        ))}
      </div>

      {/* Settings Form */}
      <div className="p-4 sm:p-6 lg:p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
        {children}
      </div>
    </div>
  );
}
