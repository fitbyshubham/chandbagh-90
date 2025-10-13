// src/app/stalls/page.jsx
"use client";

import StallsCard from "../../../components/ui/StallsCard";
import PopRestaurants from "../../../components/ui/PopRestaurants";
import { useState, useMemo, useEffect } from "react"; // Added useEffect
import { FaSearch, FaFilter } from "react-icons/fa";

// Define colors for consistency
const DARK_BG = "#1E2129"; 
const CARD_BG = "#2B313C"; 

// --- Data Processing Functions (Kept for local processing) ---
const slugify = (text) => {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

// Image map for placeholders (can be kept or removed if data provides images)
const imageMap = {
    "Lazeez Kathi Rolls": "https://images.unsplash.com/photo-1598460627244-8d4e12e1e075?fit=crop&w=600&h=400&q=80",
    "The Pink Okra": "https://images.unsplash.com/photo-1560787118-2e061b40e4f2?fit=crop&w=600&h=400&q=80",
    "Best of Bengal": "https://images.unsplash.com/photo-1599540097725-78351b6a18d9?fit=crop&w=600&h=400&q=80",
    "y cafe": "https://images.unsplash.com/photo-1507041951596-f33b1e39a031?fit=crop&w=600&h=400&q=80",
    // ... add all other image mappings
};

const processRestaurantData = (data) => {
  if (!data || !data.restaurants) return [];
  
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

// Function to generate categories based on processed data
const getCategories = (restaurants) => {
    if (!restaurants.length) return [{ name: "All", icon: "⭐" }];

    const uniqueCategories = Array.from(
        new Set(restaurants.map(r => r.category))
    ).map(cat => ({
        name: cat,
        icon: cat.includes("Rolls") || cat.includes("Kathi") ? "🌯" : 
              cat.includes("Pizza") ? "🍕" : 
              cat.includes("Burger") ? "🍔" :
              cat.includes("Drinks") || cat.includes("Shake") || cat.includes("Coffee") ? "🥤" :
              cat.includes("Chicken") || cat.includes("NonVeg") || cat.includes("Biriyani") ? "🍗" :
              cat.includes("Desserts") || cat.includes("Cake") || cat.includes("Pastries") || cat.includes("Gelato") || cat.includes("Bakery") ? "🍰" :
              "🍴" 
    }));
    return [{ name: "All", icon: "⭐" }, ...uniqueCategories];
};

// --- Main Component ---
export default function StallsCardPage() {
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [categories, setCategories] = useState([{ name: "All", icon: "⭐" }]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // FIX: Load JSON from public folder on mount
    useEffect(() => {
        const loadData = async () => {
            try {
                // Correct route for public folder asset
                const response = await fetch('/restaurant.json'); 
                if (!response.ok) throw new Error("Failed to load restaurant data from public folder.");
                const data = await response.json();
                
                const processed = processRestaurantData(data);
                setAllRestaurants(processed);
                setCategories(getCategories(processed));
            } catch (error) {
                console.error("Error fetching or processing restaurant data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const filteredRestaurants = useMemo(() => {
        let filtered = allRestaurants;
        
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
    }, [selectedCategory, searchQuery, allRestaurants]);
    
    // Updated Category Item component for a more elevated look
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

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center text-white" style={{ backgroundColor: DARK_BG }}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-3"></div>
                    <p>Loading stalls...</p>
                </div>
            </div>
        );
    }
    
    return(
        <div className="w-full min-h-screen font-sans pb-24" style={{ backgroundColor: DARK_BG }}>
            {/* Added a spacer to push content down from the fixed header */}
            <div className="h-[74px] bg-transparent" aria-hidden="true"></div> 
            
            <div className="max-w-xl mx-auto">
                {/* --- Header (Title, Search) --- */}
                <div className="px-4 pt-4">
                    <h1 className="text-3xl font-extrabold mb-4 text-white">Food Stalls 🍜</h1>

                    {/* Search Bar and Filter */}
                    <div className="relative flex items-center gap-3 mb-6"> 
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                        <input
                            className="flex-1 pl-10 pr-5 py-3 rounded-xl text-white text-base shadow-inner border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder-gray-500"
                            style={{ backgroundColor: CARD_BG }}
                            placeholder="Search stalls or cuisines..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="bg-indigo-600 text-white p-4 rounded-xl shadow-md hover:bg-indigo-700 transition flex items-center justify-center">
                            <FaFilter className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                
                {/* --- Sticky Categories --- */}
                <div className="sticky top-[74px] z-10 shadow-lg shadow-black/30" style={{ backgroundColor: DARK_BG }}>
                    <div className="flex overflow-x-auto gap-3 py-3 snap-x snap-mandatory hide-scroll-bar px-4 border-t border-b border-gray-800">
                        {categories.map((c) => (
                            <CategoryItem 
                                key={c.name} 
                                name={c.name} 
                                icon={c.icon} 
                                isSelected={selectedCategory === c.name}
                            />
                        ))}
                    </div>
                </div>

                {/* --- Main Content Sections --- */}
                <div className="p-4">
                    
                    {/* Popular Restaurants */}
                    <h2 className="text-2xl font-bold mb-4 text-white mt-4 tracking-tight">
                        <span className="text-indigo-400">🔥</span> Top Picks
                    </h2>
                    <PopRestaurants restaurants={allRestaurants.slice(0, 4)} />
                    
                    {/* All Restaurants/Stalls List */}
                    <h2 className="text-2xl font-bold mt-8 mb-4 text-white tracking-tight">
                        {selectedCategory === "All" ? "All Stalls" : selectedCategory} <span className="text-gray-500 text-lg">({filteredRestaurants.length})</span>
                    </h2>
                    
                    {filteredRestaurants.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {filteredRestaurants.map((stall) => (
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