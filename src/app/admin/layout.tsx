"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "../(public)/(components)/Svg";
import { useUnreadMessageCount } from "../../hooks/useAdminMessages";
import Loading from "../(public)/loading";
import { useAdminLayoutContext } from "../../context/adminLayoutContext/AdminLayoutContext";
import { signOut } from "next-auth/react";

const {
  Analytics,
  ArrowLeft,
  Bars,
  Blog,
  Cross,
  Dashboard,
  Email,
  Experience,
  Notification,
  Projects,
  Search,
  Settings,
  Share,
  Skills,
} = Icons;

export default function AdminDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { searchInput, handleSearchChange, clearSearch } =
    useAdminLayoutContext();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: unreadData, isLoading } = useUnreadMessageCount();
  const unreadCount = unreadData?.unreadCount;

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: <Dashboard className="w-5 h-5" />,
    },
    {
      name: "Projects",
      href: "/admin/projects",
      icon: <Projects className="w-5 h-5" />,
      // badge: "12",
    },
    {
      name: "Skills",
      href: "/admin/skills",
      icon: <Skills className="w-5 h-5" />,
    },
    {
      name: "Experience",
      href: "/admin/experience",
      icon: <Experience className="w-5 h-5" />,
    },
    {
      name: "Messages",
      href: "/admin/messages",
      icon: <Email className="h-5 w-5" />,
      badge: unreadCount,
      badgeColor: "bg-red-500",
    },
    // {
    //   name: "Blog",
    //   href: "/admin/blog",
    //   icon: <Blog className="w-5 h-5" />,
    // },
    // {
    //   name: "Analytics",
    //   href: "/admin/analytics",
    //   icon: <Analytics className="w-5 h-5" />,
    // },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {isLoading && <Loading />}
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-white font-semibold text-lg">Admin</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/60 hover:text-white"
          >
            <Cross className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                onClick={() => setSidebarOpen(false)}
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-linear-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
                {item.badge > 0 && (
                  <span
                    className={`ml-auto px-2 py-0.5 text-xs font-semibold rounded-full ${
                      item.badgeColor || "bg-purple-500"
                    } text-white`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/10">
          <Link href={"/admin/profile"}>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-semibold">PK</span>
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">Prabhat Kumar</p>
                <p className="text-white/50 text-xs">Admin</p>
              </div>
              <ArrowLeft className="w-5 h-5 text-white/60" />
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 bg-black/40 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center justify-between h-full px-6">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-white/60 hover:text-white"
            >
              <Bars className="w-6 h-6" />
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <input
                  value={searchInput}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 pl-10 pr-10 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50 transition-colors"
                />

                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />

                {searchInput && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition"
                  >
                    <Cross className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-colors">
                <Notification className="w-6 h-6" />
                {unreadCount !== 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              {/* View Site */}
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Share className="w-5 h-5" />
                <span className="text-sm font-medium whitespace-nowrap">
                  View Site
                </span>
              </Link>

              {/* Logout */}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-4 py-2 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
