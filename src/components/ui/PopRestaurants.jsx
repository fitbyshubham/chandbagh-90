// src/components/ui/PopRestaurants.jsx
import React, { useRef, useEffect } from "react";
import PopRestaurantsCard from "./PopRestaurants_Card";

// FIX: Added a check for the 'restaurants' array before mapping
const mapToCarouselProps = (restaurants) => {
    // If 'restaurants' is not an array, return an empty array immediately
    if (!Array.isArray(restaurants)) {
        return [];
    }

    return restaurants.map(r => ({
        image: r.image,
        alt: r.name,
        title1: r.name.split(' ')[0], 
        title2: r.name.split(' ').slice(1).join(' ') || '',
        stallNo: r.stallNo,
        rating: r.rating,
        reviews: (Math.floor(Math.random() * 200) + 50).toString(), 
    }));
};

// FIX: Added a default empty array to the prop destructuring
export default function PopRestaurants({ restaurants = [] }) {
  const mappedStalls = mapToCarouselProps(restaurants);
  
  const itemRefs = useRef([]);
  const intervalRef = useRef(null);
  const idxRef = useRef(0);

  // Auto-scroll logic for the carousel
  useEffect(() => {
    
    function scrollToIndex(i) {
      if (itemRefs.current[i]) {
        itemRefs.current[i].scrollIntoView({ behavior: "smooth", inline: "start" });
      }
    }
    
    return restaurants.map(r => ({
        image: r.image,
        alt: r.name,
        slug: slugify(r.name),
        title1: r.name.split(' ')[0],
        title2: r.name.split(' ').slice(1).join(' ') || '',
        stallNo: r.stallNo,
        rating: r.rating,
        reviews: (Math.floor(Math.random() * 200) + 50).toString(),
    }));
};

    if (mappedStalls.length > 1) {
        // Clear existing interval before setting a new one
        if (intervalRef.current !== null) {
             clearInterval(intervalRef.current);
        }
        
        intervalRef.current = window.setInterval(() => {
            idxRef.current = (idxRef.current + 1) % mappedStalls.length;
            scrollToIndex(idxRef.current);
        }, 4000); 
    } else if (intervalRef.current) {
        clearInterval(intervalRef.current);
    }


    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [mappedStalls.length]); // Re-run effect if the number of stalls changes

  return (
    <div className="bg-gray-50 -mx-4 -mt-2 p-4"> 
      <div
        className="flex overflow-x-scroll snap-x snap-mandatory hide-scroll-bar"
      >
        {/* Only render if there are mapped stalls */}
        {mappedStalls.length > 0 ? (
            mappedStalls.map((props, i) => (
              <div
                key={props.stallNo}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="flex-shrink-0 w-[85vw] sm:w-[350px] snap-center px-2" 
              >
                <PopRestaurantsCard {...props} /> 
              </div>
            ))
        ) : (
            // Optional: Placeholder if no popular stalls are available
            <div className="p-4 text-gray-500">No popular stalls available.</div>
        )}
      </div>
    </div>
  );
}