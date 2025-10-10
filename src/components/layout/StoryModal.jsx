// src/components/layout/StoryModal.jsx
"use client";

export default function StoryModal({ isOpen, imageSrc, onClose }) {
  if (!isOpen) return null;

  return (
    // Full screen background with high z-index
    <div className="fixed inset-0 z-50 bg-black">
      
      {/* Close Button - Stays on top */}
      <button
        onClick={onClose}
        // Increased size for easier tapping
        className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white backdrop-blur-sm"
        aria-label="Close"
      >
        <span className="text-2xl font-light">×</span>
      </button>

      {/* Fullscreen Image Container */}
      <div className="h-full w-full flex items-center justify-center touch-pan-y">
        <img
          src={imageSrc}
          alt="Story"
          // 💡 KEY CHANGE: Use object-cover to make the image fill the screen 
          // (it might crop the edges slightly, which is the standard IG story behavior)
          className="w-full h-full object-cover" 
          draggable={false}
        />
      </div>
    </div>
  );
}