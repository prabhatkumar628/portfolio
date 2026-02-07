"use client";

import React, { ReactNode, useMemo, useRef } from "react";
import { useSettings } from "../../../hooks/usePublic";
import Loading from "../loading";
import settingsStatic from "../../../data/settings.static";

export default function MainBgLoop({ children }: { children: ReactNode }) {
  const videoRef1 = useRef<HTMLVideoElement | null>(null);
  const videoRef2 = useRef<HTMLVideoElement | null>(null);

  const { data: settingsData, isLoading: settingsLoading } = useSettings();
  const videoSrc = useMemo(() => {
    return {
      mobile: settingsData?.siteVideoSm?.trim()
        ? settingsData.siteVideoSm
        : settingsStatic.siteVideoSm,

      desktop: settingsData?.siteVideoLg?.trim()
        ? settingsData.siteVideoLg
        : settingsStatic.siteVideoLg,
    };
  }, [settingsData]);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {settingsLoading && <Loading />}
      {/* ================= VIDEO BACKGROUND ================= */}
      <div className="absolute inset-0 z-0">
        {/* Mobile */}
        {settingsData?.siteVideoSm && (
          <video
            ref={videoRef1}
            className="absolute inset-0 w-full h-full object-cover block md:hidden"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={settingsData.siteVideoSm} type="video/mp4" />
          </video>
        )}
        {!settingsData?.siteVideoSm && (
          <video
            ref={videoRef1}
            className="absolute inset-0 w-full h-full object-cover block md:hidden"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={settingsStatic.siteVideoSm} type="video/mp4" />
          </video>
        )}

        {/* Desktop */}
        {settingsData?.siteVideoLg && (
          <video
            ref={videoRef2}
            className="absolute inset-0 w-full h-full object-cover hidden md:block"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={videoSrc.desktop} type="video/mp4" />
          </video>
        )}
        {!settingsData?.siteVideoLg && (
          <video
            ref={videoRef2}
            className="absolute inset-0 w-full h-full object-cover hidden md:block"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={settingsStatic.siteVideoLg} type="video/mp4" />
          </video>
        )}
      </div>

      {/* ================= GRID + GRADIENT OVERLAY ================= */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {/* Dark gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-black via-purple-950/30 to-black" />

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-size-[4rem_4rem]" />
      </div>

      {/* ================= UI CONTENT ================= */}
      <div className="relative min-h-screen max-h-screen z-10 text-white overflow-y-auto">
        {children}
      </div>
    </main>
  );
}
