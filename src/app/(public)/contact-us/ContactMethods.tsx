"use client";
import {
  ArrowLeft,
  Email,
  Location,
  Phone,
  WhatsApp,
} from "../(components)/Svg";
import { useSettings } from "../../../hooks/usePublic";

// Country codes ki complete list
export const countryCodes = [
  { value: "+1", label: "🇺🇸 United States (+1)" },
  { value: "+44", label: "🇬🇧 United Kingdom (+44)" },
  { value: "+91", label: "🇮🇳 India (+91)" },
  { value: "+86", label: "🇨🇳 China (+86)" },
  { value: "+81", label: "🇯🇵 Japan (+81)" },
  { value: "+49", label: "🇩🇪 Germany (+49)" },
  { value: "+33", label: "🇫🇷 France (+33)" },
  { value: "+61", label: "🇦🇺 Australia (+61)" },
  { value: "+7", label: "🇷🇺 Russia (+7)" },
  { value: "+55", label: "🇧🇷 Brazil (+55)" },
  { value: "+52", label: "🇲🇽 Mexico (+52)" },
  { value: "+34", label: "🇪🇸 Spain (+34)" },
  { value: "+39", label: "🇮🇹 Italy (+39)" },
  { value: "+82", label: "🇰🇷 South Korea (+82)" },
  { value: "+62", label: "🇮🇩 Indonesia (+62)" },
  { value: "+90", label: "🇹🇷 Turkey (+90)" },
  { value: "+31", label: "🇳🇱 Netherlands (+31)" },
  { value: "+46", label: "🇸🇪 Sweden (+46)" },
  { value: "+41", label: "🇨🇭 Switzerland (+41)" },
  { value: "+971", label: "🇦🇪 UAE (+971)" },
  { value: "+966", label: "🇸🇦 Saudi Arabia (+966)" },
  { value: "+65", label: "🇸🇬 Singapore (+65)" },
  { value: "+64", label: "🇳🇿 New Zealand (+64)" },
  { value: "+27", label: "🇿🇦 South Africa (+27)" },
  { value: "+20", label: "🇪🇬 Egypt (+20)" },
];

export default function ContactMethods() {
  const { data: settingsData } = useSettings();
  let contactMethods;
  if (settingsData) {
    contactMethods = [
      {
        icon: <Email className="h-6 w-6" />,
        label: "Email",
        value: settingsData.email,
        href: `mailto:${settingsData.email}`,
        color: "from-purple-500 to-pink-500",
        hoverColor: "hover:text-purple-400",
      },
      {
        icon: <Phone className="h-6 w-6" />,
        label: "Phone",
        value: "+91 9XXXXXXXXX",
        href: `tel:+91${settingsData.phone}`,
        color: "from-blue-500 to-cyan-500",
        hoverColor: "hover:text-blue-400",
      },
      {
        icon: <WhatsApp className="w-6 h-6" />,
        label: "WhatsApp",
        value: "+91 9XXXXXXXXX",
        href: `https://wa.me/91${settingsData.phone}`,
        color: "from-green-500 to-emerald-500",
        hoverColor: "hover:text-green-400",
      },
      {
        icon: <Location className="h-6 w-6" />,
        label: "Location",
        value: `${settingsData.location}, India 🇮🇳`,
        href: null,
        color: "from-orange-500 to-red-500",
        hoverColor: "hover:text-orange-400",
      },
    ];
  }

  return (
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
        {contactMethods &&
          contactMethods.map((method, index) => (
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
                    {/* linear Icon */}
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br ${method.color} text-white mb-4`}
                    >
                      {method.icon}
                    </div>

                    {/* Label */}
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {method.label}
                    </h3>

                    {/* Value */}
                    <p
                      className={`text-sm text-white/70 transition-colors ${method.hoverColor} wrap-break-word`}
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
                  {/* linear Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br ${method.color} text-white mb-4`}
                  >
                    {method.icon}
                  </div>

                  {/* Label */}
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {method.label}
                  </h3>

                  {/* Value */}
                  <p className="text-sm text-white/70 wrap-break-word">
                    {method.value}
                  </p>
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Bottom Info Banner */}
      <div className="mt-12 p-6 rounded-2xl bg-linear-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 border border-purple-500/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">⚡</div>
            <div>
              <h3 className="text-white font-semibold">Quick Response Time</h3>
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
  );
}
