// src/components/ui/StallsCard.jsx
import React from 'react';
import Link from 'next/link';

export default function StallsCard({ image, name, rating, stallNo, offer }) {
  // Create a slug from the restaurant name for the URL
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  return (
    <Link href={`/order/menu/${slug}`}>
      <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
        {/* Image with overlay gradient */}
        <div className="relative h-36 w-full overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Rating badge on image */}
          <div className="absolute top-2 right-2 flex items-center bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-lg">
            <span className="text-orange-500 text-xs font-bold">★</span>
            <span className="text-xs font-bold text-gray-800 ml-1">{rating}</span>
          </div>

          {/* Offer badge on image */}
          {offer && (
            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow-lg">
              {offer}
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="p-3">
          <div className="mb-3">
            <h3 className="font-bold text-gray-900 text-sm mb-1 truncate group-hover:text-orange-600 transition-colors">
              {name}
            </h3>
            <div className="flex items-center text-xs text-gray-500">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Stall {stallNo}</span>
            </div>
          </div>
          
          {/* Action Button */}
          <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center gap-2">
            <span>View Menu</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
}