import React from "react";
import GradientButton from "../(components)/Button";
import {
  ArrowLeft,
  Email,
  Location,
  Phone,
  WhatsApp,
} from "../(components)/Svg";

export default function ContactPage() {
  const contactMethods = [
    {
      icon: <Email className="h-6 w-6" />,
      label: "Email",
      value: "prabhat.dev@gmail.com",
      href: "mailto:prabhat.dev@gmail.com",
      color: "from-purple-500 to-pink-500",
      hoverColor: "hover:text-purple-400",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      label: "Phone",
      value: "+91 9XXXXXXXXX",
      href: "tel:+919XXXXXXXXX",
      color: "from-blue-500 to-cyan-500",
      hoverColor: "hover:text-blue-400",
    },
    {
      icon: <WhatsApp className="w-6 h-6" />,
      label: "WhatsApp",
      value: "+91 9XXXXXXXXX",
      href: "https://wa.me/919XXXXXXXXX",
      color: "from-green-500 to-emerald-500",
      hoverColor: "hover:text-green-400",
    },
    {
      icon: <Location className="h-6 w-6" />,
      label: "Location",
      value: "New Delhi, India 🇮🇳",
      href: null,
      color: "from-orange-500 to-red-500",
      hoverColor: "hover:text-orange-400",
    },
  ];

  const InputClasses =
    "mt-1 p-0.5 bg-white/10 transition-all duration-300 group-focus-within:bg-gradient-to-r group-focus-within:from-purple-500 group-focus-within:via-pink-500 group-focus-within:to-indigo-500";

  return (
    <main className="mx-auto max-w-7xl p-4 py-12">
      {/* ================= PAGE HEADER ================= */}
      <div className="mb-16 text-center">
        <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl mb-4">
          Let{`'`}s{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Connect 🤝
          </span>
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Have a project in mind or just want to chat? I{`'`}d love to hear from
          you. Drop me a message and I{`'`}ll get back to you as soon as
          possible!
        </p>
      </div>

      {/* ================= CENTERED FORM ================= */}
      <div className="max-w-2xl mx-auto mb-20">
        <div className="relative w-full rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl p-6 shadow-2xl">
          <div className="relative space-y-5">
            {/* Header */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Send a Message
              </h3>
              <p className="text-sm text-white/60">
                Fill out the form below and I{`'`}ll get back to you shortly
              </p>
            </div>

            {/* Name */}
            <div className="group">
              <label className="text-sm text-white/70">Name</label>
              <div className={`${InputClasses} rounded-full`}>
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
              <div className={`${InputClasses} rounded-full`}>
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
              <div className={`${InputClasses} rounded-2xl`}>
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

      {/* ================= CONTACT DETAILS SECTION ================= */}
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">
            Other Ways to Reach Me
          </h2>
          <p className="text-white/60">
            Choose your preferred method of communication
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => (
            <div key={index} className="group relative">
              {method.href ? (
                <a
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    method.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="block h-full"
                >
                  <div className="h-full p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                    {/* Gradient Icon */}
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${method.color} text-white mb-4`}
                    >
                      {method.icon}
                    </div>

                    {/* Label */}
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {method.label}
                    </h3>

                    {/* Value */}
                    <p
                      className={`text-sm text-white/70 transition-colors ${method.hoverColor} break-words`}
                    >
                      {method.value}
                    </p>

                    {/* Hover Arrow */}
                    <div className="mt-4 flex items-center gap-2 text-white/40 group-hover:text-white/60 transition-colors">
                      <span className="text-xs font-medium">Contact</span>
                      <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              ) : (
                <div className="h-full p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                  {/* Gradient Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${method.color} text-white mb-4`}
                  >
                    {method.icon}
                  </div>

                  {/* Label */}
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {method.label}
                  </h3>

                  {/* Value */}
                  <p className="text-sm text-white/70 break-words">
                    {method.value}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Info Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 border border-purple-500/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">⚡</div>
              <div>
                <h3 className="text-white font-semibold">
                  Quick Response Time
                </h3>
                <p className="text-sm text-white/60">Usually within 24 hours</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-3xl">🌍</div>
              <div>
                <h3 className="text-white font-semibold">Available Globally</h3>
                <p className="text-sm text-white/60">
                  Remote collaborations welcome
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-3xl">💼</div>
              <div>
                <h3 className="text-white font-semibold">Open for Projects</h3>
                <p className="text-sm text-white/60">
                  Let{`'`}s build something amazing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
