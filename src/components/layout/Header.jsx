// src/components/layout/Header.jsx
"use client";

import { useState } from 'react';
import Image from 'next/image';

// Use local images from the public/images folder
const STORY_AVATARS = [
  "/images/hm1.jpg",
  "/images/hm2.jpg",
  "/images/hm3.jpg",
];

// REDUCED HEIGHT: Changed from 74px to 64px for tighter spacing
const HEADER_HEIGHT_PX = '64px'; 

export default function Header({ onAvatarClick }) {
  return (
    <>
      {/* Header Container (Fixed) */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 pt-4 pb-2 max-w-[420px] mx-auto pointer-events-none">
        <div className="flex items-center justify-between max-w-[375px] mx-auto bg-white/80 backdrop-blur-lg rounded-xl shadow-xl border border-white/40 py-2 px-4 pointer-events-auto transition-all duration-300">
          
          {/* Logo + Text */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6">
              <Image
                src="/logo-header.png"
                alt="Chandbagh Logo"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            <span className="text-sm font-bold text-gray-800 tracking-tight whitespace-nowrap">
              Chandbagh
            </span>
          </div>

          {/* Story Avatars */}
          <div className="flex space-x-3">
            {STORY_AVATARS.map((src, index) => (
              <button
                key={index}
                onClick={() => onAvatarClick(src)}
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

      {/* Spacer div (takes up vertical space) */}
      <div 
          className="pt-2 pb-2 bg-gray-900" // Note: This background should match the home page's dark background for a seamless look. In your dark mode home page, this should be set to the DARK_BG color, which is #1E2129.
          style={{ height: HEADER_HEIGHT_PX, backgroundColor: '#1E2129' }} // Explicitly setting the dark background here for the spacer
          aria-hidden="true" 
      />
    </>
  );
}