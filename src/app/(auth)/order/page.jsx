// src/app/(auth)/order/stalls/page.jsx
'use client'
import { useState, useEffect, useRef } from "react"
import StallsCard from "../../../components/ui/StallsCard";
import PopRestaurants from "../../../components/ui/PopRestaurants"

export default function StallsCardPage(){
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const categories = [
        { name: "All", icon: "🍖" },
        { name: "Indian", icon: "🍲" },
        { name: "Chinese", icon: "🍟" },
        { name: "Rolls", icon: "🌯" },
        { name: "Pizza", icon: "🍕" },
        { name: "Burger", icon: "🍔" },
        { name: "Drinks", icon: "🥤" },
    ];

    const scrollRef = useRef(null);

    useEffect(() => {
        // Fetch restaurant data from public folder
        async function fetchRestaurants() {
            try {
                setLoading(true);
                const response = await fetch('/restaurants.json');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch restaurants');
                }
                
                const data = await response.json();
                
                // Map the data to include display properties
                const mappedRestaurants = data.restaurants.map((restaurant, index) => ({
                    name: restaurant.name,
                    image: restaurant.image_url || getDefaultImage(restaurant.name),
                    rating: "4.5", // You can add this to your JSON or calculate from reviews
                    stallNo: (index + 1).toString(), // Generate sequential stall numbers
                    offer: getRandomOffer() // Random offers for demo
                }));
                
                setRestaurants(mappedRestaurants);
            } catch (err) {
                console.error('Error fetching restaurants:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchRestaurants();
    }, []);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        let scrollAmount = 0;
        const scrollStep = 2;
        const scrollDelay = 20;

        const autoScroll = () => {
            if (!scrollContainer) return;
            scrollAmount += scrollStep;
            if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
                scrollAmount = 0;
            }
            scrollContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });
        };

        const interval = setInterval(autoScroll, scrollDelay);
        return () => clearInterval(interval);
    }, []);

    // Helper function to get default images based on restaurant type
    function getDefaultImage(name) {
        const images = {
            'rolls': 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400',
            'burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
            'pizza': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
            'cafe': 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
            'default': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400'
        };

        const lowerName = name.toLowerCase();
        if (lowerName.includes('roll')) return images.rolls;
        if (lowerName.includes('burger')) return images.burger;
        if (lowerName.includes('pizza') || lowerName.includes('domino')) return images.pizza;
        if (lowerName.includes('cafe') || lowerName.includes('café')) return images.cafe;
        return images.default;
    }

    // Helper function to generate random offers
    function getRandomOffer() {
        const offers = ['', '20% OFF', '10% OFF', 'Buy 1 Get 1', ''];
        return offers[Math.floor(Math.random() * offers.length)];
    }

    if (loading) {
        return (
            <div className="w-full min-h-screen mx-auto bg-gray-50 rounded-t-3xl shadow-lg p-4 relative font-sans flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading restaurants...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full min-h-screen mx-auto bg-gray-50 rounded-t-3xl shadow-lg p-4 relative font-sans flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Failed to load restaurants</h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return(
        <div className="w-full min-h-screen mx-auto bg-gray-50 rounded-t-3xl shadow-lg p-4 relative font-sans pb-32">
            {/* Top Search Bar */}
            <div className="flex items-center gap-2 mb-4 sticky top-0 z-10 bg-gray-50 pt-2 pb-3">
                <div className="relative flex-1">
                    <input
                        className="w-full px-4 py-3 pl-12 rounded-2xl bg-white text-sm outline-none shadow-sm border border-gray-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                        placeholder="Search stalls, items..."
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-orange-100 text-orange-500 p-2 rounded-full">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" strokeWidth="2" />
                            <path d="M21 21l-4.35-4.35" strokeWidth="2" />
                        </svg>
                    </div>
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-md transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                </button>
            </div>

            {/* Categories */}
            <div className="mb-6 pb-2">
                <h3 className="text-sm font-medium text-gray-600 mb-3 px-1">Categories</h3>
                <div 
                    ref={scrollRef}
                    className="flex flex-row items-center gap-4 pb-2 overflow-x-auto scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {categories.map((c) => (
                        <div 
                            key={c.name} 
                            className="flex flex-col items-center min-w-max cursor-pointer group"
                        >
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-1.5 shadow-sm border border-gray-100 group-hover:shadow-md group-hover:scale-105 transition-all">
                                {c.icon}
                            </div>
                            <span className="text-xs text-gray-700 font-medium">{c.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Popular Restaurants */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-bold text-gray-800">Popular Stalls</h2>
                    <button className="text-sm text-orange-500 font-semibold hover:text-orange-600 transition-colors">
                        View All →
                    </button>
                </div>
                <PopRestaurants />
            </div>

            {/* All Restaurants */}
            <div className="mb-4">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-bold text-gray-800">All Stalls</h2>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {restaurants.length} stalls
                    </span>
                </div>
                {restaurants.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                        {restaurants.map((restaurant, index) => (
                            <StallsCard
                                key={index}
                                image={restaurant.image}
                                name={restaurant.name}
                                rating={restaurant.rating}
                                stallNo={restaurant.stallNo}
                                offer={restaurant.offer}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🍽️</div>
                        <p className="text-gray-600">No restaurants available</p>
                    </div>
                )}
            </div>

            {/* Bottom Navigation Space */}
            <div className="h-16"></div>
        </div>
    )
}