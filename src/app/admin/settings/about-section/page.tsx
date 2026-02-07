"use client";

import React, { useState } from 'react'

export default function AboutSecton() {
    const [aboutSection, setAboutSection] = useState({
    aboutTitle: "About Me",
    aboutDescription: "I'm a passionate developer who loves creating innovative solutions...",
    aboutImage: "",
    yearsOfExperience: "5",
    projectsCompleted: "50+",
    happyClients: "30+",
    awardsWon: "10+",
    skillsTitle: "My Skills",
    skillsDescription: "Technologies I work with",
    servicesTitle: "What I Do",
    servicesDescription: "Services I offer to clients",
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
  




  return (
    <div className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-2xl font-bold text-white mb-2">
                📝 About Section
              </h2>
              <p className="text-white/60">Configure your about page content</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* About Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Section Title
                </label>
                <input
                  type="text"
                  value={aboutSection.aboutTitle}
                  onChange={(e) =>
                    setAboutSection({
                      ...aboutSection,
                      aboutTitle: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:outline-none transition-colors"
                  placeholder="About Me"
                />
              </div>

              {/* About Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Description
                </label>
                <textarea
                  rows={5}
                  value={aboutSection.aboutDescription}
                  onChange={(e) =>
                    setAboutSection({
                      ...aboutSection,
                      aboutDescription: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:outline-none transition-colors resize-none"
                  placeholder="Tell your story..."
                />
              </div>
            </div>

            {/* Stats/Achievements */}
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Stats & Achievements
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Years Experience
                  </label>
                  <input
                    type="text"
                    value={aboutSection.yearsOfExperience}
                    onChange={(e) =>
                      setAboutSection({
                        ...aboutSection,
                        yearsOfExperience: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:outline-none transition-colors"
                    placeholder="5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Projects Done
                  </label>
                  <input
                    type="text"
                    value={aboutSection.projectsCompleted}
                    onChange={(e) =>
                      setAboutSection({
                        ...aboutSection,
                        projectsCompleted: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:outline-none transition-colors"
                    placeholder="50+"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Happy Clients
                  </label>
                  <input
                    type="text"
                    value={aboutSection.happyClients}
                    onChange={(e) =>
                      setAboutSection({
                        ...aboutSection,
                        happyClients: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:outline-none transition-colors"
                    placeholder="30+"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Awards Won
                  </label>
                  <input
                    type="text"
                    value={aboutSection.awardsWon}
                    onChange={(e) =>
                      setAboutSection({
                        ...aboutSection,
                        awardsWon: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:outline-none transition-colors"
                    placeholder="10+"
                  />
                </div>
              </div>
            </div>

            {/* Skills Section Settings */}
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Skills Section
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Skills Section Title
                  </label>
                  <input
                    type="text"
                    value={aboutSection.skillsTitle}
                    onChange={(e) =>
                      setAboutSection({
                        ...aboutSection,
                        skillsTitle: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:outline-none transition-colors"
                    placeholder="My Skills"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Skills Description
                  </label>
                  <input
                    type="text"
                    value={aboutSection.skillsDescription}
                    onChange={(e) =>
                      setAboutSection({
                        ...aboutSection,
                        skillsDescription: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:outline-none transition-colors"
                    placeholder="Technologies I work with"
                  />
                </div>
              </div>
            </div>

            {/* Services Section Settings */}
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Services Section
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Services Section Title
                  </label>
                  <input
                    type="text"
                    value={aboutSection.servicesTitle}
                    onChange={(e) =>
                      setAboutSection({
                        ...aboutSection,
                        servicesTitle: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:outline-none transition-colors"
                    placeholder="What I Do"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Services Description
                  </label>
                  <input
                    type="text"
                    value={aboutSection.servicesDescription}
                    onChange={(e) =>
                      setAboutSection({
                        ...aboutSection,
                        servicesDescription: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:outline-none transition-colors"
                    placeholder="Services I offer to clients"
                  />
                </div>
              </div>
            </div>

            {/* About Image */}
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                About Image
              </h3>
              <div className="max-w-md">
                <div className="aspect-square rounded-2xl bg-linear-to-br from-purple-500/10 to-pink-500/10 border border-white/10 flex items-center justify-center mb-3">
                  <span className="text-8xl">🧑‍💼</span>
                </div>
                <button
                  onClick={() => handleImageUpload("about", "image")}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition-all text-sm"
                >
                  Upload About Image
                </button>
              </div>
            </div>
          </div>
  )
}
