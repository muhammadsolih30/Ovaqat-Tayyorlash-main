import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { initialComments, Comment } from "@/data/comments";
import { ThumbsUp, MessageSquare, Send, Sparkles } from "lucide-react";

interface CommentSectionProps {
  videoId: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ videoId }) => {
  const { user, isLoggedIn, openLoginModal, addToCommented } = useAuth();
  const [comments, setComments] = useState<Comment[]>(() => {
    return initialComments.filter((c) => c.videoId === videoId || c.videoId === "v1");
  });
  const [inputText, setInputText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    const newComment: Comment = {
      id: "c_" + Date.now(),
      videoId,
      authorName: user?.name || "Foydalanuvchi",
      authorAvatar: user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
      text: inputText.trim(),
      createdAt: "Hozirgina",
      likes: 0,
      liked: false,
    };

    setComments([newComment, ...comments]);
    addToCommented(videoId);
    setInputText("");
    setIsFocused(false);
  };

  const handleLike = (id: string) => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const liked = !c.liked;
          return {
            ...c,
            liked,
            likes: liked ? c.likes + 1 : Math.max(0, c.likes - 1),
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="mt-8 border-t border-zinc-200 dark:border-zinc-800/80 pt-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <MessageSquare size={20} className="text-emerald-500" />
          <span>{comments.length} ta izoh</span>
        </h3>
        <span className="text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/60 px-2.5 py-1 rounded-full border border-zinc-300 dark:border-zinc-700/50">
          Eng ommabop
        </span>
      </div>

      {/* Add comment input area (YouTube style) */}
      <div className="flex gap-3.5 mb-8">
        <img
          src={
            user?.avatar ||
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
          }
          alt={user?.name || "Avatar"}
          className="w-10 h-10 rounded-full object-cover border border-zinc-300 dark:border-zinc-700/70 flex-shrink-0"
        />
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onFocus={() => {
                if (!isLoggedIn) {
                  openLoginModal();
                } else {
                  setIsFocused(true);
                }
              }}
              placeholder={
                isLoggedIn
                  ? "Izoh qoldiring..."
                  : "Izoh yozish uchun tizimga kiring..."
              }
              className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 focus:border-emerald-500 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 outline-none transition-colors"
            />
            {isFocused && (
              <div className="flex justify-end gap-2 mt-3 animate-fade-in">
                <button
                  type="button"
                  onClick={() => {
                    setInputText("");
                    setIsFocused(false);
                  }}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-white hover:bg-zinc-100 dark:bg-zinc-800 transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    inputText.trim()
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/30"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-500 cursor-not-allowed"
                  }`}
                >
                  <Send size={12} />
                  Izoh qoldirish
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-5">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3.5 group">
            <img
              src={comment.authorAvatar}
              alt={comment.authorName}
              className="w-9 h-9 rounded-full object-cover border border-zinc-200 dark:border-zinc-800 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  {comment.authorName}
                </span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-500">
                  {comment.createdAt}
                </span>
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed break-words">
                {comment.text}
              </p>
              {/* Like / Reply row */}
              <div className="flex items-center gap-4 mt-2">
                <button
                  onClick={() => handleLike(comment.id)}
                  className={`flex items-center gap-1.5 text-xs transition-colors ${
                    comment.liked
                      ? "text-emerald-400 font-medium"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:text-zinc-200"
                  }`}
                >
                  <ThumbsUp
                    size={13}
                    fill={comment.liked ? "currentColor" : "none"}
                  />
                  <span>{comment.likes > 0 ? comment.likes : ""}</span>
                </button>
                <button
                  onClick={() => {
                    if (!isLoggedIn) openLoginModal();
                    else setIsFocused(true);
                  }}
                  className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:text-zinc-200 transition-colors"
                >
                  Javob berish
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
