"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const HEADER_HEIGHT_PX = "74px";

const STORY_AVATARS = [
  {
    name: "Old School",
    src: "/photos/omb.jpg",
    stories: ["/Photos/omb.jpg", "/Photos/p.jpg", "/Photos/p2.jpg"],
  },
  {
    name: "Old School",
    src: "/photos/do.jpg",
    stories: ["/Photos/do.jpg", "/Photos/p3.jpg", "/Photos/p4.jpg"],
  },
  {
    name: "Headmasters",
    src: "/photos/af1.jpeg",
    stories: ["/Photos/af1.jpeg", "/Photos/hm1.jpg", "/Photos/hm2.jpg"],
  },
];

export default function Header() {
  const [activeStory, setActiveStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const openStory = (storyGroup) => {
    setActiveStory(storyGroup);
    setCurrentIndex(0);
  };

  const closeStory = () => {
    setActiveStory(null);
    setCurrentIndex(0);
  };

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 pt-4 pb-2 max-w-[420px] mx-auto pointer-events-none">
        <div className="flex items-center justify-between max-w-[375px] mx-auto bg-gray-100 rounded-xl border border-white/40 py-2 px-4 pointer-events-auto">
          {/* Logo + Subheading */}
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
            {STORY_AVATARS.map((storyGroup, index) => (
              <button
                key={index}
                onClick={() => openStory(storyGroup)}
                className="relative rounded-full w-[44px] h-[44px] p-[2px] overflow-hidden flex items-center justify-center shadow-md focus:outline-none focus:ring-2 focus:ring-[#ff416c]"
                style={{
                  background:
                    "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                }}
              >
                <div className="w-full h-full rounded-full bg-white p-[2px]">
                  <img
                    src={storyGroup.src}
                    alt={storyGroup.name}
                    className="w-full h-full object-cover rounded-full"
                    draggable={false}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* STORY MODAL */}
      <AnimatePresence>
        {activeStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4"
            onClick={closeStory}
          >
            <div
              className="relative w-full max-w-md h-[70vh] bg-black rounded-xl overflow-hidden flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-10 text-white bg-black/50 rounded-full p-1 hover:bg-black/70 transition-colors"
                onClick={closeStory}
              >
                <X size={20} />
              </button>

              {/* Story Image (Fit Entirely Inside) */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${activeStory.name}-${currentIndex}`}
                  src={activeStory.stories[currentIndex]}
                  alt={`${activeStory.name} story ${currentIndex + 1}`}
                  className="absolute inset-0 w-full h-full object-contain bg-black"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              {activeStory.stories.length > 1 && (
                <>
                  <button
                    className="absolute left-4 z-10 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevStory();
                    }}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    className="absolute right-4 z-10 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextStory();
                    }}
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Story Info + Dots */}
              <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center px-4">
                <span className="text-white text-sm font-medium mb-2">
                  {activeStory.name}
                </span>
                <div className="flex space-x-1">
                  {activeStory.stories.map((_, idx) => (
                    <button
                      key={idx}
                      className={`w-2 h-2 rounded-full ${
                        idx === currentIndex ? "bg-white" : "bg-white/50"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIndex(idx);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
