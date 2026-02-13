"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { useSettings } from "../../../hooks/usePublic";
import Loading from "../loading";
import settingsStatic from "../../../data/settings.static";
import { ArrowUp } from "lucide-react";
import { useAdminLayoutContext } from "../../../context/adminLayoutContext/AdminLayoutContext";

export default function MainBgLoop({ children }: { children: ReactNode }) {
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  // const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const {scrollContainerRef} = useAdminLayoutContext()

  const { data: settingsData, isLoading: settingsLoading } = useSettings();

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (scrollContainer.scrollTop > 200) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef]);

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-4 z-50 w-10 h-10 cursor-pointer rounded-full bg-linear-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg hover:shadow-purple-500/50 transition-all duration-300 ${
          showScrollBtn
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="text-white" size={20} />
      </button>

      {settingsLoading && <Loading />}

      {/* ================= VIDEO BACKGROUND ================= */}
      <div className="absolute inset-0 z-0">
        {/* Mobile */}
        {settingsData?.siteVideoSm && (
          <video
            className="absolute inset-0 w-full h-full object-cover block md:hidden"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={settingsData.siteVideoSm.url} type="video/mp4" />
          </video>
        )}
        {!settingsData?.siteVideoSm && (
          <video
            className="absolute inset-0 w-full h-full object-cover block md:hidden"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={settingsStatic.siteVideoSm?.url} type="video/mp4" />
          </video>
        )}

        {/* Desktop */}
        {settingsData?.siteVideoLg && (
          <video
            className="absolute inset-0 w-full h-full object-cover hidden md:block"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={settingsData.siteVideoLg.url} type="video/mp4" />
          </video>
        )}
        {!settingsData?.siteVideoLg && (
          <video
            className="absolute inset-0 w-full h-full object-cover hidden md:block"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={settingsStatic.siteVideoLg?.url} type="video/mp4" />
          </video>
        )}
      </div>

      {/* ================= GRID + GRADIENT OVERLAY ================= */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {/* Dark gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-black via-purple-950/30 to-black" />

        {/* Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
          }}
        />
      </div>

      {/* ================= UI CONTENT (Scrollable Container) ================= */}
      <div
        ref={scrollContainerRef}
        className="relative min-h-screen max-h-screen z-20 text-white overflow-y-auto overflow-x-hidden scroll-smooth"
      >
        {children}
      </div>
    </main>
  );
}
