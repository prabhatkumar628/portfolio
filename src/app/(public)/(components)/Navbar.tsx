"use client";
import GradientButton from "./Button";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Home, LayoutDashboard, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSettings } from "../../../hooks/usePublic";
import Loading from "../loading";

export default function Navbar() {
  const { data: session } = useSession();
  const pathName = usePathname();
  const { data: settingsData, isLoading: settingsLoading } = useSettings();

  return (
    <nav className="">
      {settingsLoading && <Loading />}
      <div className="mx-auto max-w-7xl p-4 flex justify-between items-center">
        {/* Left: Logo + Name */}
        <Link href={"/"}>
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-purple-500 to-indigo-500 p-0.5">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-black">
                {settingsData && (
                  <Image
                    src={settingsData.siteLogo}
                    alt="logo"
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>
            </div>
            {settingsData?.siteName && (
              <span className="text-lg font-semibold text-white">
                {settingsData.siteName}
              </span>
            )}
          </div>
        </Link>

        {/* ========== TOP BADGE ========== */}
        {settingsData?.isAvailableForHire && (
          <div className="group relative hidden md:block">
            <div className="absolute inset-0 bg-linear-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-md group-hover:blur-lg transition-all"></div>
            <div className="relative px-5 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <p className="text-xs md:text-sm uppercase tracking-widest text-white/80 font-medium">
                Available for Hire
              </p>
              <span className="text-xs">✨</span>
            </div>
          </div>
        )}

        {/* Right: CTA */}
        <div className="flex items-center gap-2">
          {session ? (
            <>
              <Link href="/admin/dashboard" aria-label="Dashboard">
                <div className="h-9 w-9 rounded-full grid place-items-center bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 cursor-pointer">
                  <LayoutDashboard className="h-4 w-4" />
                </div>
              </Link>

              <div
                onClick={() => signOut({ callbackUrl: "/" })}
                aria-label="Logout"
                className="h-9 w-9 rounded-full grid place-items-center bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
              </div>
            </>
          ) : (
            <>
              {pathName !== "/" && (
                <Link href="/" aria-label="Home">
                  <div className="h-9 w-9 rounded-full grid place-items-center bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 cursor-pointer">
                    <Home className="h-4 w-4 text-purple-400" />
                  </div>
                </Link>
              )}
            </>
          )}

          <Link href={"/about-us"}>
            <GradientButton
              size="sm"
              gradient="purple"
              className="whitespace-nowrap"
            >
              About Us
            </GradientButton>
          </Link>
        </div>
      </div>
    </nav>
  );
}
