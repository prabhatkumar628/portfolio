import { Dispatch, SetStateAction } from "react";

export default function PopInputModal({
  inputValue,
  setInputValue,
  isFor,
  isOpen,
  onClose,
  onSubmit,
  isPending,
}: {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  isFor: "reply" | "note";
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reply: string) => void;
  isPending: boolean;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg mx-4 p-6 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-xl">
        <h3 className="text-lg font-bold text-white mb-4">
          {isFor === "reply" ? "Reply to Message" : "Add note for this"}
        </h3>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={
            isFor === "reply" ? "Write your reply..." : "Write note for this..."
          }
          rows={5}
          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder:text-white/40 outline-none resize-none focus:border-purple-500/50 transition-all text-sm"
        />
        <div className="flex gap-3 justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm hover:bg-white/10 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSubmit(inputValue);
              setInputValue("");
              onClose();
            }}
            disabled={!inputValue.trim() || isPending}
            className="px-4 py-2 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending
              ? "Sending..."
              : isFor === "reply"
                ? "Send Reply"
                : "Add Note"}
          </button>
        </div>
      </div>
    </div>
  );
}
