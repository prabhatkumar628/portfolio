"use client";

import React, { useState } from "react";
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
import { DeleteIcon, Edit, Plus } from "lucide-react";
import Loading from "../../(public)/loading";
import { useAdminSkills } from "../../../hooks/useAdminSkills";
import { Cross, Search } from "../../(public)/(components)/Svg";
import { useAdminLayoutContext } from "../../../context/adminLayoutContext/AdminLayoutContext";

export default function SkillsPage() {
  const router = useRouter();

  const { globalSearch } = useAdminLayoutContext();
  // ─── States ──────────────────────────────────
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isTopOnly, setIsTopOnly] = useState(false);

  const { data: skillsData, isLoading } = useAdminSkills({
    page,
    limit,
    search:globalSearch,
    category,
  });

  // ─── Pagination ──────────────────────────────
  const totalPages = skillsData?.pagination?.totalPages || 1;
  const currentPage = skillsData?.pagination?.currentPage || 1;
  const hasNextPage = skillsData?.pagination?.hasNextPage || false;
  const hasPrevPage = skillsData?.pagination?.hasPrevPage || false;
  // ─── Extracted Data ──────────────────────────
  const skills = skillsData?.skills || [];
  const totalCount = skillsData?.totalCount || 0;
  const frontendCount = skillsData?.frontendCount || 0;
  const backendCount = skillsData?.backendCount || 0;
  const toolsCount = skillsData?.toolsCount || 0;

  // ─── Delete Modal ────────────────────────────
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: string }>(
    {
      open: false,
      id: "",
    },
  );

  // ─── Hooks (Replace with your actual hooks) ──
  // const { data, isLoading, isError, refetch } = useGetSkills({
  //   page,
  //   limit,
  //   category,
  //   search,
  //   isTop: isTopOnly,
  // });
  // const { mutate: deleteMutate, isPending: deletePending } = useDeleteSkill();

  // ─── Mock Data (Replace with actual data) ────
  // const isLoading = false;
  const isError = false;
  const deletePending = false;

  // ─── Handlers ────────────────────────────────
  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const handleFilterChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const handleDelete = (id: string) => {
    setDeleteModal({ open: true, id });
  };

  const handleConfirmDelete = async () => {
    // await deleteMutate(deleteModal.id);
    console.log("Delete skill:", deleteModal.id);
    setDeleteModal({ open: false, id: "" });
  };

  // ─── Badges ──────────────────────────────────
  const getCategoryBadge = (category: string) => {
    const badges: Record<string, { text: string; color: string }> = {
      frontend: {
        text: "Frontend",
        color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      },
      backend: {
        text: "Backend",
        color: "bg-green-500/20 text-green-400 border-green-500/30",
      },
      tools: {
        text: "Tools",
        color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      },
    };
    return badges[category] || badges.frontend;
  };

  // ─── Stats & Filters Data ────────────────────
  const stats = [
    {
      label: "Total Skills",
      count: totalCount,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Frontend",
      count: frontendCount,
      color: "from-blue-500 to-indigo-500",
    },
    {
      label: "Backend",
      count: backendCount,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Tools",
      count: toolsCount,
      color: "from-purple-500 to-pink-500",
    },
  ];

  const filters = [
    { label: "All", value: "all", count: totalCount },
    { label: "Frontend", value: "frontend", count: frontendCount },
    { label: "Backend", value: "backend", count: backendCount },
    { label: "Tools", value: "tools", count: toolsCount },
  ];

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

  // ──────────────── RENDER ───────────────────────
  return (
    <div className="space-y-6">
      {deletePending && <Loading />}

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Skills</h1>
          <p className="text-white/60">
            Manage your technical skills and expertise
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/skills/create")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
        >
          <Plus size={18} />
          Add New Skill
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl"
          >
            <div
              className={`text-2xl font-bold bg-linear-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
            >
              {stat.count ?? 0}
            </div>
            <div className="text-sm text-white/60">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => handleFilterChange(f.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              category === f.value
                ? "bg-linear-to-r from-purple-500 to-pink-500 text-white"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            {f.label} {f.count > 0 && `(${f.count})`}
          </button>
        ))}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-white/10 bg-black/40 animate-pulse"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/10 rounded-xl" />
                <div className="flex-1">
                  <div className="h-4 w-24 bg-white/10 rounded mb-2" />
                  <div className="h-3 w-16 bg-white/10 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {isError && !isLoading && (
        <div className="p-8 text-center rounded-2xl border border-red-500/30 bg-red-500/10">
          <p className="text-red-400 mb-3">Failed to load skills</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 text-sm hover:bg-red-500/30 transition-all"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && skills.length === 0 && (
        <div className="p-16 text-center rounded-2xl border border-white/10 bg-black/40">
          <div className="text-6xl mb-4">🎯</div>
          <p className="text-white/60 mb-4">No skills found</p>
          <button
            onClick={() => router.push("/admin/skills/create")}
            className="px-4 py-2 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white text-sm hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            Add Your First Skill
          </button>
        </div>
      )}

      {/* Skills Grid */}
      {!isLoading && !isError && skills.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skills.map((skill) => (
            <div
              key={skill._id.toString()}
              className="group p-5 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl hover:bg-white/5 hover:border-purple-500/30 transition-all"
            >
              {/* Skill Icon/Image & Name */}
              <div className="flex items-center gap-3 mb-4">
                {/* Icon/Image */}
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center overflow-hidden">
                  {skill.image?.url ? (
                    <Image
                      src={skill.image.url}
                      alt={skill.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl">{skill.emoji}</span>
                  )}
                </div>

                {/* Name & Category */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold truncate flex items-center gap-2">
                    {skill.name}
                    {skill.isTop && <span className="text-yellow-400">⭐</span>}
                  </h3>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border mt-1 ${getCategoryBadge(skill.category).color}`}
                  >
                    {getCategoryBadge(skill.category).text}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                {/* Edit */}
                <button
                  onClick={() => router.push(`/admin/skills/${skill._id}/edit`)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium hover:bg-purple-500/20 transition-all"
                >
                 <Edit className="w-3.5 h-3.5"/>
                  Edit
                </button>

                {/* Delete */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="px-3 py-2 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
                      <DeleteIcon size={16} />
                    </button>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="bg-black/95 backdrop-blur-xl rounded-2xl border border-white/10">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white">
                        Delete Skill
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-white/60">
                        Are you sure you want to delete{" "}
                        <strong>{skill.name}</strong>? This action cannot be
                        undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white hover:text-white text-sm hover:bg-white/10 transition-all">
                        Cancel
                      </AlertDialogCancel>

                      <AlertDialogAction
                        disabled={deletePending}
                        onClick={handleConfirmDelete}
                        className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm hover:bg-red-500/30 transition-all"
                      >
                        {deletePending ? "Deleting..." : "Yes, Delete"}
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
      {!isLoading && skills.length > 0 && (
        <p className="text-xs text-white/40 text-center">
          Showing {(currentPage - 1) * limit + 1} –{" "}
          {Math.min(currentPage * limit, totalCount)} of {totalCount} skills
        </p>
      )}
    </div>
  );
}
