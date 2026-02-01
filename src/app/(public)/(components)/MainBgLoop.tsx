"use client";

import React, { ReactNode, useRef } from "react";

export default function MainBgLoop({ children }: { children: ReactNode }) {
  const videoRef1 = useRef<HTMLVideoElement | null>(null);
  const videoRef2 = useRef<HTMLVideoElement | null>(null);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* ================= VIDEO BACKGROUND ================= */}
      <div className="absolute inset-0 z-0">
        {/* Mobile */}
        <video
          ref={videoRef1}
          className="absolute inset-0 w-full h-full object-cover block md:hidden"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/images/home/bg.mp4" type="video/mp4" />
        </video>

        {/* Desktop */}
        <video
          ref={videoRef2}
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/images/home/bg2.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ================= GRID + GRADIENT OVERLAY ================= */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/30 to-black" />

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* ================= UI CONTENT ================= */}
      <div className="relative min-h-screen max-h-screen z-10 text-white overflow-y-auto">
        {children}
      </div>
    </main>
  );
}
