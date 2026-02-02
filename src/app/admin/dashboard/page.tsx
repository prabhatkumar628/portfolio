"use client";

import React from "react";

export default function DashboardOverview() {
  const stats = [
    {
      name: "Total Projects",
      value: "12",
      change: "+2 this month",
      icon: "💼",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Total Views",
      value: "2,543",
      change: "+12% from last month",
      icon: "👁️",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "New Messages",
      value: "8",
      change: "3 unread",
      icon: "✉️",
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Blog Posts",
      value: "24",
      change: "+4 this month",
      icon: "📝",
      color: "from-orange-500 to-red-500",
    },
  ];

  const recentProjects = [
    { name: "E-Commerce Platform", status: "Published", date: "2 days ago" },
    { name: "Chat Application", status: "Draft", date: "5 days ago" },
    { name: "Task Manager", status: "Published", date: "1 week ago" },
  ];

  const recentMessages = [
    {
      name: "John Doe",
      email: "john@example.com",
      message: "Interested in collaborating on a project...",
      time: "2 hours ago",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      message: "Love your portfolio! Can we discuss...",
      time: "5 hours ago",
    },
    {
      name: "Mike Johnson",
      email: "mike@example.com",
      message: "Looking for a full stack developer...",
      time: "1 day ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-white/60">Welcome back! Here's what's happening with your portfolio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl hover:border-white/20 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`text-4xl bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                {stat.icon}
              </div>
              <svg
                className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-white/60 mb-2">{stat.name}</p>
            <p className="text-xs text-white/40">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Projects</h2>
            <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {recentProjects.map((project, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div>
                  <h3 className="text-white font-medium mb-1">{project.name}</h3>
                  <p className="text-sm text-white/50">{project.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === "Published"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                  }`}
                >
                  {project.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Messages</h2>
            <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {recentMessages.map((message, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-white font-medium">{message.name}</h3>
                    <p className="text-xs text-white/50">{message.email}</p>
                  </div>
                  <span className="text-xs text-white/40">{message.time}</span>
                </div>
                <p className="text-sm text-white/60 line-clamp-2">{message.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
        <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-purple-500/50 transition-all text-center group">
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">➕</div>
            <p className="text-sm text-white/80 font-medium">New Project</p>
          </button>
          <button className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/50 transition-all text-center group">
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📝</div>
            <p className="text-sm text-white/80 font-medium">New Blog</p>
          </button>
          <button className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-green-500/50 transition-all text-center group">
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">⚙️</div>
            <p className="text-sm text-white/80 font-medium">Settings</p>
          </button>
          <button className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-orange-500/50 transition-all text-center group">
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📊</div>
            <p className="text-sm text-white/80 font-medium">Analytics</p>
          </button>
        </div>
      </div>
    </div>
  );
}