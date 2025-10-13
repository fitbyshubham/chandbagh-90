// src/components/ui/PopRestaurants.jsx
"use client";
import React, { useRef, useEffect } from "react";
import PopRestaurantsCard from "./PopRestaurants_Card";

const slugify = (text) => {
    if (!text) return 'unknown-stall';
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

const mapToCarouselProps = (restaurants) => {
    if (!Array.isArray(restaurants)) {
        return [];
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

export default function PopRestaurants({ restaurants = [] }) {
    const mappedStalls = mapToCarouselProps(restaurants);
    const itemRefs = useRef([]);
    const scrollContainerRef = useRef(null);

    // Auto-scroll functionality
    useEffect(() => {
        if (!scrollContainerRef.current || mappedStalls.length <= 1) return;
        
        const interval = setInterval(() => {
            const container = scrollContainerRef.current;
            const maxScroll = container.scrollWidth - container.clientWidth;
            
            if (container.scrollLeft >= maxScroll) {
                container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: 300, behavior: 'smooth' });
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [mappedStalls]);

    return (
        <div className="bg-transparent -mx-4 -mt-2 p-4">
            <div
                ref={scrollContainerRef}
                className="flex overflow-x-scroll snap-x snap-mandatory hide-scroll-bar"
            >
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
                    <div className="p-4 text-gray-400">No popular stalls available.</div>
                )}
            </div>
        </div>
    );
}