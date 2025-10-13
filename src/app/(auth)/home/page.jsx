// src/app/(auth)/home/page.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { FaStar, FaChevronRight } from "react-icons/fa"; // Added FaChevronRight for links
import TeamCard from '../../../components/ui/TeamCard.jsx';
import Header from '@/components/layout/Header';
import StoryModal from '@/components/layout/StoryModal.jsx';

// Utility component to hide scrollbar
const HideScrollbarStyle = () => (
    <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    `}</style>
);

// --- Data (Unchanged - assuming this data is correct) ---
const events = [
  {
    name: "Science Exhibition",
    time: "Oct 6, 11:00 AM",
    image: "https://images.unsplash.com/photo-1464983258147-9a3b5d5e4f7c?auto=format&fit=crop&w=400&q=80",
    desc: "Explore student projects in the main hall.",
  },
  {
    name: "Sports Meet",
    time: "Oct 6, 3:00 PM",
    image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80",
    desc: "Cheer on your house at the playground.",
  },
];

const TOP_FOOD_PICKS = [
  { restaurant: "Lazeez Kathi Rolls", category: "NonVeg Rolls", item: "Butter Chicken Roll", price: 300 },
  { restaurant: "The Pink Okra", category: "Cheesecakes", item: "Lotus biscoff", price: 250 },
  { restaurant: "Best of Bengal", category: "Biriyani", item: "Chicken Biriyani (per plate) + Salad & Raita", price: 350 },
  { restaurant: "y cafe", category: "Shakes", item: "Ferrero Rocher Shake ", price: 220 },
  { restaurant: "Rolls Mania", category: "Non-Veg Delight", item: "Butter Chicken Roll", price: 300 },
  { restaurant: "Burger Singh", category: "Veg Burger", item: "Chunky Paneer Pandey", price: 250 },
  { restaurant: "Mexican Grill", category: "BURRITO ROLLS", item: "7 Layer Burrito Veg", price: 350 },
  { restaurant: "Snowy Owl Gelato Co.", category: "Gelato", item: "Gelato Regular", price: 200 },
];
// --- End Data ---

// Define the primary dark background color
const DARK_BG = "#1E2129"; 
const CARD_BG = "#2B313C"; // Slightly lighter dark background for cards

export default function HomePage() {
  const router = useRouter();
  const [userName, setUserName] = useState("Guest");
  const [selectedImage, setSelectedImage] = useState(null);
  const [specials, setSpecials] = useState([]);

  useEffect(() => {
    // Load user name from localStorage
    const savedName = localStorage.getItem('signup_name');
    if (savedName) {
      setUserName(savedName);
    }

    // Load and process restaurant data
    const loadFoodData = async () => {
      try {
        // NOTE: Using the static data defined above for stability in this demo
        const featuredItems = TOP_FOOD_PICKS.map((pick) => {
          // Simplified processing since we're using static TOP_FOOD_PICKS now
          return {
            name: pick.item,
            price: pick.price, 
            image: `https://picsum.photos/200/150?random=${Math.floor(Math.random() * 1000)}`, // Random image URL for demo
            rating: (4.5 + Math.random() * 0.4).toFixed(1),
            stall: pick.restaurant,
            isTop: pick.item.includes("Butter Chicken") || pick.item.includes("Lotus")
          };
        }).filter(Boolean);

        setSpecials(featuredItems);
      } catch (err) {
        console.error("Error loading food data:", err);
        setSpecials([]);
      }
    };

    loadFoodData();
  }, []);

  const handleAboutRoute = () => router.push("/InfoPage");
  const handleTeamRoute = () => router.push("/Team");
  const handleViewAllFood = () => router.push("/stalls"); // Assuming /stalls is the main food page

  return (
    // Set the overall background to dark blue/black
    <div className={`min-h-screen flex flex-col pb-24`} style={{ backgroundColor: DARK_BG }}>
      
      {/* Header (Must be styled internally for dark mode) */}
      <Header onAvatarClick={(src) => setSelectedImage(src)} />
      
      <StoryModal
        isOpen={!!selectedImage}
        imageSrc={selectedImage}
        onClose={() => setSelectedImage(null)}
      />

      <HideScrollbarStyle />

      {/* Main Content Area */}
      <div className="w-full max-w-xl mx-auto flex flex-col gap-6 py-4 px-4">
        
        {/* --- 1. Welcome Section & Main Announcement Card (Modern Hero) --- */}
        <div className="pt-2">
            <h1 className="text-xl text-gray-400">Welcome,</h1>
            <h2 className="font-bold text-3xl text-white">{userName}!</h2>
        </div>

        {/* Announcement Card - Uses dark card background */}
        <div className="rounded-xl overflow-hidden shadow-2xl" style={{ backgroundColor: CARD_BG }}>
            <img
                alt="Founders Day"
                src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80"
                className="w-full h-40 object-cover"
            />
            <div className="p-4">
                <div className="text-xl font-bold mb-1 text-white">Celebrating DS90! 🏰</div>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    Discover the history of Chandbagh and the most famous places amongst Doscos on this 90th year.
                </p>
                <button
                    onClick={handleAboutRoute}
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold text-base hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30"
                >
                    Learn About DS90
                </button>
            </div>
        </div>

        {/* --- 2. Top Rated Food Section (Horizontal Scroll Cards) --- */}
        <div>
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-lg text-white">Top Food Picks 🍕</h3>
                <button 
                    onClick={handleViewAllFood}
                    className="flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300 transition"
                >
                    View All
                    <FaChevronRight className="w-3 h-3 ml-1" />
                </button>
            </div>
            
            <div className="flex space-x-4 overflow-x-auto pb-2 hide-scrollbar">
            {specials.length > 0 ? (
                specials.map((item, i) => (
                <div
                    key={i}
                    className="min-w-[180px] w-[180px] rounded-xl shadow-lg flex-shrink-0 border border-gray-700 hover:shadow-xl transition-shadow duration-300"
                    style={{ backgroundColor: CARD_BG }}
                >
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-24 object-cover rounded-t-xl"
                        loading="lazy"
                    />
                    <div className="p-3">
                        <span className="inline-block text-xs bg-indigo-500 text-white px-2 py-0.5 rounded-full font-bold mb-2">
                            {item.stall.split(' ')[0]}
                        </span>
                        <div className="font-semibold text-sm line-clamp-1 text-white">
                            {item.name}
                        </div>
                        <div className="flex items-center justify-between mt-1">
                            <span className="flex items-center text-xs font-bold text-gray-300">
                                <FaStar className="text-yellow-500 mr-1 text-sm" />
                                {item.rating}
                            </span>
                            <span className="text-base font-extrabold text-green-400">
                                ₹{item.price}
                            </span>
                        </div>
                    </div>
                </div>
                ))
            ) : (
                <div className="text-gray-500 text-sm py-2">Loading today's specials...</div>
            )}
            </div>
        </div>

        {/* --- 3. Upcoming Events (Horizontal Scroll Cards) --- */}
        <div>
            <h3 className="font-bold text-lg mb-3 text-white">
                Upcoming Events 📅
            </h3>
            <div className="flex space-x-4 overflow-x-auto pb-2 hide-scrollbar">
            {events.map((e, i) => (
                <div
                key={i}
                className="min-w-[220px] rounded-xl shadow-md flex-shrink-0 border border-gray-700"
                style={{ backgroundColor: CARD_BG }}
                >
                    <img
                        src={e.image}
                        alt={e.name}
                        className="w-full h-28 object-cover rounded-t-xl"
                    />
                    <div className="p-3">
                        <div className="font-bold text-base text-white line-clamp-1">{e.name}</div>
                        <div className="text-xs font-medium text-blue-400 mt-1">{e.time}</div>
                        <div className="text-xs text-gray-400 mt-1 line-clamp-2">
                            {e.desc}
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>

        {/* --- 4. Team Section (Call-to-Action Block) --- */}
        <div className="pb-8">
            <button 
                onClick={handleTeamRoute} 
                className="w-full p-0 m-0"
            >
                {/* Ensure TeamCard renders a dark-mode friendly card inside */}
                <TeamCard /> 
            </button>
        </div>
        
      </div>
    </div>
  );
}