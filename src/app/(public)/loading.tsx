"use client";

import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl">
      <div className="relative flex items-center justify-center">
        
        {/* soft glow */}
        <div className="absolute h-28 w-28 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />

        {/* rotating gradient ring */}
        <div className="relative h-20 w-20 animate-spin rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 p-[3px]">
          
          {/* inner dark ring */}
          <div className="flex h-full w-full items-center justify-center rounded-full bg-black">
            
            {/* avatar pulse */}
            <div className="relative h-12 w-12 animate-pulse rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 p-[2px]">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-black">
                <Image
                  src="/images/home/avatar/pra.webp"
                  alt="Prabhat"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
