"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useDeleteMessageById,
  useGetAdminMessages,
  useMarkAllAsReadMessages,
} from "@/hooks/useAdminMessages";
import Loading from "../../(public)/loading";
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
} from "../../../components/ui/alert-dialog";
import { DeleteIcon } from "lucide-react";
// import { useGetAdminMessages, useDeleteMessage, useMarkAllAsRead } from "@/hooks/useAdminMessages";

export default function MessagesPage() {
  const router = useRouter();

  // ─── States ──────────────────────────────────
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // ─── Delete Modal ────────────────────────────
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: string }>(
    {
      open: false,
      id: "",
    },
  );

  // ─── Hooks ───────────────────────────────────
  const { data, isLoading, isError, refetch } = useGetAdminMessages({
    page,
    limit,
    status,
    search,
  });
  const markAllReadMutation = useMarkAllAsReadMessages();
  const { mutate: deleteMutate, isPending: deletePending } =
    useDeleteMessageById();

  // ─── Extracted Data ──────────────────────────
  const messages = data?.messages || [];
  const totalMessages = data?.totalMessages || 0;
  const unreadCount = data?.unreadCount || 0;
  const replyMessageCount = data?.replyMessageCount || 0;
  const spamCount = data?.spanCount || 0;

  // ─── Pagination ──────────────────────────────
  const totalPages = data?.pagination?.totalPages || 1;
  const currentPage = data?.pagination?.currentPage || 1;
  const hasNextPage = data?.pagination?.hasNextPage || false;
  const hasPrevPage = data?.pagination?.hasPrevPage || false;

  // ─── Handlers ────────────────────────────────
  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const handleFilterChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const handleDelete = (id: string) => {
    setDeleteModal({ open: true, id });
  };

  const handleConfirmDelete = async () => {
    await deleteMutate(deleteModal.id);
    setDeleteModal({ open: false, id: "" });
  };

  // ─── Badges ──────────────────────────────────
  const getStatusBadge = (status: string) => {
    const badges: Record<string, { text: string; color: string }> = {
      new: {
        text: "New",
        color: "bg-green-500/20 text-green-400 border-green-500/30",
      },
      read: {
        text: "Read",
        color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      },
      replied: {
        text: "Replied",
        color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      },
      archived: {
        text: "Archived",
        color: "bg-gray-500/20 text-gray-400 border-gray-500/30",
      },
      spam: {
        text: "Spam",
        color: "bg-red-500/20 text-red-400 border-red-500/30",
      },
    };
    return badges[status] || badges.read;
  };

  const getPriorityBadge = (priority: string) => {
    const badges: Record<string, { text: string; color: string }> = {
      low: {
        text: "🟢 Low",
        color: "bg-green-500/20 text-green-400 border-green-500/30",
      },
      medium: {
        text: "🟡 Medium",
        color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      },
      high: {
        text: "🔴 High",
        color: "bg-red-500/20 text-red-400 border-red-500/30",
      },
    };
    return badges[priority] || badges.medium;
  };

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  // ─── Stats & Filters Data ────────────────────
  const stats = [
    {
      label: "Total",
      count: totalMessages,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "New",
      count: unreadCount,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Replied",
      count: replyMessageCount,
      color: "from-purple-500 to-pink-500",
    },
    { label: "Spam", count: spamCount, color: "from-red-500 to-orange-500" },
  ];

  const filters = [
    { label: "All", value: "all", count: totalMessages },
    { label: "New", value: "new", count: unreadCount },
    { label: "Read", value: "read", count: totalMessages - unreadCount },
    { label: "Replied", value: "replied", count: replyMessageCount },
    { label: "Spam", value: "spam", count: spamCount },
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
    <>
      <div className="space-y-6">
        {(markAllReadMutation.isPending || deletePending) && <Loading />}
        {/* {} */}
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
            <p className="text-white/60">
              Manage and respond to contact messages
            </p>
          </div>
          <button
            onClick={() => markAllReadMutation.mutate()}
            disabled={markAllReadMutation.isPending}
            className="px-4 py-2 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50"
          >
            {markAllReadMutation.isPending ? "Updating..." : "Mark All as Read"}
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

        {/* Search */}
        <div className="flex gap-2">
          <div className="flex-1 flex items-center bg-black/40 border border-white/10 rounded-xl px-4 py-2 gap-2">
            <svg
              className="w-4 h-4 text-white/40 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by name, email or message..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none text-sm"
            />
            {searchInput && (
              <button
                onClick={() => {
                  setSearchInput("");
                  setSearch("");
                  setPage(1);
                }}
                className="text-white/40 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
          <button
            onClick={handleSearch}
            className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-white text-sm hover:bg-white/20 transition-all"
          >
            Search
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => handleFilterChange(f.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                status === f.value
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
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-white/10 bg-black/40 animate-pulse"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-28 bg-white/10 rounded" />
                    <div className="h-4 w-16 bg-white/10 rounded" />
                  </div>
                  <div className="h-4 w-20 bg-white/10 rounded" />
                </div>
                <div className="h-3 w-48 bg-white/10 rounded mt-3" />
                <div className="h-3 w-full bg-white/10 rounded mt-2" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && !isLoading && (
          <div className="p-8 text-center rounded-2xl border border-red-500/30 bg-red-500/10">
            <p className="text-red-400 mb-3">Failed to load messages</p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 text-sm hover:bg-red-500/30 transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && messages.length === 0 && (
          <div className="p-16 text-center rounded-2xl border border-white/10 bg-black/40">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-white/60">No messages found</p>
          </div>
        )}

        {/* Messages List */}
        {!isLoading && !isError && messages.length > 0 && (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg._id.toString()}
                className="p-5 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl hover:bg-white/5 transition-all"
              >
                {/* Top Row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Name + Badges */}
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <h3 className="text-white font-semibold">{msg.name}</h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(msg.status).color}`}
                      >
                        {getStatusBadge(msg.status).text}
                      </span>
                      {msg.priority && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getPriorityBadge(msg.priority).color}`}
                        >
                          {getPriorityBadge(msg.priority).text}
                        </span>
                      )}
                    </div>
                    {/* Email */}
                    <p className="text-sm text-white/50 truncate">
                      {msg.email}
                    </p>
                    {/* Subject */}
                    {msg.subject && (
                      <p className="text-sm text-white/70 font-medium mt-1">
                        {msg.subject}
                      </p>
                    )}
                  </div>
                  {/* Date */}
                  <span className="text-xs text-white/40 whitespace-nowrap shrink-0">
                    {formatDate(msg.createdAt)}
                  </span>
                </div>

                {/* Message Preview */}
                <p className="text-sm text-white/50 line-clamp-2 mt-2">
                  {msg.message}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
                  {/* View */}
                  <button
                    onClick={() => router.push(`/admin/messages/${msg._id}`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium hover:bg-blue-500/20 transition-all"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7s-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    View
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() =>
                      router.push(`/admin/messages/${msg._id}/edit`)
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium hover:bg-purple-500/20 transition-all"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </button>

                  <AlertDialog>
                    {/* Trigger button */}
                    <AlertDialogTrigger asChild>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20 transition-all ml-auto">
                        <DeleteIcon size={20} />
                        Delete
                      </button>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="bg-black/60 rounded-2xl border border-white/10">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">
                          Delete Message
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this message? This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm hover:bg-white/10 hover:text-white transition-all">
                          Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                          disabled={deletePending}
                          onClick={() => deleteMutate(msg._id.toString())}
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
        {!isLoading && messages.length > 0 && (
          <p className="text-xs text-white/40 text-center">
            Showing {(currentPage - 1) * limit + 1} –{" "}
            {Math.min(currentPage * limit, totalMessages)} of {totalMessages}{" "}
            messages
          </p>
        )}
      </div>
    </>
  );
}
