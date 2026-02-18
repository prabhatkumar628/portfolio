"use client";

import Link from "next/link";
import { useGetAdminStats } from "../../../hooks/useAdminStats";
import { ArrowLeft } from "../../(public)/(components)/Svg";

export default function DashboardOverview() {
  const { data, isLoading } = useGetAdminStats();
  const messages = data?.data.recentMessages ?? [];
  const projects = data?.data.recentProjects ?? [];
  const lastMonthClicks = data?.data.lastMonthClicks ?? 0;
  const thisMonthClicks = data?.data.thisMonthClicks ?? 0;

  let clicksChangePercentage = 0;

  if (lastMonthClicks === 0) {
    if (thisMonthClicks === 0) {
      clicksChangePercentage = 0;
    } else {
      clicksChangePercentage = 100; // new growth
    }
  } else {
    clicksChangePercentage =
      ((thisMonthClicks - lastMonthClicks) / lastMonthClicks) * 100;
  }

  const stats = [
    {
      name: "Total Projects",
      value: data?.data.totalProjectsCount ?? 0,
      change: `+${data?.data.thisMonthProjectsCount ?? 0} this month`,
      icon: "💼",
      color: "from-purple-500 to-pink-500",
      ref: "/admin/projects",
    },
    {
      name: "Total Views",
      value: data?.data.totalClicks ?? 0,
      change: `+${clicksChangePercentage}% from last month`,
      icon: "📊",
      color: "from-blue-500 to-cyan-500",
      ref: "/admin/projects",
    },
    {
      name: "New Messages",
      value: data?.data.totalMessageCount ?? 0,
      change: `${data?.data.unreadMessageCount ?? 0} unread`,
      icon: "✉️",
      color: "from-green-500 to-emerald-500",
      ref: "/admin/messages",
    },
    {
      name: "Blog Posts",
      value: "24",
      change: "+4 this month",
      icon: "📝",
      color: "from-orange-500 to-red-500",
      ref: "/admin/dashboard",
    },
  ];

  function timeAgo(date: string | Date): string {
    const now = new Date();
    const past = new Date(date);
    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);
    if (seconds < 60) {
      return "just now";
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    }
    const days = Math.floor(hours / 24);
    if (days < 7) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
    }
    const weeks = Math.floor(days / 7);
    if (weeks < 4) {
      return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    }
    const months = Math.floor(days / 30);
    if (months < 12) {
      return months === 1 ? "1 month ago" : `${months} months ago`;
    }
    const years = Math.floor(days / 365);
    return years === 1 ? "1 year ago" : `${years} years ago`;
  }

  const MessageSkeleton = () => {
    return (
      <div className="p-4 rounded-xl bg-white/5 animate-pulse">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="h-4 w-32 bg-white/10 rounded mb-2"></div>
            <div className="h-3 w-40 bg-white/10 rounded"></div>
          </div>

          <div className="h-3 w-16 bg-white/10 rounded"></div>
        </div>

        <div className="space-y-2">
          <div className="h-3 bg-white/10 rounded"></div>
          <div className="h-3 bg-white/10 rounded w-5/6"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-white/60">
          Welcome back! Here{`'`}s what{`'`}s happening with your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link href={stat.ref} key={index}>
            <div className="group flex flex-col gap-2 relative p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
              <ArrowLeft className="absolute right-4 top-10 w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" />
              <div className=" mb-2">
                <div className={`text-4xl bg-linear-to-br bg-clip-text`}>
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              <p className="text-sm text-white/60">{stat.name}</p>
              <p className="text-xs text-white/40 line-clamp-1">
                {stat.change}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              Recent Projects
            </h2>
            <Link href={"/admin/projects"}>
              <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                View All →
              </button>
            </Link>
          </div>
          <div className="space-y-4">
            {isLoading &&
              Array.from({ length: 3 }).map((_, i) => (
                <MessageSkeleton key={i} />
              ))}

            {!isLoading &&
              messages.length === 0 &&
              Array.from({ length: 3 }).map((_, i) => (
                <MessageSkeleton key={i} />
              ))}

            {!isLoading &&
              projects.length > 0 &&
              projects.map((project, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div>
                    <h3 className="text-white font-medium mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/50">
                      {timeAgo(project.createdAt)}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.isPublished
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    }`}
                  >
                    {project.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              Recent Messages
            </h2>
            <Link href={"/admin/messages"}>
              <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                View All →
              </button>
            </Link>
          </div>
          <div className="space-y-4">
            {isLoading &&
              Array.from({ length: 3 }).map((_, i) => (
                <MessageSkeleton key={i} />
              ))}

            {!isLoading &&
              messages.length === 0 &&
              Array.from({ length: 3 }).map((_, i) => (
                <MessageSkeleton key={i} />
              ))}

            {!isLoading &&
              messages.length > 0 &&
              messages.map((message) => (
                <div
                  key={message._id}
                  className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-white font-medium">{message.name}</h3>

                      <p className="text-xs text-white/50">{message.email}</p>
                    </div>

                    <span className="text-xs text-white/40">
                      {timeAgo(message.createdAt)}
                    </span>
                  </div>

                  <p className="text-sm text-white/60 line-clamp-2">
                    {message.message}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
        <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            href={"/admin/projects/new"}
            className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-purple-500/50 transition-all text-center group"
          >
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
              ➕
            </div>
            <p className="text-sm text-white/80 font-medium">New Project</p>
          </Link>

          <Link
            href={"/admin/projects"}
            className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-orange-500/50 transition-all text-center group"
          >
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
              💼
            </div>
            <p className="text-sm text-white/80 font-medium">Projects</p>
          </Link>

          <Link
            href={"/admin/messages"}
            className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/50 transition-all text-center group"
          >
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
              ✉️
            </div>
            <p className="text-sm text-white/80 font-medium">Messages</p>
          </Link>
          <Link
            href={"/admin/settings"}
            className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-green-500/50 transition-all text-center group"
          >
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
              ⚙️
            </div>
            <p className="text-sm text-white/80 font-medium">Settings</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
