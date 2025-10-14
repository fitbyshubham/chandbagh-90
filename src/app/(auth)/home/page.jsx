'use client';
import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaPlay, FaArrowRight, FaCalendar, FaMapMarkerAlt, FaPause } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Import useRouter
import YouTube from "react-youtube";

const specials = [
  {
    name: "Paneer Tikka Sandwich",
    price: "₹50",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIB0-zFdFEGoh5VnYpk5WqWVZh88m5YjlNUQ&s",
    rating: 4.8,
    stall: "Stall No. 5",
    isTop: true,
  },
  {
    name: "Veg Noodles",
    price: "₹40",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    stall: "Stall No. 2",
    isTop: false,
  },
];

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

function VideoBanner({ thumbnail, videoUrl }) {
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const getVideoId = (url) => {
    const regExp =
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : "";
  };

  const videoId = getVideoId(videoUrl);

  const handlePlayClick = () => {
    if (player) {
      player.playVideo(); // trigger play
      setIsPlaying(true); // remove overlay
    }
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
      <div className="p-6 pb-4 border-b border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">
          Words From The Headmaster
        </h3>
        <p className="text-sm text-gray-500">A message for the community</p>
      </div>

      <div className="relative w-full h-[240px]">
        <YouTube
          videoId={videoId}
          className="w-full h-full"
          opts={{
            width: "100%",
            height: "240",
            playerVars: {
              autoplay: 0, // must be 0
              controls: 1,
              modestbranding: 1,
              rel: 0,
            },
          }}
          onReady={(event) => setPlayer(event.target)}
        />

        {!isPlaying && (
          <div
            className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/20 z-10"
            onClick={handlePlayClick}
          >
            <img
              src={thumbnail}
              alt="Video thumbnail"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg z-20">
              <FaPlay className="w-6 h-6 text-gray-900" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}




export default function HomePage() {
  const router = useRouter();
  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    const savedName = localStorage.getItem("signup_name");
    if (savedName) setUserName(savedName);
  }, []);

  const handleTeamRoute = () => {
    router.push("/team");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-20"></div>
      <div className="max-w-7xl mx-auto px-5 py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="text-left mb-[50px]">
            <p className="text-gray-500 text-sm mb-1">Welcome back</p>
            <h1 className="text-5xl font-light text-gray-900 tracking-tight">{userName}</h1>
          </div>

          {/* Featured Card */}
          <div className="relative rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group bg-white border border-gray-100">
            <div className="relative h-[280px] overflow-hidden">
              <img
                alt="Founders Day"
                src="/Photos/hm4.jpg"
                className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 rounded-full mb-3">
                  <span className="text-white text-xs font-medium">90th Anniversary</span>
                </div>
                <h2 className="text-3xl font-semibold text-white mb-3 leading-tight">
                  Welcome to DS90
                </h2>
                <p className="text-white/90 text-sm mb-5 max-w-lg leading-relaxed">
                  Discover the most iconic places amongst Doscos as we celebrate 90 years of excellence.
                </p>
                <button className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-medium text-sm hover:bg-gray-100 transition-all duration-300 shadow-lg">
                  Explore Now
                  <FaArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <VideoBanner
              thumbnail="/Photos/thumbnail.png"
              videoUrl="https://youtu.be/G5nBKfJ99a4  "
            />
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-xs mb-1">Total Events</p>
                  <p className="text-2xl font-semibold text-gray-900">24</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Food Stalls</p>
                  <p className="text-2xl font-semibold text-gray-900">12</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Activities</p>
                  <p className="text-2xl font-semibold text-gray-900">36</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 text-white">
              <h3 className="text-sm font-medium mb-2 text-gray-400">Today's Highlight</h3>
              <p className="text-lg font-medium mb-1">Opening Ceremony</p>
              <p className="text-sm text-gray-400">Main Assembly Hall • 10:00 AM</p>
            </div>
          </div>
        </div>

        {/* Top Rated Food */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Top Rated Food</h2>
              <p className="text-sm text-gray-500 mt-1">Most popular items today</p>
            </div>
            <button className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2 transition-colors">
              View All
              <FaArrowRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specials.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110"
                  />
                  {item.isTop && (
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                      <span className="text-gray-900 text-xs font-semibold flex items-center gap-1">
                        <FaStar className="text-yellow-500 w-3 h-3" /> Popular
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                    <span className="text-gray-900 font-semibold text-lg">{item.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-lg">
                        <FaStar className="text-yellow-500 w-3 h-3" />
                        <span className="text-sm font-semibold text-gray-900">{item.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <FaMapMarkerAlt className="w-3 h-3" />
                      <span className="text-xs">{item.stall}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Upcoming Events</h2>
              <p className="text-sm text-gray-500 mt-1">Don't miss out on these activities</p>
            </div>
            <button className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2 transition-colors">
              View Calendar
              <FaArrowRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((e, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex gap-5 p-5">
                  <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
                    <img
                      src={e.image}
                      alt={e.name}
                      className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">{e.name}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">{e.desc}</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <FaCalendar className="w-3 h-3" />
                      <span className="text-xs font-medium">{e.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-8">
          <div
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer group"
            onClick={handleTeamRoute}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Meet Our Team</h3>
                <p className="text-gray-600">The people behind DS90 celebration</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-900 transition-all duration-300">
                <FaArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-20"></div>
    </div>
  );
}