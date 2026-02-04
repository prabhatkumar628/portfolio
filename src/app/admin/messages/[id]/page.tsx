"use client";
import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  useDeleteMessageById,
  useGetMessageById,
  useUpdateMessageById,
} from "@/hooks/useAdminMessages";
import {
  ArrowBigLeft,
  DeleteIcon,
  MailWarning,
  NotebookPen,
  Reply,
} from "lucide-react";
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
} from "../../../../components/ui/alert-dialog";
import Loading from "../../../(public)/loading";
import PopInputModal from "./PopInputModal";

export default function ViewMessagePage() {
  const [isForReplyorNote, setIsFor] = useState<"reply" | "note">("reply");
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();
  const { id } = useParams();
  const messageId = Array.isArray(id) ? id[0] : id;

  const { data, isLoading, isError } = useGetMessageById(messageId!);
  const { mutate: updateMutate, isPending } = useUpdateMessageById();
  const { mutateAsync: deleteAsync, isPending: deletePending } =
    useDeleteMessageById();

  const message = data;

  const handleDelete = async () => {
    if (!messageId) return;

    try {
      await deleteAsync(messageId);
      router.replace("/admin/messages");
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarkSpam = () => {
    updateMutate({
      id: messageId!,
      payload: { isSpam: true, status: "spam" },
    });
  };

  const handleReply = () => {
    setIsOpen(true);
    setIsFor("reply");
    if (data?.reply) {
      setInputValue(data.reply);
    }
  };

  const handleAdminNote = () => {
    setIsOpen(true);
    setIsFor("note");
    if (data?.adminNotes) {
      setInputValue(data.adminNotes);
    }
  };

  const onSubmitPopModel = () => {
    if (isForReplyorNote === "note") {
      return updateMutate({
        id: messageId!,
        payload: { adminNotes: inputValue },
      });
    }
    if (isForReplyorNote === "reply") {
      return updateMutate({
        id: messageId!,
        payload: { reply: inputValue, status: "replied",repliedAt: new Date() },
      });
    }
    setIsOpen(false);
  };

  // ─── Badges ────────────────────────────────
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

  // ─── Loading ───────────────────────────────
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-40 bg-white/10 rounded animate-pulse" />
        <div className="p-6 rounded-2xl border border-white/10 bg-black/40 animate-pulse space-y-4">
          <div className="h-6 w-48 bg-white/10 rounded" />
          <div className="h-4 w-64 bg-white/10 rounded" />
          <div className="h-4 w-56 bg-white/10 rounded" />
          <div className="h-32 w-full bg-white/10 rounded" />
        </div>
      </div>
    );
  }

  // ─── Error ─────────────────────────────────
  if (isError || !message) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="p-12 text-center rounded-2xl border border-red-500/30 bg-red-500/10">
          <p className="text-red-400 mb-3">Message not found</p>
          <button
            onClick={() => router.push("/admin/messages")}
            className="px-4 py-2 rounded-xl bg-white/10 text-white text-sm hover:bg-white/20 transition-all"
          >
            ← Back to Messages
          </button>
        </div>
      </div>
    );
  }

  // ──────────────── RENDER ─────────────────────
  return (
    <>
      <div className="space-y-6">
        <PopInputModal
          inputValue={inputValue}
          setInputValue={setInputValue}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={onSubmitPopModel}
          isPending={isPending}
          isFor={isForReplyorNote}
        />
        {isPending && <Loading />}
        {/* Back Button */}
        <button
          onClick={() => router.push("/admin/messages")}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-all text-sm"
        >
          <ArrowBigLeft />
          Back to Messages
        </button>

        {/* Header Card */}
        <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">{message.name}</h1>
            <div className="flex gap-2 flex-wrap">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(message.status).color}`}
              >
                {getStatusBadge(message.status).text}
              </span>
              {message.priority && (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityBadge(message.priority).color}`}
                >
                  {getPriorityBadge(message.priority).text}
                </span>
              )}
            </div>
          </div>

          {/* Contact Info Grid */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-white/40 mb-1">Email</p>
              <a
                href={`mailto:${message.email}`}
                className="text-purple-400 hover:text-purple-300 text-sm transition-all"
              >
                {message.email}
              </a>
            </div>
            {message.phone?.number && (
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-white/40 mb-1">Phone</p>
                <a
                  href={`tel:${message.phone.countryCode}${message.phone.number}`}
                  className="text-purple-400 hover:text-purple-300 text-sm transition-all"
                >
                  {message.phone.countryCode} {message.phone.number}
                </a>
              </div>
            )}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-white/40 mb-1">Received</p>
              <p className="text-white/70 text-sm">
                {new Date(message.createdAt).toLocaleString()}
              </p>
            </div>
            {message.ipAddress && (
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-white/40 mb-1">IP Address</p>
                <p className="text-white/70 text-sm">{message.ipAddress}</p>
              </div>
            )}
          </div>

          {/* Subject */}
          {message.subject && (
            <div className="mb-4">
              <p className="text-xs text-white/40 mb-1">Subject</p>
              <p className="text-white font-medium">{message.subject}</p>
            </div>
          )}

          {/* Message */}
          <div>
            <p className="text-xs text-white/40 mb-2">Message</p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
                {message.message}
              </p>
            </div>
          </div>
        </div>

        {/* Reply Section (if exists) */}
        {message.reply && (
          <div className="p-6 rounded-2xl border border-purple-500/20 bg-purple-500/5 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-3">
              <svg
                className="w-4 h-4 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h10a8 8 0 018 8v2M3 10L9 4m-6 6l6 6"
                />
              </svg>
              <p className="text-purple-400 text-sm font-medium">Your Reply</p>
              <p className="text-xs text-white/40 ml-auto">
                {new Date(message.repliedAt).toLocaleTimeString()}
              </p>
            </div>
            <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
              {message.reply}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
          <p className="text-xs text-white/40 mb-3">Actions</p>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleReply}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-400 text-sm hover:bg-purple-500/20 transition-all"
            >
              <Reply size={20} />
              {message.reply ? "Update Reply" : "Reply"}
            </button>

            <button
              onClick={handleAdminNote}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm hover:bg-white/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <NotebookPen size={20} />
              My Note
            </button>

            <button
              disabled={message.status === "spam"}
              onClick={handleMarkSpam}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-400 text-sm hover:bg-orange-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <MailWarning size={20} />
              Mark Spam
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
                    Are you sure you want to delete this message? This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm hover:bg-white/10 hover:text-white transition-all">
                    Cancel
                  </AlertDialogCancel>

                  <AlertDialogAction
                    disabled={deletePending}
                    onClick={handleDelete}
                    className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm hover:bg-red-500/30 transition-all"
                  >
                    {deletePending ? "Deleting..." : "Yes, Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </>
  );
}
