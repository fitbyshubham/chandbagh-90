// src/components/ui/StallsCard.jsx
import React from "react";

export default function StallsCard({ image, offer, rating, name, stallNo }) {
  return (
    // Updated styling: Lighter shadow, rounded corners, clean background
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]">
      
      {/* Image Area */}
      <div className="relative w-full h-[120px] sm:h-[150px]">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full rounded-t-xl"
        />
        
        {/* Offer Badge (Top Left) */}
        {offer && (
          <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-bold rounded-full px-3 py-1 shadow-md">
            {offer}
          </span>
        )}
      </div>
      
      {/* Content Area */}
      <div className="p-3">
        
        {/* Rating Badge (Moved below image for cleaner look) */}
        <div className="flex justify-end items-center -mt-8 mb-2">
            <span className="bg-green-600 text-white text-sm font-bold rounded-lg flex items-center px-2.5 py-1 shadow-lg shadow-green-600/50">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-1"
                >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                {rating}
            </span>
        </div>

        {/* Name */}
        <div className="text-gray-900 font-extrabold text-lg truncate mb-1">
          {name}
        </div>
        
        {/* Stall Number */}
        <div className="flex items-center text-indigo-600 text-sm font-semibold">
          Stall No. {stallNo}
        </div>
      </div>
    </div>
  );
}