"use client";

import React, { useState } from "react";

export default function HeroSection() {
  const [heroSection, setHeroSection] = useState({
    heroTitle: "Hi, I'm Prabhat Kumar",
    heroSubtitle: "Full Stack Developer",
    heroDescription:
      "I build beautiful and functional web applications using modern technologies.",
    heroImage: "",
    heroCtaPrimary: "View Projects",
    heroCtaPrimaryLink: "/projects",
    heroCtaSecondary: "Contact Me",
    heroCtaSecondaryLink: "/contact",
    heroBackgroundImage: "",
  });

   const [saveLoading, setSaveLoading] = useState(false);
    const handleSave = async () => {
      setSaveLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSaveLoading(false);
      alert("Settings saved successfully!");
    };
  
    const handleImageUpload = (section: string, field: string) => {
      // Handle image upload logic
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
          // Upload logic here
          console.log("Upload:", file.name);
          alert(`Image upload functionality for ${field}`);
        }
      };
      input.click();
    };
  

  return <div className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-2xl font-bold text-white mb-2">
                🎯 Hero Section
              </h2>
              <p className="text-white/60">
                Configure your homepage hero section
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Hero Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Main Title *
                </label>
                <input
                  type="text"
                  value={heroSection.heroTitle}
                  onChange={(e) =>
                    setHeroSection({
                      ...heroSection,
                      heroTitle: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:outline-none transition-colors"
                  placeholder="Hi, I'm Your Name"
                />
              </div>

              {/* Hero Subtitle */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Subtitle *
                </label>
                <input
                  type="text"
                  value={heroSection.heroSubtitle}
                  onChange={(e) =>
                    setHeroSection({
                      ...heroSection,
                      heroSubtitle: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:outline-none transition-colors"
                  placeholder="Full Stack Developer"
                />
              </div>

              {/* CTA Primary Text */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  value={heroSection.heroCtaPrimary}
                  onChange={(e) =>
                    setHeroSection({
                      ...heroSection,
                      heroCtaPrimary: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:outline-none transition-colors"
                  placeholder="View Projects"
                />
              </div>
            </div>

            {/* Hero Description */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Description
              </label>
              <textarea
                rows={3}
                value={heroSection.heroDescription}
                onChange={(e) =>
                  setHeroSection({
                    ...heroSection,
                    heroDescription: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:outline-none transition-colors resize-none"
                placeholder="Brief introduction about yourself"
              />
            </div>

            {/* CTA Links */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Primary Button Link
                </label>
                <input
                  type="text"
                  value={heroSection.heroCtaPrimaryLink}
                  onChange={(e) =>
                    setHeroSection({
                      ...heroSection,
                      heroCtaPrimaryLink: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:outline-none transition-colors"
                  placeholder="/projects"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Secondary Button Text
                </label>
                <input
                  type="text"
                  value={heroSection.heroCtaSecondary}
                  onChange={(e) =>
                    setHeroSection({
                      ...heroSection,
                      heroCtaSecondary: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:outline-none transition-colors"
                  placeholder="Contact Me"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Secondary Button Link
                </label>
                <input
                  type="text"
                  value={heroSection.heroCtaSecondaryLink}
                  onChange={(e) =>
                    setHeroSection({
                      ...heroSection,
                      heroCtaSecondaryLink: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:outline-none transition-colors"
                  placeholder="/contact"
                />
              </div>
            </div>

            {/* Hero Images */}
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Hero Images
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Profile/Hero Image
                  </label>
                  <div className="aspect-square rounded-2xl bg-linear-to-br from-purple-500/10 to-pink-500/10 border border-white/10 flex items-center justify-center mb-3">
                    <span className="text-6xl">👨‍💻</span>
                  </div>
                  <button
                    onClick={() => handleImageUpload("hero", "image")}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition-all text-sm"
                  >
                    Upload Hero Image
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Background Image (Optional)
                  </label>
                  <div className="aspect-square rounded-2xl bg-linear-to-br from-blue-500/10 to-cyan-500/10 border border-white/10 flex items-center justify-center mb-3">
                    <span className="text-6xl">🌌</span>
                  </div>
                  <button
                    onClick={() => handleImageUpload("hero", "background")}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition-all text-sm"
                  >
                    Upload Background
                  </button>
                </div>
              </div>
            </div>
          </div>;
}
