import React from "react";
import clsx from "clsx";

interface Button2Props {
  children: React.ReactNode;
  className?: string;
}
export const GradientButtonSoft = ({ children, className }: Button2Props) => {
  return (
    <div
      className={clsx(
        "inline-block px-4 py-2 rounded-full",
        "bg-gradient-to-r from-purple-500/10 to-pink-500/10",
        "border border-purple-500/20",
        className,
      )}
    >
      <span className="text-sm text-purple-300 font-medium">{children}</span>
    </div>
  );
};

type Gradient = "blue" | "purple" | "green" | "orange" | "pink";

type Variant = "primary" | "secondary" | "outline" | "gray" | "black";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  gradient?: Gradient;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
}

const gradientMap: Record<Gradient, string> = {
  blue: "from-blue-500 via-cyan-500 to-sky-500",
  purple: "from-purple-500 via-pink-500 to-indigo-500",
  green: "from-emerald-500 via-teal-500 to-cyan-500",
  orange: "from-orange-500 via-amber-500 to-yellow-500",
  pink: "from-pink-500 via-rose-500 to-red-500",
};

const sizeMap = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function GradientButton({
  children,
  gradient = "blue",
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "relative inline-flex items-center justify-center rounded-full font-semibold",
        "transition-all duration-300 ease-out active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
        sizeMap[size],

        // 🔥 Gradient primary
        variant === "primary" &&
          `bg-gradient-to-br ${gradientMap[gradient]} text-white shadow-lg hover:shadow-xl hover:brightness-110`,

        // Glass secondary
        variant === "secondary" &&
          "bg-white/10 backdrop-blur-md text-white hover:bg-white/20",

        // Outline
        variant === "outline" &&
          "border border-white/30 text-white hover:bg-white/10",

        // 🖤 NEW: Gray variant
        variant === "gray" &&
          "bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white shadow-md hover:brightness-110",

        // 🖤 NEW: Black variant
        variant === "black" &&
          "bg-gradient-to-br from-black via-neutral-900 to-neutral-800 text-white shadow-lg hover:brightness-125",

        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
