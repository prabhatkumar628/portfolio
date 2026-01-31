import React from "react";
import GradientButton from "./Button";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black/40 backdrop-blur-xl border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {/* Animated Avatar with Glow */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full blur-md group-hover:blur-lg transition-all duration-300 animate-pulse"></div>
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 p-[3px]">
                  <div className="relative h-full w-full overflow-hidden rounded-full bg-black">
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

              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Prabhat
                </h3>
                <p className="text-white/60 text-sm">Full Stack Developer</p>
              </div>
            </div>

            <p className="text-white/70 text-sm leading-relaxed max-w-md">
              Crafting digital experiences that inspire and innovate.
              Transforming ideas into elegant, high-performance web solutions.
              🚀
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={"/"}
                  className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                  About
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Connect on Social Media */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">
              Connect on Social Media
            </h3>
            <p className="text-sm text-white/60 mb-4">
              Follow me on social platforms for updates and tech content!
            </p>

            {/* Social Links Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* GitHub */}
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">
                  🐙
                </span>
                <span className="text-sm text-white/80">GitHub</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">
                  💼
                </span>
                <span className="text-sm text-white/80">LinkedIn</span>
              </a>

              {/* Twitter */}
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300 group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">
                  🐦
                </span>
                <span className="text-sm text-white/80">Twitter</span>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-pink-500/50 transition-all duration-300 group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">
                  📷
                </span>
                <span className="text-sm text-white/80">Instagram</span>
              </a>

              {/* YouTube (Optional) */}
              <a
                href="https://youtube.com/@yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-red-500/50 transition-all duration-300 group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">
                  📺
                </span>
                <span className="text-sm text-white/80">YouTube</span>
              </a>

              {/* Discord (Optional) */}
              <a
                href="https://discord.gg/yourinvite"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/50 transition-all duration-300 group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">
                  💬
                </span>
                <span className="text-sm text-white/80">Discord</span>
              </a>
            </div>

            {/* Email Subscribe (Optional) */}
            <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <p className="text-xs text-white/60 mb-2">📧 Newsletter</p>
              <a
                href="mailto:prabhat.dev@gmail.com"
                className="text-sm text-white hover:text-purple-400 transition-colors"
              >
                prabhat.dev@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Gradient Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left: Copyright */}
          <div className="text-center md:text-left">
            <p className="text-white/50 text-sm">
              © {currentYear}{" "}
              <span className="text-white font-semibold">Prabhat</span>. All
              rights reserved.
            </p>
            <p className="text-white/30 text-xs mt-1">
              Made with <span className="text-red-400 animate-pulse">❤️</span>{" "}
              using Next.js & Tailwind CSS
            </p>
          </div>

          {/* Center: Badges */}
          <div className="flex gap-3">
            <div className="px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-xs text-white/70">Available for work</span>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center gap-1">
              <span className="text-xs">⚡</span>
              <span className="text-xs text-white/70">Quick response</span>
            </div>
          </div>

          {/* Right: Hire Me Button */}
          <div className="relative group">
            {/* <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md group-hover:blur-lg transition-all opacity-50"></div> */}
            <GradientButton
              gradient="purple"
              size="md"
              className="relative rounded-full"
            >
              Let's Work Together 🚀
            </GradientButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
