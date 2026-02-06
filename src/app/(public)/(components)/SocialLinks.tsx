import { ReactNode } from "react";
import {
  GitHub,
  Instagram,
  LinkedIn,
  Twitter,
  Facebook,
  YouTube,
  Discord,
} from "./Svg";
import { useSettings } from "../../../hooks/usePublic";

type SocialItem = {
  key: string;
  name: string;
  url: string;
  icon: ReactNode;
  hoverClass: string;
};

const SOCIAL_CONFIG: Record<
  string,
  { name: string; icon: ReactNode; hoverClass: string }
> = {
  github: {
    name: "GitHub",
    icon: <GitHub className="h-5 w-5" />,
    hoverClass: "hover:text-purple-400 hover:border-purple-400/50",
  },
  linkedin: {
    name: "LinkedIn",
    icon: <LinkedIn className="h-5 w-5" />,
    hoverClass: "hover:text-blue-400 hover:border-blue-400/50",
  },
  twitter: {
    name: "Twitter",
    icon: <Twitter className="h-5 w-5" />,
    hoverClass: "hover:text-sky-400 hover:border-sky-400/50",
  },
  instagram: {
    name: "Instagram",
    icon: <Instagram className="h-5 w-5" />,
    hoverClass: "hover:text-pink-400 hover:border-pink-400/50",
  },
  facebook: {
    name: "Facebook",
    icon: <Facebook className="h-5 w-5" />,
    hoverClass: "hover:text-blue-500 hover:border-blue-500/50",
  },
  youtube: {
    name: "YouTube",
    icon: <YouTube className="h-5 w-5" />,
    hoverClass: "hover:text-red-500 hover:border-red-500/50",
  },
  discord: {
    name: "Discord",
    icon: <Discord className="h-5 w-5" />,
    hoverClass: "hover:text-indigo-400 hover:border-indigo-400/50",
  },
};

export default function SocialLinks({ className }: { className: string }) {
  const { data: settingsData } = useSettings();

  const socialLinks: SocialItem[] = settingsData
    ? (Object.entries(settingsData.socialLinks || {})
        .filter(([, url]) => Boolean(url))
        .map(([key, url]) => {
          const config = SOCIAL_CONFIG[key];
          if (!config) return null;

          return {
            key,
            name: config.name,
            url: url as string,
            icon: config.icon,
            hoverClass: config.hoverClass,
          };
        })
        .filter(Boolean) as SocialItem[])
    : [];

  if (!socialLinks.length) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {socialLinks.map((item) => (
        <a
          key={item.key}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.name}
          className={`flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white/70 transition-all duration-300 hover:bg-white/10 ${item.hoverClass} ${className}`}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}
