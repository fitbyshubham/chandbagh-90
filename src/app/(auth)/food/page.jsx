// src/app/stalls/page.jsx
"use client";

// Using original file names
import StallsCard from "../../../components/ui/StallsCard"; 
import PopRestaurants from "../../../components/ui/PopRestaurants"; 
import { useState, useMemo } from "react";

// Import the restaurant data
import restaurantData from "@/data/restaurant.json";

// Helper function to map restaurant data for the StallsCard component
const processRestaurantData = (data) => {
  if (!data || !data.restaurants) return [];
  
  // Placeholder image map (replace with real hosted URLs)
  const imageMap = {
    "Lazeez Kathi Rolls": "https://images.unsplash.com/photo-1598460627244-8d4e12e1e075?fit=crop&w=600&h=400&q=80",
    "The Pink Okra": "https://images.unsplash.com/photo-1560787118-2e061b40e4f2?fit=crop&w=600&h=400&q=80",
    "Best of Bengal": "https://images.unsplash.com/photo-1599540097725-78351b6a18d9?fit=crop&w=600&h=400&q=80",
    "y cafe": "https://images.unsplash.com/photo-1507041951596-f33b1e39a031?fit=crop&w=600&h=400&q=80",
    "Tavern": "https://images.unsplash.com/photo-1517248135465-4d228f413da6?fit=crop&w=600&h=400&q=80",
    "Belly Gong Cafe & Bakery": "https://images.unsplash.com/photo-1596701831835-59b1580c8e3c?fit=crop&w=600&h=400&q=80",
    "Rolls Mania": "https://images.unsplash.com/photo-1592476579296-6e2a2253c5f2?fit=crop&w=600&h=400&q=80",
    "Burger Singh": "https://images.unsplash.com/photo-1582234057393-274737a1f599?fit=crop&w=600&h=400&q=80",
    "Mexican Grill": "https://images.unsplash.com/photo-1541819717-d5d140e9d1a8?fit=crop&w=600&h=400&q=80",
    "Snowy Owl Gelato Co.": "https://images.unsplash.com/photo-1579294246816-1f63625f54c9?fit=crop&w=600&h=400&q=80",
    "MOS Dehradun – Global Food Excursion (Day 1)": "https://images.unsplash.com/photo-1565299624942-4348e3518e28?fit=crop&w=600&h=400&q=80",
    "Dominos": "https://images.unsplash.com/photo-1574635198965-0638520d2a80?fit=crop&w=600&h=400&q=80",
  };

  return data.restaurants.map((res, index) => {
    const primaryCategory = Object.keys(res.categories || {})[0] || "Misc";

    return {
      id: index,
      name: res.name,
      image: res.image_url || imageMap[res.name] || "https://placehold.co/600x400/1e293b/white/png",
      rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1), // Mock rating
      stallNo: (index + 10).toString(), // Mock stall number
      offer: index % 3 === 0 ? "10% OFF" : "", // Mock offer
      category: primaryCategory
    };
  });
};

const ALL_RESTAURANTS = processRestaurantData(restaurantData);

const CATEGORIES = [
    { name: "All", icon: "⭐" },
    ...Array.from(
        new Set(ALL_RESTAURANTS.map(r => r.category))
    ).map(cat => ({
        name: cat,
        icon: cat.includes("Rolls") || cat.includes("Kathi") ? "🌯" : 
              cat.includes("Pizza") ? "🍕" : 
              cat.includes("Burger") ? "🍔" :
              cat.includes("Drinks") || cat.includes("Shake") || cat.includes("Coffee") ? "🥤" :
              cat.includes("Chicken") || cat.includes("NonVeg") || cat.includes("Biriyani") ? "🍗" :
              cat.includes("Desserts") || cat.includes("Cake") || cat.includes("Pastries") || cat.includes("Gelato") || cat.includes("Bakery") ? "🍰" :
              "🍴" 
    }))
];

export default function StallsCardPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredRestaurants = useMemo(() => {
        if (selectedCategory === "All") {
            return ALL_RESTAURANTS;
        }
        return ALL_RESTAURANTS.filter(r => r.category === selectedCategory);
    }, [selectedCategory]);
    
    // UI/UX Component for category item
    const CategoryItem = ({ name, icon, isSelected }) => (
        <div 
            className={`flex flex-col items-center p-3 rounded-xl cursor-pointer transition-all duration-300 min-w-[70px] snap-start ${
                isSelected 
                    ? 'bg-indigo-600 shadow-xl shadow-indigo-500/30' 
                    : 'bg-white hover:bg-gray-100 border border-gray-200'
            }`}
            onClick={() => setSelectedCategory(name)}
        >
            <div className={`text-2xl mb-1 transition-transform ${isSelected ? 'scale-110' : ''}`}>
                {icon}
            </div>
            <span className={`text-xs font-medium transition-colors text-center ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                {name.split(' ')[0]}
            </span>
        </div>
    );
    
    return(
        <div className="w-full min-h-screen bg-gray-50 font-sans pb-24"> 
            <div className="max-w-xl mx-auto p-4">

                {/* Header and Search - Sticky Look */}
                <div className="sticky top-0 bg-gray-50 pt-2 pb-4 z-10 border-b border-gray-100">
                    <h1 className="text-3xl font-bold mb-4 text-gray-900">Food Stalls 🍽️</h1>

                    <div className="flex items-center gap-3">
                        <input
                            className="flex-1 px-5 py-3 rounded-xl bg-white text-gray-800 text-base shadow-sm border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            placeholder="Search"
                        />
                        <div className="bg-indigo-600 text-white p-3 rounded-xl shadow-md hover:bg-indigo-700 transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Categories - Horizontal Scroll with Snapping */}
                <div 
                    className="flex overflow-x-scroll gap-3 py-4 snap-x snap-mandatory hide-scroll-bar" 
                >
                    {CATEGORIES.map((c) => (
                        <CategoryItem 
                            key={c.name} 
                            name={c.name} 
                            icon={c.icon} 
                            isSelected={selectedCategory === c.name}
                        />
                    ))}
                </div>
                
                <hr className="my-4 border-gray-200" />
                
                {/* Popular Restaurants (Carousel) */}
                <h2 className="text-2xl font-bold mb-4 text-gray-900">🔥 Top Picks</h2>
                <PopRestaurants restaurants={ALL_RESTAURANTS.slice(0, 4)} /> 
                
                {/* All Restaurants - Dynamic Grid */}
                <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">
                    {selectedCategory === "All" ? "All Stalls" : selectedCategory} ({filteredRestaurants.length})
                </h2>
                
                {filteredRestaurants.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                        {filteredRestaurants.map((stall) => (
                            <StallsCard 
                                key={stall.id}
                                image={stall.image}
                                name={stall.name}
                                rating={stall.rating}
                                stallNo={stall.stallNo}
                                offer={stall.offer}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-10">No stalls found in this category.</p>
                )}
            </div>
            
            <style jsx global>{`
                .hide-scroll-bar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scroll-bar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    )
}