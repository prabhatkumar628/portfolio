"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-51 flex items-center justify-center bg-black/90 backdrop-blur-2xl">
      <div className="relative flex flex-col items-center gap-8">
        
        {/* Main Spinner Container */}
        <div className="relative h-32 w-32">
          {/* Background Glow */}
          <div className="absolute inset-0 rounded-full bg-linear-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 blur-3xl animate-pulse"></div>
          
          {/* Gradient Spinner */}
          <svg className="absolute inset-0 h-32 w-32 animate-spin" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#gradient1)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="70 200"
            />
          </svg>

          {/* Inner Circle */}
          <div className="absolute inset-4 flex items-center justify-center">
            <div className="h-20 w-20 rounded-full border-2 border-white/10 bg-black/40 backdrop-blur-sm flex items-center justify-center">
              {/* Pulse Dot */}
              <div className="h-4 w-4 rounded-full bg-linear-to-r from-purple-500 to-pink-500 animate-ping"></div>
              <div className="absolute h-4 w-4 rounded-full bg-linear-to-r from-purple-500 to-pink-500"></div>
            </div>
          </div>
        </div>

        {/* Brand/Loading Text */}
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
            Loading
          </h2>
          
          {/* Animated Bars */}
          <div className="flex items-end gap-1 h-5">
            <div className="w-1 bg-purple-500 rounded-full animate-bar-1"></div>
            <div className="w-1 bg-pink-500 rounded-full animate-bar-2"></div>
            <div className="w-1 bg-indigo-500 rounded-full animate-bar-3"></div>
            <div className="w-1 bg-purple-500 rounded-full animate-bar-4"></div>
            <div className="w-1 bg-pink-500 rounded-full animate-bar-5"></div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      {/* <style jsx>{`
        
      `}</style> */}
    </div>
  );
}