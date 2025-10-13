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


export default function Header({ onAvatarClick }) {
  return (
    <>
      {/* The Fixed Header Container - Added pb-2 for gap below header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 pt-4 pb-2 max-w-[420px] mx-auto pointer-events-none">
        {/* Inner div with grey background */}
        <div className="flex items-center justify-between max-w-[375px] mx-auto bg-gray-100 rounded-xl border border-white/40 py-2 px-4 pointer-events-auto transition-all duration-300">
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
            {STORY_AVATARS.map((src, index) => (
              <button
                key={index}
                onClick={() => onAvatarClick?.(src)}
                className="relative rounded-full w-[44px] h-[44px] p-[2px] overflow-hidden flex items-center justify-center shadow-md focus:outline-none focus:ring-2 focus:ring-[#ff416c]"
                style={{
                  background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                }}
                aria-label={`View story ${index + 1}`}
              >
                <div className="w-full h-full rounded-full bg-white p-[2px]">
                  <img
                    src={src}
                    alt={`Story ${index + 1}`}
                    className="w-full h-full object-cover rounded-full"
                    draggable={false}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}
