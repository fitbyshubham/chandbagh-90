"use client";
import React, { useState, useEffect } from "react";
import { FaStar, FaPlay, FaArrowRight, FaCalendar, FaMapMarkerAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import schedule from "../../../data/schedule.json";

// ---------------------- VIDEO BANNER ----------------------
function VideoBanner({ videoUrl }) {
  const getVideoId = (url) => {
    const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.trim().match(regExp);
    return match ? match[1] : "";
  };

  const videoId = getVideoId(videoUrl);

  if (!videoId) {
    console.error("Invalid YouTube URL:", videoUrl);
    return (
      <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
        <div className="p-6 pb-4 border-b border-gray-100">
          <h3 className="mb-1 text-xl font-semibold text-gray-900">Words From The Headmaster</h3>
          <p className="text-sm text-gray-500">A message for the community</p>
        </div>
        <div className="relative w-full h-[240px] flex items-center justify-center bg-gray-100">
          <p className="text-gray-500">Unable to load video</p>
        </div>
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&modestbranding=1&rel=0`;

  return (
    <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
      <div className="p-6 pb-4 border-b border-gray-100">
        <h3 className="mb-1 text-xl font-semibold text-gray-900">Words From The Headmaster</h3>
        <p className="text-sm text-gray-500">A message for the community</p>
      </div>
      <div className="relative w-full h-[240px]">
        <iframe
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
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
    const savedName = localStorage.getItem("user_name") || localStorage.getItem("signup_name");
    if (savedName) setUserName(savedName);
  }, []);

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

    let timer = null;
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
      timer = setInterval(updateCountdown, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

  const handleTeamRoute = () => router.push("/team");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 py-8">
        {/* Welcome Header */}
        <div className="mb-12">
          <div className="text-left mt-[80px] mb-[50px]">
            <p className="text-gray-500 text-sm mb-1">Welcome back</p>
            <h1 className="text-5xl font-light text-gray-900 tracking-tight">{userName}</h1>
          </div>

          {/* Hero Banner */}
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
                <button
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-medium text-sm hover:bg-gray-100 transition-all duration-300 shadow-lg"
                  onClick={() => router.push("/initiatives")}
                >
                  Explore Now
                  <FaArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <VideoBanner videoUrl="https://youtu.be/G5nBKfJ99a4" />
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

        {/* Food Menu CTA */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">View Menu</h2>
            <button
              className="text-sm font-medium flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
              onClick={() => router.push("/order")}
            >
              View All <FaArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-white rounded-3xl shadow-lg border border-gray-100 p-8 text-center">
            <FaMapMarkerAlt className="text-blue-500 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Check out the menu of the stalls!</h3>
            <p className="text-gray-600 mb-4">
              Click here to explore all the available stalls and get ready to order your favorites!
            </p>
            <button
              className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2 justify-center"
              onClick={() => router.push("/order")}
            >
              View Stalls <FaArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Event Update */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Event Update</h2>
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-sm border border-gray-200">
            {currentEvent ? (
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                </div>
                <div>
                  <p className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full inline-block mb-2">Live Now</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{currentEvent.eventName}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <FaMapMarkerAlt className="text-gray-500" />
                    <span>{currentEvent.location}</span>
                    <span>•</span>
                    <FaCalendar className="text-gray-500" />
                    <span>{currentEvent.startTime} – {currentEvent.endTime}</span>
                  </div>
                  <p className="text-gray-700">{currentEvent.desc}</p>
                </div>
              </div>
            ) : nextEvent ? (
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                </div>
                <div>
                  <p className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block mb-2">Upcoming</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{nextEvent.eventName}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <FaMapMarkerAlt className="text-gray-500" />
                    <span>{nextEvent.location}</span>
                    <span>•</span>
                    <FaCalendar className="text-gray-500" />
                    <span>{nextEvent.startTime} – {nextEvent.endTime}</span>
                  </div>
                  <p className="text-gray-700 mb-3">{nextEvent.desc}</p>
                  {countdown && (
                    <div className="flex gap-2">
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-semibold">
                        {String(countdown.hours).padStart(2, '0')}h
                      </div>
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-semibold">
                        {String(countdown.minutes).padStart(2, '0')}m
                      </div>
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-semibold">
                        {String(countdown.seconds).padStart(2, '0')}s
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 italic">No more events scheduled today.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quiz Section */}
        <div className="mb-8">
          <div
            className="flex items-center p-6 bg-white border border-blue-100 rounded-2xl shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group"
            onClick={() => router.push("/quiz")}
          >
            <div className="flex-shrink-0 w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-700 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="mb-1 text-xl font-semibold text-blue-700 group-hover:text-blue-800">Take a Quiz</h3>
              <p className="text-gray-600 text-sm">Test your knowledge of The Doon School</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full group-hover:bg-blue-500 ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-700 group-hover:text-white transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* ✨ FINAL TEAM CARD ✨ */}
        <div className="mb-8">
          <div
            className="group relative p-6 bg-gradient-to-br from-blue-50/70 to-indigo-50/30 border border-blue-100 rounded-2xl shadow-sm transition-all duration-300 cursor-pointer hover:shadow-md hover:scale-[1.015] overflow-hidden"
            onClick={handleTeamRoute}
          >
            <div className="absolute top-2 right-2 w-16 h-16 bg-blue-500/5 rounded-full"></div>
            <div className="absolute bottom-2 left-2 w-20 h-20 bg-indigo-400/5 rounded-full"></div>

            <div className="relative z-10 flex items-center justify-between">
              <div>
                <div className="inline-flex items-center px-2.5 py-0.5 mb-2 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                  Behind the Scenes
                </div>
                <h3 className="text-xl font-bold text-gray-900">Meet the DS90 Team</h3>
                <p className="text-gray-600 text-sm mt-1">
                  The Doscos making 90 years of legacy come alive.
                </p>
              </div>

              {/* ✅ PERFECT CIRCLE: centered, proportional, clean */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 shadow-sm transition-all duration-300 group-hover:bg-blue-700 group-hover:shadow-md group-hover:-translate-y-0.5">
                <FaArrowRight className="w-3.5 h-3.5 text-white" />
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
  if (timeStr.includes("&")) timeStr = timeStr.split("&")[0].trim();

  const [month, date] = dayStr.split(" ");
  const year = new Date().getFullYear();
  const [hours, minutes] = timeStr.split(":").map(Number);

  const months = {
    JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
    JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11,
  };
  return new Date(year, months[month], parseInt(date), hours, minutes);
}