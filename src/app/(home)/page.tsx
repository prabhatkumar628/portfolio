import React from "react";
import Hero from "./(components)/Hero";
import GradientButton from "./(components)/Button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <footer className="mt-12 w-full bg-black/40 backdrop-blur-xl border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left: Logo + Name */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 p-[2px]">
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
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-white">
              Prabhat
            </span>
            <span className="text-sm text-white/60">
              Web Developer & Portfolio
            </span>
          </div>
        </div>

        {/* Center: Quick Links */}
        <div className="flex flex-wrap gap-6 text-white/70 text-sm justify-center">
          <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
          <a href="https://github.com/username" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            GitHub
          </a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
        </div>

        {/* Right: CTA */}
        <div>
          <GradientButton gradient="purple" size="sm">
            Hire Me
          </GradientButton>
        </div>

      </div>

      {/* Bottom copyright */}
      <div className="mt-6 text-center text-white/50 text-xs">
        © {new Date().getFullYear()} Prabhat. All rights reserved.
      </div>
    </footer>


























































    
     <footer className="relative w-full overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-indigo-900/20">
        {/* Floating Orbs */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Glass Border Top */}
      <div className="relative border-t border-white/10 backdrop-blur-xl">
        
        <div className="mx-auto max-w-7xl px-6 py-16">
          
          {/* Top Section: Newsletter + Brand */}
          <div className="relative mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              
              {/* Left: Brand Showcase */}
              <div className="space-y-6">
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
                  Transforming ideas into elegant, high-performance web solutions. 🚀
                </p>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
                    <div className="relative p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                      <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">50+</p>
                      <p className="text-xs text-white/60">Projects</p>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-indigo-500/20 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
                    <div className="relative p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                      <p className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent">3+</p>
                      <p className="text-xs text-white/60">Years</p>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
                    <div className="relative p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                      <p className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">30+</p>
                      <p className="text-xs text-white/60">Clients</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Newsletter Signup */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 rounded-3xl blur-xl"></div>
                <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">✉️</span>
                    <h3 className="text-xl font-bold text-white">Stay Connected</h3>
                  </div>
                  <p className="text-white/60 text-sm mb-4">
                    Get updates on new projects, blog posts, and tech insights!
                  </p>
                  
                  {/* Newsletter Form */}
                  <div className="flex gap-2">
                    <div className="flex-1 group">
                      <div className="rounded-full p-[2px] bg-white/10 group-focus-within:bg-gradient-to-r group-focus-within:from-purple-500 group-focus-within:via-pink-500 group-focus-within:to-indigo-500 transition-all duration-300">
                        <input
                          type="email"
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-full bg-black/70 text-white text-sm outline-none placeholder:text-white/40"
                        />
                      </div>
                    </div>
                    <GradientButton gradient="purple" size="sm" className="rounded-full px-6">
                      Subscribe
                    </GradientButton>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Middle Section: Links + Social */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            
            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-purple-400">⚡</span>
                Quick Links
              </h4>
              <ul className="space-y-2">
                {[
                  { name: 'Home', href: '/', icon: '🏠' },
                  { name: 'About', href: '#about', icon: '👨‍💻' },
                  { name: 'Portfolio', href: '#portfolio', icon: '💼' },
                  { name: 'Services', href: '#services', icon: '🛠️' },
                  { name: 'Contact', href: '#contact', icon: '📧' },
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-2 text-white/60 hover:text-white text-sm transition-all"
                    >
                      <span className="group-hover:scale-110 transition-transform">{link.icon}</span>
                      <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-pink-400">💡</span>
                Services
              </h4>
              <ul className="space-y-2">
                {[
                  'Web Development',
                  'UI/UX Design',
                  'API Integration',
                  'Consulting',
                  'Maintenance',
                ].map((service) => (
                  <li key={service}>
                    <a
                      href="#services"
                      className="group flex items-center gap-2 text-white/60 hover:text-white text-sm transition-all"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-150 transition-transform"></span>
                      <span className="group-hover:translate-x-1 transition-transform">{service}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-indigo-400">📚</span>
                Resources
              </h4>
              <ul className="space-y-2">
                {[
                  'Blog',
                  'Case Studies',
                  'Documentation',
                  'Privacy Policy',
                  'Terms of Service',
                ].map((resource) => (
                  <li key={resource}>
                    <a
                      href="#"
                      className="group flex items-center gap-2 text-white/60 hover:text-white text-sm transition-all"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 group-hover:scale-150 transition-transform"></span>
                      <span className="group-hover:translate-x-1 transition-transform">{resource}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media - Ultra Modern */}
            <div>
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-purple-400">🌐</span>
                Connect With Me
              </h4>
              <p className="text-white/60 text-xs mb-4">
                Let's connect and grow together!
              </p>
              
              {/* Social Grid */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { icon: '🐙', name: 'GitHub', color: 'from-purple-500 to-pink-500', href: 'https://github.com' },
                  { icon: '💼', name: 'LinkedIn', color: 'from-blue-500 to-cyan-500', href: 'https://linkedin.com' },
                  { icon: '🐦', name: 'Twitter', color: 'from-sky-500 to-blue-500', href: 'https://twitter.com' },
                  { icon: '📷', name: 'Instagram', color: 'from-pink-500 to-rose-500', href: 'https://instagram.com' },
                  { icon: '📺', name: 'YouTube', color: 'from-red-500 to-pink-500', href: 'https://youtube.com' },
                  { icon: '💬', name: 'Discord', color: 'from-indigo-500 to-purple-500', href: 'https://discord.com' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    title={social.name}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${social.color} rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    <div className="relative p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                      <span className="text-2xl group-hover:scale-110 transition-transform">{social.icon}</span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Direct Contact */}
              <a
                href="mailto:prabhat.dev@gmail.com"
                className="group relative block"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-sm group-hover:blur-md transition-all"></div>
                <div className="relative px-3 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                  <span className="text-lg">📧</span>
                  <span className="text-xs text-white/80 truncate">prabhat.dev@gmail.com</span>
                </div>
              </a>
            </div>

          </div>

          {/* Bottom Section: Copyright + CTA */}
          <div className="relative">
            {/* Gradient Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              
              {/* Left: Copyright */}
              <div className="text-center md:text-left">
                {/* <p className="text-white/50 text-sm">
                  © {currentYear} <span className="text-white font-semibold">Prabhat</span>. All rights reserved.
                </p> */}
                <p className="text-white/30 text-xs mt-1">
                  Made with <span className="text-red-400 animate-pulse">❤️</span> using Next.js & Tailwind CSS
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
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md group-hover:blur-lg transition-all opacity-50"></div>
                <GradientButton gradient="purple" size="md" className="relative rounded-full">
                  Let's Work Together 🚀
                </GradientButton>
              </div>

            </div>
          </div>

        </div>

        {/* Decorative Bottom Border */}
        <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"></div>
      </div>
    </footer>
    </>
  );
}
