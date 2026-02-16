"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Grid3x3,
  List,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { useAdminLayoutContext } from "../../../context/adminLayoutContext/AdminLayoutContext";
import {
  useDeleteAdminProjectById,
  useGetAdminProject,
} from "../../../hooks/useAdminProjects";
import { GitHub } from "../../(public)/(components)/Svg";
import Loading from "../../(public)/loading";

export default function ProjectsPage() {
  const router = useRouter();

  // ─── States ──────────────────────────────────
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [featured, setFeatured] = useState<string | undefined>(undefined);

  // ─── Context ─────────────────────────────────
  const { globalSearch } = useAdminLayoutContext();
  const effectivePage = globalSearch ? 1 : page;

  // ─── API Hooks ───────────────────────────────
  const { data, isLoading, isError, refetch } = useGetAdminProject({
    page: effectivePage,
    limit,
    search: globalSearch,
    category: category !== "all" ? category : undefined,
    status: status !== "all" ? status : undefined,
  });

  // ─── Extracted Data ──────────────────────────
  const projects = data?.projects || [];
  const totalProjects = data?.pagination?.totalProjects || 0;
  const totalPages = data?.pagination?.totalPages || 1;
  const currentPage = data?.pagination?.currentPage || 1;
  const hasNextPage = data?.pagination?.hasNextPage || false;
  const hasPrevPage = data?.pagination?.hasPrevPage || false;

  // ─── Stats ───────────────────────────────────
  const publishedCount = data?.publishedCount || 0;
  const draftCount = 0;
  const featuredCount = data?.featuredCount || 0;

  const stats = [
    {
      label: "Total Projects",
      value: totalProjects,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Published",
      value: publishedCount,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Drafts",
      value: draftCount,
      color: "from-yellow-500 to-orange-500",
    },
    {
      label: "Featured",
      value: featuredCount,
      color: "from-blue-500 to-cyan-500",
    },
  ];

  // ─── Filters ─────────────────────────────────
  const categoryFilters = [
    { label: "All Categories", value: "all" },
    { label: "Web", value: "web" },
    { label: "Mobile", value: "mobile" },
    { label: "Full Stack", value: "fullstack" },
    { label: "Frontend", value: "frontend" },
    { label: "Backend", value: "backend" },
    { label: "Other", value: "other" },
  ];

  const statusFilters = [
    { label: "All Status", value: "all" },
    { label: "Completed", value: "completed" },
    { label: "In Progress", value: "in-progress" },
    { label: "Archived", value: "archived" },
  ];

  // ─── Handlers ────────────────────────────────
  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const handleFeaturedFilter = () => {
    setFeatured(featured === "true" ? undefined : "true");
    setPage(1);
  };

  const { mutate: deleteProject, isPending: deletePending } =
    useDeleteAdminProjectById();
  const handleDelete = (id: string) => {
    deleteProject(id, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  // ─── Pagination Numbers ──────────────────────
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  // ─── Badges ──────────────────────────────────
  const getStatusBadge = (status: string) => {
    const badges: Record<string, { text: string; color: string }> = {
      completed: {
        text: "Completed",
        color: "bg-green-500/20 text-green-400 border-green-500/30",
      },
      "in-progress": {
        text: "In Progress",
        color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      },
      archived: {
        text: "Archived",
        color: "bg-gray-500/20 text-gray-400 border-gray-500/30",
      },
    };
    return badges[status] || badges.completed;
  };

  return (
    <div className="space-y-6">
      {deletePending && <Loading />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-white/60">Manage your portfolio projects</p>
        </div>
        <button
          onClick={() => router.push("/admin/projects/new")}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all cursor-pointer"
        >
          <Plus size={20} />
          New Project
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl"
          >
            <div
              className={`text-2xl font-bold bg-linear-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
            >
              {stat.value}
            </div>
            <div className="text-sm text-white/60">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Category & Status Filters */}
        <div className="flex flex-wrap gap-2">
          {/* Category */}
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all"
          >
            {categoryFilters.map((f) => (
              <option key={f.value} value={f.value} className="bg-black">
                {f.label}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all"
          >
            {statusFilters.map((f) => (
              <option key={f.value} value={f.value} className="bg-black">
                {f.label}
              </option>
            ))}
          </select>

          {/* Featured Toggle */}
          <button
            onClick={handleFeaturedFilter}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              featured === "true"
                ? "bg-linear-to-r from-purple-500 to-pink-500 text-white"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            ⭐ Featured
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 p-1 rounded-xl bg-white/5 border border-white/10">
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded-lg transition-all cursor-pointer ${
              view === "grid"
                ? "bg-purple-500 text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Grid3x3 size={20} />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-lg transition-all cursor-pointer ${
              view === "list"
                ? "bg-purple-500 text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-white/5" />
              <div className="p-5 space-y-3">
                <div className="h-6 bg-white/5 rounded" />
                <div className="h-4 bg-white/5 rounded w-3/4" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-white/5 rounded" />
                  <div className="h-6 w-16 bg-white/5 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {isError && !isLoading && (
        <div className="p-8 text-center rounded-2xl border border-red-500/30 bg-red-500/10">
          <p className="text-red-400 mb-3">Failed to load projects</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 text-sm hover:bg-red-500/30 transition-all"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && projects.length === 0 && (
        <div className="p-16 text-center rounded-2xl border border-white/10 bg-black/40">
          <div className="text-6xl mb-4">📁</div>
          <p className="text-white/60 mb-4">No projects found</p>
          <button
            onClick={() => router.push("/admin/projects/new")}
            className="px-6 py-3 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            Create Your First Project
          </button>
        </div>
      )}

      {/* Grid View */}
      {!isLoading && !isError && projects.length > 0 && view === "grid" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id.toString()}
              className="group rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden hover:border-purple-500/30 transition-all"
            >
              {/* Thumbnail */}
              <div className="relative h-50 bg-linear-to-br from-purple-500/10 to-pink-500/10">
                {project.thumbnail?.url ? (
                  <Image
                    src={project.thumbnail.url}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                    💼
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                  {project.featured && (
                    <span className="px-3 py-1 rounded-full bg-linear-to-r from-purple-500 to-pink-500 text-white text-xs font-medium">
                      Featured
                    </span>
                  )}
                  {!project.isPublished && (
                    <span className="px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-medium ml-auto">
                      Draft
                    </span>
                  )}
                </div>

                {/* Quick View on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {project.liveDemoLink && (
                    <a
                      href={project.liveDemoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                  {project.githubFrontendLink && (
                    <a
                      href={project.githubFrontendLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
                    >
                      <GitHub className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white line-clamp-1 flex-1">
                    {project.title}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs border ${getStatusBadge(project.status).color}`}
                  >
                    {getStatusBadge(project.status).text}
                  </span>
                </div>

                <p className="text-sm text-white/60 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-nowrap overflow-hidden items-center gap-1.5 mb-4">
                  {project.technologies.slice(0, 3).map((tech, idx) => {
                    return (
                      <div
                        key={idx}
                        className="group flex items-center gap-2 px-2 py-1 text-xs rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all"
                      >
                        <span
                          className={`text-sm font-medium ${tech.highlight || "text-white"}`}
                        >
                          {tech.name}
                        </span>
                      </div>
                    );
                  })}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs text-white/50">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-white/50">
                  <span className="flex items-center gap-1">
                    <Eye size={14} />
                    {project.views || 0}
                  </span>
                  <span>🔗 {project.clickStats?.totalClicks || 0}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      router.push(`/admin/projects/${project._id}/edit`)
                    }
                    className="flex-1 px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm font-medium text-center hover:bg-purple-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Edit size={14} />
                    Edit
                  </button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="px-4 py-2 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer">
                        <Trash2 size={16} />
                      </button>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="bg-black/95 backdrop-blur-xl rounded-2xl border border-white/10">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">
                          Delete Project
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-white/60">
                          Are you sure you want to delete{" "}
                          <strong>{project.title}</strong>? This action cannot
                          be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10">
                          Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                          disabled={deletePending}
                          onClick={() => handleDelete(project._id.toString())}
                          className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30"
                        >
                          {deletePending ? "Deleting..." : "Yes, Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {!isLoading && !isError && projects.length > 0 && view === "list" && (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project._id.toString()}
              className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl hover:bg-white/5 transition-all"
            >
              {/* Thumbnail */}
              <div className="relative w-24 h-24 rounded-xl bg-linear-to-br from-purple-500/10 to-pink-500/10 shrink-0 overflow-hidden">
                {project.thumbnail?.url ? (
                  <Image
                    src={project.thumbnail.url}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-3xl">
                    💼
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3 mb-2">
                  <h3 className="text-lg font-bold text-white">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="px-2 py-0.5 rounded-full bg-linear-to-r border border-purple-500/30 from-purple-500 to-pink-500 text-white text-xs shrink-0">
                      Featured
                    </span>
                  )}
                  {!project.isPublished && (
                    <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs shrink-0">
                      Draft
                    </span>
                  )}
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs border ${getStatusBadge(project.status).color} shrink-0`}
                  >
                    {getStatusBadge(project.status).text}
                  </span>
                </div>

                <p className="text-sm text-white/60 mb-3 line-clamp-1">
                  {project.description}
                </p>

                <div className="flex items-center gap-6 text-sm text-white/50">
                  <span className="flex items-center gap-1">
                    <Eye size={14} />
                    {project.views || 0}
                  </span>
                  <span>🔗 {project.clickStats?.totalClicks || 0}</span>
                  <span>
                    📅 {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() =>
                    router.push(`/admin/projects/${project._id}/edit`)
                  }
                  className="px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm font-medium hover:bg-purple-500/30 transition-all flex items-center gap-1.5"
                >
                  <Edit size={14} />
                  Edit
                </button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="px-3 py-2 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
                      <Trash2 size={16} />
                    </button>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="bg-black/95 backdrop-blur-xl rounded-2xl border border-white/10">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white">
                        Delete Project
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-white/60">
                        Delete <strong>{project.title}</strong>?
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10">
                        Cancel
                      </AlertDialogCancel>

                      <AlertDialogAction
                        onClick={() => handleDelete(project._id.toString())}
                        className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={!hasPrevPage}
            className={`px-4 py-2 rounded-xl text-sm transition-all ${
              hasPrevPage
                ? "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                : "bg-white/5 text-white/30 border border-white/5 cursor-not-allowed"
            }`}
          >
            ← Previous
          </button>

          <div className="flex items-center gap-1.5">
            {getPageNumbers().map((p, i) =>
              p === "..." ? (
                <span key={`dots-${i}`} className="text-white/40 px-1">
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p as number)}
                  className={`w-8 h-8 rounded-lg text-sm transition-all ${
                    currentPage === p
                      ? "bg-linear-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                >
                  {p}
                </button>
              ),
            )}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={!hasNextPage}
            className={`px-4 py-2 rounded-xl text-sm transition-all ${
              hasNextPage
                ? "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                : "bg-white/5 text-white/30 border border-white/5 cursor-not-allowed"
            }`}
          >
            Next →
          </button>
        </div>
      )}

      {/* Showing count */}
      {!isLoading && projects.length > 0 && (
        <p className="text-xs text-white/40 text-center">
          Showing {(currentPage - 1) * limit + 1} –{" "}
          {Math.min(currentPage * limit, totalProjects)} of {totalProjects}{" "}
          projects
        </p>
      )}
    </div>
  );
}
