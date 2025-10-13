"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const HEADER_HEIGHT_PX = "74px";

const STORY_AVATARS = [
  {
    name: "Old Main Building",
    src: "/photos/omb.jpg",
    stories: ["/photos/omb.jpg", "/photos/omb.jpg", "/photos/omb.jpg"],
  },
  {
    name: "Old Doon School",
    src: "/photos/do.jpg",
    stories: ["/photos/do.jpg", "/photos/do.jpg", "/photos/do.jpg"],
  },
  {
    name: "Headmasters",
    src: "/photos/af1.jpeg",
    stories: ["/photos/af1.jpeg", "/photos/hm1.jpg", "/photos/hm2.jpg"],
  },
];

export default function Header() {
  const [activeStory, setActiveStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance every 3 s
  useEffect(() => {
    if (!activeStory) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev < activeStory.stories.length - 1 ? prev + 1 : 0
      );
    }, 3000);
    return () => clearInterval(timer);
  }, [activeStory]);

  // Move to previous or next story
  const nextStory = () => {
    setCurrentIndex((prev) =>
      prev < activeStory.stories.length - 1 ? prev + 1 : 0
    );
  };

  const prevStory = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : activeStory.stories.length - 1
    );
  };

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40 pt-4 pb-2 max-w-[420px] mx-[10px] pointer-events-none">
        <div className="flex items-center justify-between max-w-[375px] mx-auto bg-white/80 backdrop-blur-lg rounded-xl shadow-xl border border-white/40 py-2 px-4 pointer-events-auto transition-all duration-300">
          
          {/* Logo + Text */}
          <div className="flex flex-col items-start leading-tight">
            <div className="flex items-center">
              <div className="w-6 h-6">
                <Image
                  src="/logo-header.png"
                  alt="Chandbagh Logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-bold text-gray-800 tracking-tight whitespace-nowrap ml-[7px]">
                Chandbagh
              </span>
            </div>
            <span className="text-[10px] text-gray-500 font-small ml-8 -mt-1">
              90 Years of Legacy
            </span>
          </div>

          {/* Story Avatars */}
          <div className="flex space-x-3">
            {STORY_AVATARS.map((avatar, index) => (
              <div key={index} className="flex flex-col items-center space-y-1">
                <button
                  onClick={() => {
                    setActiveStory(avatar);
                    setCurrentIndex(0);
                  }}
                  className="relative rounded-full w-[44px] h-[44px] p-[2px] overflow-hidden flex items-center justify-center shadow-md focus:outline-none focus:ring-2 focus:ring-[#ff416c]"
                  style={{
                    background:
                      "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
                  }}
                >
                  <div className="w-full h-full rounded-full bg-white p-[2px]">
                    <img
                      src={avatar.src}
                      alt={avatar.name}
                      className="w-full h-full object-cover rounded-full"
                      draggable={false}
                    />
                  </div>
                </button>
                <span className="text-[10px] font-medium text-gray-700 leading-tight ml-[15px] text-center w-[60px] truncate">
                  {avatar.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* SPACER */}
      <div
        className="pt-4 pb-2 bg-black"
        style={{ height: HEADER_HEIGHT_PX }}
        aria-hidden="true"
      />

      {/* STORY VIEWER */}
      <AnimatePresence>
        {activeStory && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveStory(null)}
          >
            <div
              className="relative w-full max-w-sm aspect-[9/16] bg-black rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={currentIndex}
                src={activeStory.stories[currentIndex]}
                alt={activeStory.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
              />

              {/* Progress bar */}
              <div className="absolute top-0 left-0 right-0 flex space-x-1 p-2">
                {activeStory.stories.map((_, i) => (
                  <div
                    key={i}
                    className={`h-[3px] flex-1 rounded-full transition-all duration-300 ${
                      i <= currentIndex ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>

              {/* Navigation arrows */}
              <button
                onClick={prevStory}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextStory}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
              >
                <ChevronRight size={24} />
              </button>

              {/* Close button */}
              <button
                onClick={() => setActiveStory(null)}
                className="absolute top-3 right-3 text-white bg-black/50 rounded-full w-8 h-8 flex items-center justify-center"
              >
                <X size={20} />
              </button>

              {/* Label */}
              <div className="absolute bottom-3 left-0 right-0 text-center text-white font-medium text-sm">
                {activeStory.name}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
