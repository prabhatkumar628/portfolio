import React from "react";
import GradientButton from "../(components)/Button";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl p-4 py-12">
      {/* ================= PAGE HEADER ================= */}
      <div className="mb-16 text-center">
        <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl mb-4">
        Let's{" "}
        <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Connect 🤝
        </span>
      </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Have a project in mind or just want to chat? I'd love to hear from
          you. Drop me a message and I'll get back to you as soon as possible!
        </p>
      </div>

     

      <div className="grid gap-20 md:grid-cols-2 items-start">
        {/* ================= LEFT SIDE : CONTACT INFO ================= */}
        <div className="space-y-6 order-2 md:order-1">
          {/* Section Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Contact Information
            </h2>
            <p className="text-white/60">
              Multiple ways to reach me. Choose what works best for you!
            </p>
          </div>

          {/* Email */}
          <div className="group rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-5 shadow-lg hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="text-3xl">📧</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Email</h3>
                <p className="mt-1 text-sm text-white/60">
                  Feel free to mail me anytime
                </p>
                <a
                  href="mailto:prabhat.dev@gmail.com"
                  className="mt-2 text-white hover:text-purple-400 transition-colors inline-block"
                >
                  prabhat.dev@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="group rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-5 shadow-lg hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="text-3xl">📞</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Phone</h3>
                <p className="mt-1 text-sm text-white/60">
                  Available for quick calls
                </p>
                <a
                  href="tel:+919XXXXXXXXX"
                  className="mt-2 text-white hover:text-purple-400 transition-colors inline-block"
                >
                  +91 9XXXXXXXXX
                </a>
              </div>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="group rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-5 shadow-lg hover:border-green-500/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="text-3xl">💬</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">WhatsApp</h3>
                <p className="mt-1 text-sm text-white/60">
                  Fastest way to reach me
                </p>
                <a
                  href="https://wa.me/919XXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-white hover:text-green-400 transition-colors inline-block"
                >
                  +91 9XXXXXXXXX
                </a>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="group rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-5 shadow-lg hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="text-3xl">📍</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Location</h3>
                <p className="mt-1 text-sm text-white/60">Based in India</p>
                <p className="mt-2 text-white">New Delhi, India 🇮🇳</p>
              </div>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4">
              Connect on Social Media
            </h3>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
              >
                <span>🐙</span>
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300"
              >
                <span>💼</span>
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300"
              >
                <span>🐦</span>
                <span className="text-sm">Twitter</span>
              </a>
              <a
                href="https://instagram.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-pink-500/50 transition-all duration-300"
              >
                <span>📷</span>
                <span className="text-sm">Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick Response Time Badge */}
          <div className="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <span className="text-2xl">⚡</span>
            <div>
              <p className="text-sm font-semibold text-white">Quick Response</p>
              <p className="text-xs text-white/60">
                Usually replies within 24 hours
              </p>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE : FORM (SAME AS BEFORE) ================= */}
        <div className="order-1 md:order-2">

          <div className="relative w-full rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl p-6 shadow-2xl">
            <div className="relative space-y-5">
              {/* Header */}
              <h3 className="text-2xl font-semibold text-white">
                Send a Message
              </h3>
              <p className="text-sm text-white/60">
                Fill out the form below and I'll get back to you shortly
              </p>

              {/* Name */}
              <div className="group">
                <label className="text-sm text-white/70">Name</label>
                <div
                  className="
                    mt-1 rounded-full p-[2px]
                    bg-white/10
                    transition-all duration-300
                    group-focus-within:bg-gradient-to-r
                    group-focus-within:from-purple-500
                    group-focus-within:via-pink-500
                    group-focus-within:to-indigo-500
                  "
                >
                  <div className="rounded-full bg-black/70 px-4 py-3">
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full bg-transparent text-white outline-none placeholder:text-white/40"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="group">
                <label className="text-sm text-white/70">Email</label>
                <div
                  className="
                    mt-1 rounded-full p-[2px]
                    bg-white/10
                    transition-all duration-300
                    group-focus-within:bg-gradient-to-r
                    group-focus-within:from-purple-500
                    group-focus-within:via-pink-500
                    group-focus-within:to-indigo-500
                  "
                >
                  <div className="rounded-full bg-black/70 px-4 py-3">
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full bg-transparent text-white outline-none placeholder:text-white/40"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="group">
                <label className="text-sm text-white/70">Message</label>
                <div
                  className="
                    mt-1 rounded-2xl p-[2px]
                    bg-white/10
                    transition-all duration-300
                    group-focus-within:bg-gradient-to-r
                    group-focus-within:from-purple-500
                    group-focus-within:via-pink-500
                    group-focus-within:to-indigo-500
                  "
                >
                  <div className="rounded-2xl bg-black/70 px-4 py-3">
                    <textarea
                      rows={4}
                      placeholder="Write your message..."
                      className="w-full resize-none bg-transparent text-white outline-none placeholder:text-white/40"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <GradientButton
                gradient="purple"
                size="md"
                className="w-full rounded-full"
              >
                Send Message ✉️
              </GradientButton>

              {/* Privacy Note */}
              <p className="text-xs text-white/40 text-center mt-4">
                Your information is safe and will never be shared with third
                parties.
              </p>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
