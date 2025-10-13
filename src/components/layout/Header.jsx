// src/components/layout/Header.jsx
"use client";

import { useState } from 'react';
import Image from 'next/image';

const STORY_AVATARS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
];

// Define the approximate height of the fixed header for the spacer
const HEADER_HEIGHT_PX = '74px'; 

export default function Header({ onAvatarClick }) {
  return (
    <>
      {/* 1. The Floating Header (Fixed position) */}
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

      {/* 2. The Spacer (Takes up space in the document flow) */}
      <div 
        className="pt-4 pb-2 bg-black" // 💡 KEY CHANGE: Added bg-black here
        style={{ height: HEADER_HEIGHT_PX }} 
        aria-hidden="true" 
      />
    </>
  );
}