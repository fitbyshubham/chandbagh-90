"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import TeamCard from "../../../components/ui/TeamCard.jsx";
import Header from "@/components/layout/Header";
import StoryModal from "@/components/layout/StoryModal.jsx";

const specials = [
  {
    name: "Paneer Tikka Sandwich",
    price: "₹50",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIB0-zFdFEGoh5VnYpk5WqWVZh88m5YjlNUQ&s",
    rating: 4.8,
    stall: "Stall No. 5",
    isTop: true,
  },
  {
    name: "Veg Noodles",
    price: "₹40",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    stall: "Stall No. 2",
    isTop: false,
  },
];

const events = [
  {
    name: "Science Exhibition",
    time: "Oct 6, 11:00 AM",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    desc: "Explore student projects in the main hall.",
  },
  {
    name: "Sports Meet",
    time: "Oct 6, 3:00 PM",
    image:
      "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80",
    desc: "Cheer on your house at the playground.",
  },
];

const team = [
  { name: "Shubham Sharma", role: "Mentor", img: "/Portraits/" },
  { name: "Samarth Pundeer", role: "Lead Developer", img: "/Portraits/Pundeer.jpg" },
  { name: "Hemant Khandelwal", role: "Lead Developer", img: "/Portraits/Hemant.jpg" },
  { name: "Vibhor Saraogi", role: "Developer", img: "/Portraits/" },
  { name: "Ojas Tripathi", role: "Developer", img: "/Portraits/" },
];

function VideoBanner({ thumbnail, videoUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="relative rounded-2xl overflow-hidden w-full h-[180px] mt-6 px-4">
      {!isPlaying ? (
        <div
          className="relative w-full h-full cursor-pointer"
          onClick={() => setIsPlaying(true)}
        >
          <div className="bg-blue-900 flex flex-col items-center">
          <h2>Words From The Headmaster</h2>
          </div>
          <img
            src="/photos/thumbnail.png"
            alt="Video thumbnail"
            className="w-full h-[160px] object-cover rounded-2xl  "
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
            <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="black"
                className="w-8 h-8 ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.25v13.5l13.5-6.75-13.5-6.75z"
                />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <iframe
          src={`${videoUrl}?autoplay=1`}
          title="Intro Video"
          className="w-full h-full rounded-2xl"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      )}
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [userName, setUserName] = useState("Guest");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const savedName = localStorage.getItem("signup_name");
    if (savedName) setUserName(savedName);
  }, []);

  const handleAboutRoute = () => router.push("/about");
  const handleTeamRoute = () => router.push("/team");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pb-10">
      <Header onAvatarClick={(src) => setSelectedImage(src)} />
      <StoryModal
        isOpen={!!selectedImage}
        imageSrc={selectedImage}
        onClose={() => setSelectedImage(null)}
      />

      <div className="bg-gray-900 text-white px-4 pb-6 pt-8 rounded-b-3xl shadow flex flex-col relative">
        <div className="flex mb-4">
          <div className="flex items-left space-x-1.5 flex-col">
            <span className="text-2xl">Welcome,</span>
            <span className="font-bold text-3xl">{userName}!</span>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden shadow-lg mb-2 bg-gray-800">
          <img
            alt="Founders Day"
            src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80"
            className="w-full h-36 object-cover"
          />
          <div className="p-4">
            <div className="text-xl font-bold mb-1">Welcome to the DS90</div>
            <p className="text-gray-300 text-sm mb-2">
              On the 90th year of the school, get to know about some of the most
              famous places amongst Doscos.
            </p>
            <button
              onClick={handleAboutRoute}
              className="bg-orange-500 text-white px-4 py-1 rounded-full font-semibold text-sm hover:bg-orange-600 transition"
            >
              Get to Know
            </button>
          </div>
        </div>
      </div>

      <VideoBanner
        thumbnail="https://img.youtube.com/vi/G5nBKfJ99a4/maxresdefault.jpg"
        videoUrl="https://www.youtube.com/embed/G5nBKfJ99a4"
      />

      <div className="px-4 mt-6">
        <h2 className="font-bold text-lg mb-2 text-gray-800">Top Rated Food</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2 hide-scrollbar">
          {specials.map((item, i) => (
            <div
              key={i}
              className={`min-w-[220px] bg-white rounded-2xl shadow-lg flex-shrink-0 ${
                item.isTop ? "border-2 border-blue-300" : "border border-gray-200"
              }`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-28 object-cover rounded-t-2xl"
              />
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                    {item.price}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  <FaStar className="text-yellow-300 mr-1" />
                  <span className="text-xs font-bold">{item.rating}</span>
                  <span className="ml-2 text-xs text-gray-500">
                    {item.stall}
                  </span>
                </div>
                {item.isTop && (
                  <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                    Most Popular
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mt-7">
        <h2 className="font-bold text-lg mb-2 text-gray-800">Upcoming Events</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2 hide-scrollbar">
          {events.map((e, i) => (
            <div
              key={i}
              className="min-w-[200px] bg-white rounded-2xl shadow-lg flex-shrink-0"
            >
              <img
                src={e.image}
                alt={e.name}
                className="w-full h-24 object-cover rounded-t-2xl"
              />
              <div className="p-3">
                <div className="font-semibold">{e.name}</div>
                <div className="text-xs text-gray-500">{e.time}</div>
                <div className="text-xs text-gray-700 mt-1">{e.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center pt-3 mx-3">
        <button onClick={handleTeamRoute} className="w-full">
          <TeamCard />
        </button>
      </div>
    </div>
  );
}
