import Image from "next/image";
import GradientButton, { GradientButtonSoft } from "../(components)/Button";
import { GitHub, Instagram, LinkedIn, Twitter } from "../(components)/Svg";

export default function AboutPage() {
  const techStack = {
    frontend: [
      { name: "React.js", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "TypeScript", icon: "📘" },
      { name: "Tailwind CSS", icon: "🎨" },
      { name: "JavaScript", icon: "⚡" },
      { name: "HTML/CSS", icon: "🌐" },
    ],
    backend: [
      { name: "Node.js", icon: "🟢" },
      { name: "Express.js", icon: "🚂" },
      { name: "Next.js", icon: "▲" },
      { name: "MongoDB", icon: "🍃" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "REST APIs", icon: "🔌" },
    ],
    tools: [
      { name: "Git/GitHub", icon: "📦" },
      { name: "Docker", icon: "🐳" },
      { name: "VS Code", icon: "💻" },
      { name: "Figma", icon: "🎯" },
      { name: "Postman", icon: "📮" },
      { name: "Firebase", icon: "🔥" },
    ],
  };

  const experience = [
    {
      year: "2023 - Present",
      title: "Senior Full Stack Developer",
      company: "Tech Innovations Inc.",
      description:
        "Leading development of scalable web applications using React, Next.js, and Node.js. Mentoring junior developers and architecting solutions.",
      achievements: [
        "Built 5+ enterprise-level applications",
        "Reduced loading time by 40%",
        "Implemented CI/CD pipelines",
      ],
    },
    {
      year: "2021 - 2023",
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      description:
        "Developed and maintained multiple client projects, focusing on responsive design and performance optimization.",
      achievements: [
        "Delivered 15+ client projects",
        "Improved code quality by 30%",
        "Led team of 3 developers",
      ],
    },
    {
      year: "2019 - 2021",
      title: "Frontend Developer",
      company: "StartUp Ventures",
      description:
        "Created modern, user-friendly interfaces and collaborated with designers to bring concepts to life.",
      achievements: [
        "Redesigned company website",
        "Increased user engagement by 50%",
        "Implemented design systems",
      ],
    },
  ];

  const achievements = [
    {
      icon: "🏆",
      number: "50+",
      label: "Projects Completed",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: "👥",
      number: "30+",
      label: "Happy Clients",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: "⭐",
      number: "5",
      label: "Years Experience",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: "☕",
      number: "1000+",
      label: "Cups of Coffee",
      color: "from-orange-600 to-red-600",
    },
  ];

  return (
    <main className="mx-auto max-w-7xl p-4 py-12">
      {/* ================= HERO SECTION ================= */}
      <div className="mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image + Social Links */}
          <div className="flex flex-col items-center">
            {/* Image */}
            <div className="relative group w-full max-w-sm">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-3xl blur-2xl opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl p-2">
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src="/images/home/avatar/pra.webp"
                    alt="Prabhat"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-8 w-full max-w-sm">
              <h3 className="text-white/60 text-sm font-medium mb-4 text-center">
                Connect with me
              </h3>
              <div className="flex justify-center gap-3">
                {/* GitHub */}
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white/70 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/50 hover:text-purple-400 hover:scale-110"
                  aria-label="GitHub"
                >
                  <GitHub className="w-5 h-5" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white/70 transition-all duration-300 hover:bg-white/10 hover:border-blue-500/50 hover:text-blue-400 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <LinkedIn className="w-5 h-5" />
                </a>

                {/* Twitter */}
                <a
                  href="https://twitter.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white/70 transition-all duration-300 hover:bg-white/10 hover:border-sky-500/50 hover:text-sky-400 hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white/70 transition-all duration-300 hover:bg-white/10 hover:border-pink-500/50 hover:text-pink-400 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Intro */}
          <div>
            <GradientButtonSoft className="mb-6">
              👋 Hello, I{`'`}m
            </GradientButtonSoft>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Prabhat Kumar
            </h1>

            <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent mb-6">
              Full Stack Developer
            </h2>

            <p className="text-lg text-white/70 leading-relaxed mb-6">
              Passionate about creating elegant, high-performance web
              applications that solve real-world problems. With 5+ years of
              experience in both frontend and backend development, I specialize
              in building scalable solutions using modern technologies.
            </p>

            <p className="text-white/60 leading-relaxed mb-8">
              Based in New Delhi, India 🇮🇳 | Available for freelance projects
              and full-time opportunities.
            </p>

            <div className="flex flex-wrap gap-4">
              <GradientButton
                gradient="purple"
                size="md"
                className="rounded-full"
              >
                Download Resume 📄
              </GradientButton>
              <GradientButton variant="outline">View Projects →</GradientButton>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ACHIEVEMENTS STATS ================= */}
      <div className="mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div
                className={`text-5xl mb-3 inline-block bg-gradient-to-br ${item.color} bg-clip-text text-transparent`}
              >
                {item.icon}
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                {item.number}
              </h3>
              <p className="text-sm text-white/60">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= ABOUT ME SECTION ================= */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          About Me
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-12"></div>

        <div className="max-w-4xl mx-auto">
          <div className="p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              I{`'`}m a dedicated Full Stack Developer with a passion for
              transforming ideas into reality through code. My journey in web
              development started 5 years ago, and since then, I{`'`}ve been
              constantly learning and evolving with the ever-changing tech
              landscape.
            </p>

            <p className="text-lg text-white/80 leading-relaxed mb-6">
              I believe in writing clean, maintainable code and creating user
              experiences that are not just functional, but delightful. My
              approach combines technical expertise with creative
              problem-solving to deliver solutions that exceed expectations.
            </p>

            <p className="text-lg text-white/80 leading-relaxed">
              When I{`'`}m not coding, you{`'`}ll find me exploring new
              technologies, contributing to open-source projects, or sharing my
              knowledge through blog posts and mentoring. I{`'`}m always excited
              about new challenges and opportunities to grow.
            </p>
          </div>
        </div>
      </div>

      {/* ================= TECH STACK SECTION ================= */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          Tech Stack & Skills
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-12"></div>

        {/* Category Legend */}
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <span className="text-sm text-white/60">Frontend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
            <span className="text-sm text-white/60">Backend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
            <span className="text-sm text-white/60">Tools</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* All Technologies in One Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Frontend */}
            {techStack.frontend.map((tech, index) => (
              <div key={`frontend-${index}`} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm hover:border-purple-500/50 hover:bg-white/5 transition-all duration-300 text-center">
                  <div className="text-4xl mb-3">{tech.icon}</div>
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
            {techStack.backend.map((tech, index) => (
              <div key={`backend-${index}`} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm hover:border-green-500/50 hover:bg-white/5 transition-all duration-300 text-center">
                  <div className="text-4xl mb-3">{tech.icon}</div>
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
            {techStack.tools.map((tech, index) => (
              <div key={`tools-${index}`} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm hover:border-blue-500/50 hover:bg-white/5 transition-all duration-300 text-center">
                  <div className="text-4xl mb-3">{tech.icon}</div>
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
        <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-12"></div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="relative pl-8 md:pl-12 border-l-2 border-purple-500/30"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>

              <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl hover:bg-white/5 transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-purple-400 font-medium">{exp.company}</p>
                  </div>
                  <GradientButtonSoft>{exp.year}</GradientButtonSoft>
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
          ))}
        </div>
      </div>

      {/* ================= CTA SECTION ================= */}
      <div className="text-center">
        <div className="p-12 rounded-3xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 border border-purple-500/20">
          <h2 className="text-3xl font-bold text-white mb-4">
            Let{`'`}s Work Together!
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            I{`'`}m always excited to work on new projects and collaborate with
            amazing people. Let{`'`}s create something extraordinary together!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <GradientButton
              gradient="purple"
              size="md"
              className="rounded-full"
            >
              Get In Touch 💬
            </GradientButton>
            <GradientButton variant="outline">View My Work →</GradientButton>
          </div>
        </div>
      </div>
    </main>
  );
}
