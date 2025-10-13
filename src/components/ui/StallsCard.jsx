// src/app/stalls/page.jsx
"use client";

import StallsCard from "../../../src/components/ui/StallsCard";
import PopRestaurants from "../../../src/components/ui/PopRestaurants"; // Ensure this component is also dark-mode ready
import { useState, useMemo } from "react";
import restaurants from "../../../public/restaurants.json";
import { FaSearch, FaFilter } from "react-icons/fa"; 

// --- Data Processing (Unchanged - assuming this is correct) ---
const slugify = (text) => {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

const processRestaurantData = (data) => {
  if (!data || !data.restaurants) return [];
  
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
    const name = res.name || `stall-${index}`;
    const slug = slugify(name);

    return {
      id: index,
      name: res.name,
      slug: slug,
      image: res.image_url || imageMap[res.name] || "https://placehold.co/600x400/1e293b/white/png",
      rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
      stallNo: (index + 10).toString(),
      offer: index % 3 === 0 ? "10% OFF" : "",
      category: primaryCategory
    };
  });
};

const ALL_RESTAURANTS = processRestaurantData(restaurants);

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
// --- End Data Processing ---

// Define colors for consistency
const DARK_BG = "#1E2129"; 
const CARD_BG = "#2B313C"; 
const INDIGO_PRIMARY = "#4F46E5"; // indigo-600


export default function StallsCardPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredRestaurants = useMemo(() => {
        let filtered = ALL_RESTAURANTS;
        
        // Apply category filter
        if (selectedCategory !== "All") {
            filtered = filtered.filter(r => r.category === selectedCategory);
        }
        
        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(r => 
                r.name.toLowerCase().includes(query) || 
                r.category.toLowerCase().includes(query)
            );
        }
        
        return filtered;
    }, [selectedCategory, searchQuery]);
    
    // Updated Category Item component for modern dark mode style
    const CategoryItem = ({ name, icon, isSelected }) => (
        <div 
            className={`flex flex-col items-center p-3 rounded-xl cursor-pointer transition-all duration-300 min-w-[70px] snap-start ${
                isSelected 
                    ? 'bg-indigo-600 shadow-lg shadow-indigo-500/50 transform scale-[1.03] border-2 border-indigo-400' 
                    : 'bg-[#2B313C] hover:bg-gray-700 border border-gray-700'
            }`}
            onClick={() => setSelectedCategory(name)}
        >
            <div className={`text-2xl mb-1 transition-transform ${isSelected ? 'scale-110' : ''}`}>
                {icon}
            </div>
            <span className={`text-xs font-medium transition-colors text-center ${isSelected ? 'text-white font-semibold' : 'text-gray-300'}`}>
                {name.split(' ')[0]}
            </span>
        </div>
    );
    
    return(
        // Set main background color
        <div className="w-full min-h-screen font-sans pb-24" style={{ backgroundColor: DARK_BG }}>
            {/* Added a spacer to push content down from the fixed header */}
            <div className="h-[74px] bg-transparent" aria-hidden="true"></div> 

            <div className="max-w-xl mx-auto"> {/* Adjusted max-width for better mobile fit */}
                {/* --- Sticky Header (Title, Search, Categories) --- */}
                {/* Removed fixed/sticky from here and made it part of the normal flow, 
                    the actual header is from src/components/layout/Header.jsx */}
                
                <div className="px-4 pt-4"> {/* Added padding to the top of the content */}
                    <h1 className="text-3xl font-extrabold mb-4 text-white">Food Stalls 🍜</h1>

                    {/* Search Bar - Integrated search icon directly */}
                    <div className="relative flex items-center gap-3 mb-6"> {/* Increased bottom margin for spacing */}
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            className="flex-1 pl-10 pr-5 py-3 rounded-xl text-white text-base shadow-inner border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder-gray-500"
                            style={{ backgroundColor: CARD_BG }}
                            placeholder="Search stalls or cuisines..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {/* Filter Button - Moved next to search input */}
                        <button className="bg-indigo-600 text-white p-4 rounded-xl shadow-md hover:bg-indigo-700 transition flex items-center justify-center">
                            <FaFilter className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                
                {/* Categories - Horizontal Scroll with improved styling for dark mode */}
                <div className="flex overflow-x-auto gap-3 py-3 snap-x snap-mandatory hide-scroll-bar px-4 border-b border-t border-gray-800 bg-[#242830]"> {/* Added a subtle background to the category strip */}
                    {CATEGORIES.map((c) => (
                        <CategoryItem 
                            key={c.name} 
                            name={c.name} 
                            icon={c.icon} 
                            isSelected={selectedCategory === c.name}
                        />
                    ))}
                </div>

                {/* --- Main Content Sections --- */}
                <div className="p-4">
                    
                    {/* Popular Restaurants */}
                    <h2 className="text-2xl font-bold mb-4 text-white mt-6 tracking-tight">
                        <span className="text-indigo-400">🔥</span> Top Picks
                    </h2>
                    {/* PopRestaurants component needs to render its cards with dark backgrounds */}
                    <PopRestaurants restaurants={ALL_RESTAURANTS.slice(0, 4)} />
                    
                    {/* All Restaurants/Stalls List */}
                    <h2 className="text-2xl font-bold mt-8 mb-4 text-white tracking-tight">
                        {selectedCategory === "All" ? "All Stalls" : selectedCategory} <span className="text-gray-500 text-lg">({filteredRestaurants.length})</span>
                    </h2>
                    
                    {filteredRestaurants.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {filteredRestaurants.map((stall) => (
                                // StallsCard component must be dark-mode styled internally
                                <StallsCard 
                                    key={stall.id}
                                    image={stall.image}
                                    name={stall.name}
                                    rating={stall.rating}
                                    stallNo={stall.stallNo}
                                    offer={stall.offer}
                                    slug={stall.slug}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 rounded-xl mt-6 border border-gray-700" style={{ backgroundColor: CARD_BG }}>
                            <div className="text-5xl mb-4">😔</div>
                            <p className="text-xl text-white">No stalls found</p>
                            <p className="text-gray-400 mt-2">Try changing your search or filter</p>
                        </div>
                    )}
                </div>
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