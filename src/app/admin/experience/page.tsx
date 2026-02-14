"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { DeleteIcon, Plus, Briefcase, MapPin, Calendar, Edit } from "lucide-react";
import Loading from "../../(public)/loading";
import { useGetAdminExperience } from "../../../hooks/useAdminExperience";
import { useAdminLayoutContext } from "../../../context/adminLayoutContext/AdminLayoutContext";

export default function ExperiencesPage() {
  const router = useRouter();
  // ─── States ──────────────────────────────────
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [employmentType, setEmploymentType] = useState("all");
  const { globalSearch } = useAdminLayoutContext();
  const effectivePage = globalSearch ? 1 : page;
  const { data, isLoading, isError } = useGetAdminExperience({
    page: effectivePage,
    limit,
    search: globalSearch,
    employmentType,
  });

  // ─── Mock Data ────────────────────────────
  const deletePending = false;

  // ─── Extracted Data ──────────────────────────
  const experiences = data?.experiences || [];
  const totalCount = data?.stats.totalCount || 0;
  const fullTimeCount = data?.stats.fullTimeCount || 0;
  const partTimeCount = data?.stats.partTimeCount || 0;
  const contractCount = data?.stats.contractCount || 0;
  const freelanceCount = data?.stats.freelanceCount || 0;
  const internshipCount = data?.stats.internshipCount || 0;
  const filterCount = data?.stats.filterCount || 0;


  // ─── Pagination ──────────────────────────────
  const totalPages = data?.pagination?.totalPages || 1;
  const currentPage = data?.pagination?.currentPage || 1;
  const hasNextPage = data?.pagination?.hasNextPage || false;
  const hasPrevPage = data?.pagination?.hasPrevPage || false;

  const handleFilterChange = (value: string) => {
    setEmploymentType(value);
    setPage(1);
  };

  // ─── Badges ──────────────────────────────────
  const getEmploymentTypeBadge = (type: string) => {
    const badges: Record<string, { text: string; color: string }> = {
      "full-time": {
        text: "Full-time",
        color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      },
      "part-time": {
        text: "Part-time",
        color: "bg-green-500/20 text-green-400 border-green-500/30",
      },
      contract: {
        text: "Contract",
        color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      },
      freelance: {
        text: "Freelance",
        color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      },
      internship: {
        text: "Internship",
        color: "bg-pink-500/20 text-pink-400 border-pink-500/30",
      },
    };
    return badges[type] || badges["full-time"];
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Present";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const getDuration = (start: Date, end: Date | null) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    const months = Math.floor(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30),
    );
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years > 0) {
      return `${years}y ${remainingMonths}m`;
    }
    return `${months}m`;
  };

  const filters = [
    { label: "All", value: "all", count: totalCount },
    { label: "Full-time", value: "full-time", count: fullTimeCount },
    { label: "Part-time", value: "part-time", count: partTimeCount },
    { label: "Contract", value: "contract", count: contractCount },
    { label: "Freelance", value: "freelance", count: freelanceCount },
    { label: "Internship", value: "internship", count: internshipCount },
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

  return (
    <div className="space-y-6">
      {deletePending && <Loading />}

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Work Experience
          </h1>
          <p className="text-white/60">Manage your professional work history</p>
        </div>
        <button
          onClick={() => router.push("/admin/experience/new")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
        >
          <Plus size={18} />
          Add Experience
        </button>
      </div>

      {/* Type Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => handleFilterChange(f.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              employmentType === f.value
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
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-white/10 bg-black/40 animate-pulse"
            >
              <div className="flex justify-between mb-4">
                <div className="h-6 w-48 bg-white/10 rounded" />
                <div className="h-5 w-24 bg-white/10 rounded" />
              </div>
              <div className="h-4 w-32 bg-white/10 rounded mb-3" />
              <div className="h-3 w-full bg-white/10 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {isError && !isLoading && (
        <div className="p-8 text-center rounded-2xl border border-red-500/30 bg-red-500/10">
          <p className="text-red-400 mb-3">Failed to load experiences</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 text-sm hover:bg-red-500/30 transition-all"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && experiences.length === 0 && (
        <div className="p-16 text-center rounded-2xl border border-white/10 bg-black/40">
          <div className="text-6xl mb-4">💼</div>
          <p className="text-white/60 mb-4">No work experience found</p>
          <button
            onClick={() => router.push("/admin/experience/new")}
            className="px-4 py-2 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white text-sm hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            Add Your First Experience
          </button>
        </div>
      )}

      {/* Experiences List */}
      {!isLoading && !isError && experiences.length > 0 && (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp._id.toString()}
              className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl hover:bg-white/5 hover:border-purple-500/30 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h3 className="text-xl font-bold text-white">
                      {exp.position}
                    </h3>
                    {exp.isCurrent && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                        Current
                      </span>
                    )}
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getEmploymentTypeBadge(exp.employmentType).color}`}
                    >
                      {getEmploymentTypeBadge(exp.employmentType).text}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-white/60 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Briefcase size={14} />
                      <span className="font-medium text-white/80">
                        {exp.company}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} />
                      <span>{exp.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      <span>
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}{" "}
                        · {getDuration(exp.startDate, exp.endDate)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-white/60 mb-4 line-clamp-2">
                {exp.description}
              </p>

              {/* Achievements */}
              {exp.achievements && exp.achievements.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-white/40 mb-2">
                    Key Achievements:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.achievements.slice(0, 3).map((achievement, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded-lg bg-white/5 text-xs text-white/60 border border-white/10"
                      >
                        ✓{" "}
                        {achievement.length > 40
                          ? achievement.substring(0, 40) + "..."
                          : achievement}
                      </span>
                    ))}
                    {exp.achievements.length > 3 && (
                      <span className="px-2 py-1 text-xs text-white/40">
                        +{exp.achievements.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                <button
                  onClick={() =>
                    router.push(`/admin/experience/${exp._id}/edit`)
                  }
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium hover:bg-purple-500/20 transition-all"
                >
                  <Edit className="w-3.5 h-3.5"/>
                  Edit
                </button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="px-3 py-2 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
                      <DeleteIcon size={16} />
                    </button>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="bg-black/95 backdrop-blur-xl rounded-2xl border border-white/10">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white">
                        Delete Experience
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-white/60">
                        Are you sure you want to delete{" "}
                        <strong>{exp.position}</strong> at{" "}
                        <strong>{exp.company}</strong>? This action cannot be
                        undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm hover:bg-white/10 transition-all">
                        Cancel
                      </AlertDialogCancel>

                      <AlertDialogAction
                        disabled={deletePending}
                        onClick={() => console.log("Delete", exp._id)}
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
      {!isLoading && experiences.length > 0 && (
        <p className="text-xs text-white/40 text-center">
          Showing {(currentPage - 1) * limit + 1} –{" "}
          {Math.min(currentPage * limit, filterCount)} of{" "}
          {filterCount} experiences
        </p>
      )}
    </div>
  );
}
