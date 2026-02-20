"use client";

import "@/app/globals.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useSkills } from "../../../hooks/usePublic";
import Image from "next/image";

interface Skill {
  name: string;
  emoji: string;
  category: "frontend" | "backend" | "tools";
}

export default function SkillsSlider() {
  const { data: skillData } = useSkills();

  // Category colors
  const getCategoryStyle = (category: Skill["category"]) => {
    const styles = {
      frontend: {
        gradient: "from-purple-500/20 to-pink-500/20",
        border: "border-purple-500/50",
        text: "text-purple-400/60",
        label: "Frontend",
      },
      backend: {
        gradient: "from-green-500/20 to-emerald-500/20",
        border: "border-green-500/50",
        text: "text-green-400/60",
        label: "Backend",
      },
      tools: {
        gradient: "from-blue-500/20 to-cyan-500/20",
        border: "border-blue-500/50",
        text: "text-blue-400/60",
        label: "Tools",
      },
    };
    return styles[category];
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6">
      <div className="flex flex-wrap items-center gap-4 md:gap-6 m-auto justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-linear-to-r from-purple-500 to-pink-500"></div>
          <span className="text-sm text-white/60">Frontend</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-linear-to-r from-green-500 to-emerald-500"></div>
          <span className="text-sm text-white/60">Backend</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-linear-to-r from-blue-500 to-cyan-500"></div>
          <span className="text-sm text-white/60">Tools</span>
        </div>
      </div>

      {/* Swiper Slider */}
      <div className="w-full">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 24,
            },
          }}
          className="skills-swiper"
        >
          {skillData?.topSkills.map((skill, index) => {
            const style = getCategoryStyle(skill.category);
            return (
              <SwiperSlide key={index}>
                <div className="group relative h-full">
                  {/* Glow Effect */}
                  <div
                    className={`absolute inset-0 bg-linear-to-r ${style.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  ></div>

                  {/* Card */}
                  <div
                    className={`relative p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm hover:border-${style.border.split("-")[1]}-500/50 hover:bg-white/5 transition-all duration-300 text-center h-full flex flex-col items-center justify-center`}
                  >
                    <div className="mb-3 flex items-center justify-center">
                      <div className="w-10 h-10 flex items-center justify-center">
                        {skill.image?.url ? (
                          <Image
                            src={skill.image.url}
                            alt={skill.name}
                            width={48}
                            height={48}
                            className="w-10 h-10 object-contain"
                          />
                        ) : (
                          <span className="text-3xl leading-none">
                            {skill.emoji}
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="text-sm font-medium text-white/90">
                      {skill.name}
                    </h3>
                    <span className={`text-xs ${style.text} mt-1 block`}>
                      {style.label}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .skills-swiper {
          padding: 20px 0 60px 0;
        }

        .skills-swiper .swiper-pagination {
          bottom: 20px;
        }

        .skills-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.3);
          opacity: 1;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }

        .skills-swiper .swiper-pagination-bullet-active {
          background: linear-gradient(to right, #a855f7, #ec4899);
          width: 24px;
          border-radius: 4px;
        }

        /* Mobile adjustments */
        @media (max-width: 640px) {
          .skills-swiper {
            padding: 20px 0 50px 0;
          }
        }
      `}</style>
    </div>
  );
}
