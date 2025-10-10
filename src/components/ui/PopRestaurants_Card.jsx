// src/components/ui/PopRestaurantsCard.jsx
"use client"

export default function PopRestaurantsCard(props) {
    return (
      // Container: Removed unnecessary justify-center/items-center since the parent handles width and snapping.
      <div className="p-1">
        
        {/* Card Body: Use standard size and rounded class (e.g., rounded-2xl) */}
        <div className="relative w-full h-[300px] rounded-2xl overflow-hidden shadow-xl">
          
          {/* Image */}
          <img
            src={props.image}
            alt={props.alt}
            // Use 'object-cover' and 'absolute inset-0' for perfect fill
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay Gradient (Darker at bottom for text readability) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Content Container (Simplified structure) */}
          <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
            
            {/* Top Titles */}
            <div className="pt-2">
              <div className="text-3xl font-extrabold leading-none">
                  {props.title1}            
              </div>
              <div className="text-3xl font-extrabold leading-none">
                  {props.title2}            
              </div>
            </div>

            {/* Bottom Details and Buttons */}
            <div>
              {/* Stall Info */}
              <div className="flex justify-between items-center mb-4">
                
                {/* Stall No & Rating */}
                <div className="flex flex-col">
                    <span className="text-xl font-bold mb-1">
                      Stall No. {props.stallNo}
                    </span>
                    <span className="flex items-center text-sm font-semibold">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span>{props.rating}</span>
                      <span className="ml-1 text-gray-300">({props.reviews} Reviews)</span>
                    </span>
                </div>
                
                {/* Favorite Button (Heart) */}
                <button className="flex items-center justify-center w-10 h-10 bg-white/30 backdrop-blur-sm border border-white/40 rounded-full shadow-lg transition hover:bg-white/50">
                    <span className="text-xl">♡</span>
                </button>
              </div>

              {/* Main Action Button */}
              <button 
                  className="w-full h-12 bg-white text-gray-900 rounded-full font-bold shadow-2xl transition hover:bg-gray-100"
              >
                  View Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}