"use client";
import React, { useState, useEffect } from "react";
import { FaStar, FaPlay, FaArrowRight, FaCalendar, FaMapMarkerAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import YouTube from "react-youtube";
import schedule from "../../../data/schedule.json";
import useProtectedRoute from "../../../components/hook/useProtectedRoute";
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
      player.playVideo();
      setIsPlaying(true);
    }
  };

  return (
    <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
      <div className="p-6 pb-4 border-b border-gray-100">
        <h3 className="mb-1 text-xl font-semibold text-gray-900">
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
              autoplay: 0,
              controls: 1,
              modestbranding: 1,
              rel: 0,
            },
          }}
          onReady={(event) => setPlayer(event.target)}
        />

        {!isPlaying && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer bg-black/20"
            onClick={handlePlayClick}
          >
            <img
              src={thumbnail}
              alt="Video thumbnail"
              className="absolute inset-0 object-cover w-full h-full"
            />
            <div className="z-20 flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg">
              <FaPlay className="w-6 h-6 text-gray-900" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------- MAIN HOMEPAGE ----------------------
export default function HomePage() {
  const router = useRouter();
  const [userName, setUserName] = useState("Guest");
  const [currentEvent, setCurrentEvent] = useState(null);
  const [nextEvent, setNextEvent] = useState(null);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    // Try to get the name from localStorage (stored after OTP verification)
    const savedName = localStorage.getItem("user_name") || localStorage.getItem("signup_name");
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  // ✅ EVENT TIME LOGIC
  useEffect(() => {
  const now = new Date();

  const allEvents = schedule.schedule
    .map(event => ({
      ...event,
      startDate: parseEventDate(event.date, event.startTime),
      endDate: parseEventDate(event.date, event.endTime)
    }))
    .filter(e => e.startDate && e.endDate)
    .sort((a, b) => a.startDate - b.startDate);

  const current = allEvents.find(e => now >= e.startDate && now <= e.endDate);
  const next = allEvents.find(e => e.startDate > now);

  setCurrentEvent(current || null);
  setNextEvent(next || null);

  if (!current && next) {
    const updateCountdown = () => {
      const diff = next.startDate - new Date();
      if (diff <= 0) {
        setCountdown(null);
        setCurrentEvent(next);
        return;
      }
      const hours = Math.floor(diff / 1000 / 60 / 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setCountdown({ hours, minutes, seconds });
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }
}, []);

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

  const handleTeamRoute = () => router.push("/team");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 py-8">
             <div className="mb-12">
           <div className="text-left mt-[80px] mb-[50px]">
          <p className="text-gray-500 text-sm mb-1">Welcome back</p>
          <h1 className="text-5xl font-light text-gray-900 tracking-tight">{userName}</h1>
        </div>



      
        
       <div className="relative rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group bg-white border border-gray-100">
            <div className="relative h-[280px] overflow-hidden">
              <img
                alt="Founders Day"
                src="/Photos/hm4.jpg"
                className="object-cover w-full h-full transition-all duration-700 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="inline-block px-3 py-1 mb-3 border rounded-full bg-white/20 backdrop-blur-sm border-white/30">
                  <span className="text-xs font-medium text-white">90th Anniversary</span>
                </div>
                <h2 className="mb-3 text-3xl font-semibold leading-tight text-white">
                  Welcome to DS90
                </h2>
                <p className="max-w-lg mb-5 text-sm leading-relaxed text-white/90">
                  Discover the most iconic places amongst Doscos as we celebrate 90 years of excellence.
                </p>
                <button className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-medium text-sm hover:bg-gray-100 transition-all duration-300 shadow-lg" onClick={() => router.push("/initiatives")}>
                  Explore Now
                  <FaArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <VideoBanner
              thumbnail="/Photos/thumbnail.png"
              videoUrl="https://youtu.be/G5nBKfJ99a4"
            />
          </div>
          <div className="space-y-4">
            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-xs text-gray-500">Total Events</p>
                  <p className="text-2xl font-semibold text-gray-900">24</p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">Food Stalls</p>
                  <p className="text-2xl font-semibold text-gray-900">12</p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">Activities</p>
                  <p className="text-2xl font-semibold text-gray-900">36</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- TOP FOOD ---------------- */}
       


<div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Event Update</h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            {currentEvent ? (
              <>
                <p className="text-sm text-gray-500 mb-1">Happening Now</p>
                <h3 className="text-xl font-semibold mb-2">{currentEvent.eventName}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {currentEvent.location} • {currentEvent.startTime} - {currentEvent.endTime}
                </p>
                <p className="text-gray-500 text-sm">{currentEvent.desc}</p>
              </>
            ) : nextEvent ? (
              <>
                <p className="text-sm text-gray-500 mb-1">Next Event</p>
                <h3 className="text-xl font-semibold mb-2">{nextEvent.eventName}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {nextEvent.location} • {nextEvent.startTime} - {nextEvent.endTime}
                </p>
                <p className="text-gray-500 text-sm">{nextEvent.desc}</p>
                {countdown && (
                  <p className="mt-3 text-sm font-medium text-gray-800">
                    Starts in {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
                  </p>
                )}
              </>
            ) : (
              <p className="text-gray-500 text-sm">No more events scheduled today.</p>
            )}
          </div>
        </div>

        {/* ---------------- TEAM ---------------- */}
        <div className="mb-8">
          <div
            className="p-8 transition-all duration-300 bg-white border border-gray-100 shadow-sm cursor-pointer rounded-2xl hover:shadow-md group"
            onClick={handleTeamRoute}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-2 text-2xl font-semibold text-gray-900">Meet Our Team</h3>
                <p className="text-gray-600">The people behind DS90 celebration</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 transition-all duration-300 bg-gray-100 rounded-full group-hover:bg-gray-900">
                <FaArrowRight className="w-4 h-4 text-gray-600 transition-colors group-hover:text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-20"></div>
    </div>
    
  );
}

// ---------------------- HELPER ----------------------
function parseEventDate(dayStr, timeStr) {
  if (!timeStr || timeStr === "TBC") return null;

  // Handle cases like "12:00 & 13:00"
  if (timeStr.includes("&")) timeStr = timeStr.split("&")[0].trim();

  const [month, date] = dayStr.split(" "); // "OCT 16"
  const year = new Date().getFullYear();
  const [hours, minutes] = timeStr.split(":").map(Number);

  const months = {
    JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
    JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11,
  };
  return new Date(year, months[month], parseInt(date), hours, minutes);
}
