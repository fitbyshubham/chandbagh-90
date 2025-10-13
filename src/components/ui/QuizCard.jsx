// src/app/quiz/page.jsx 
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; 

const quizCategories = [
  { 
    id: 0, 
    category: "chandbagh-landmarks", 
    title: "Chandbagh Landmarks 🗺️", 
    description: "Test your knowledge of the main school buildings and houses.",
    color: "bg-red-500",
    image: "/Photos/MB.jpg", // Placeholder image path
  },
  { 
    id: 1, 
    category: "school-history", 
    title: "School History & Lore 📜", 
    description: "How well do you know the school's founding and traditions?",
    color: "bg-blue-500",
    image: "/Photos/omb.jpg", // Placeholder image path
  },
  { 
    id: 2, 
    category: "dosco-achievers", 
    title: "Notable Doscos & Alumni ⭐", 
    description: "Identify famous alumni and their contributions.",
    color: "bg-green-500",
    image: "/Photos/na.avif", // Placeholder image path
  },
  { 
    id: 3, 
    category: "sports-and-traditions", 
    title: "Sports & House Spirit 🏆", 
    description: "Questions on inter-house competitions and major sports.",
    color: "bg-yellow-500",
    image: "/Photos/MF.jpg", // Placeholder image path
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [autoSwitch, setAutoSwitch] = useState(true);
  const totalCards = quizCategories.length;

  const handlePlayQuiz = () => {
    setAutoSwitch(false);
    const category = quizCategories[currentCardIndex].category;
    setTimeout(() => router.push(`/quiz/play?category=${category}`), 300);
  };

  const handleBack = () => {
    router.push("/info");
  };

  const slideToCard = useCallback((newIndex) => {
    const nextIndex = (newIndex + totalCards) % totalCards;
    setCurrentCardIndex(nextIndex);
    setAutoSwitch(false);
    setTimeout(() => setAutoSwitch(true), 1500);
  }, [totalCards]);

  const handleLeftArrow = () => slideToCard(currentCardIndex - 1);
  const handleRightArrow = () => slideToCard(currentCardIndex + 1);
  
  useEffect(() => {
    if (!autoSwitch) return;
    const interval = setInterval(() => slideToCard(currentCardIndex + 1), 4000);
    return () => clearInterval(interval);
  }, [autoSwitch, currentCardIndex, slideToCard]);

  const getCardStyle = (index) => {
    let offset = index - currentCardIndex;
    if (offset < -totalCards / 2) offset += totalCards;
    if (offset > totalCards / 2) offset -= totalCards;

    const scale = 1 - Math.abs(offset) * 0.15;
    const opacity = 1 - Math.abs(offset) * 0.5;
    const translateX = offset * 45;
    const rotateY = offset * 10;

    return {
      transform: `translateX(${translateX}%) scale(${scale}) rotateY(${rotateY}deg)`,
      zIndex: totalCards - Math.abs(offset),
      opacity: opacity < 0.2 ? 0 : opacity,
      pointerEvents: opacity < 0.5 ? 'none' : 'auto',
    };
  };


  return (
    // ADJUSTED: Use min-h-screen and added bottom padding (pb-12) 
    // to prevent overlap with a typical fixed bottom navbar.
    <div className="w-full min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center pb-12">
      <div className="w-full max-w-md mx-auto flex flex-col">
        
        {/* Header (Back Button only) */}
        <div className="flex justify-start items-center mb-6 mt-2">
          <button
            className="w-10 h-10 rounded-full bg-gray-800 text-white font-bold text-xl flex items-center justify-center hover:bg-gray-700 transition"
            onClick={handleBack}
            aria-label="Back to Info Page"
          >
            ←
          </button>
        </div>

        {/* Title - Reduced margin-bottom */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white">
            Ready for the <span className="text-red-500">Dosco Quiz</span>? 
          </h1>
          <p className="text-base text-gray-400 mt-1">
            Select a category to test your knowledge of Chandbagh.
          </p>
        </div>

        {/* --- 3D Carousel Container - Reduced height slightly --- */}
        <div className="relative w-full h-[320px] flex justify-center items-center">
          
          {/* Navigation Arrows */}
          <button
            className="absolute left-0 -translate-x-full bg-gray-700/50 p-3 rounded-full hover:bg-gray-700 transition z-40"
            onClick={handleLeftArrow}
            aria-label="Previous Category"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>

          {quizCategories.map((card, index) => (
            <div
              key={card.id}
              // Adjusted card height to 72 (down from 80)
              className={`absolute w-64 h-72 rounded-2xl p-4 cursor-pointer transition-all duration-500 ease-in-out shadow-2xl ${card.color} ${index === currentCardIndex ? 'ring-4 ring-indigo-500' : ''}`}
              style={getCardStyle(index)}
              onClick={() => slideToCard(index)}
            >
              <div className="w-full h-full bg-gray-800/80 backdrop-blur-sm rounded-xl flex flex-col justify-between p-5 text-center transition-opacity duration-300">
                
                {/* Image/Icon Placeholder */}
                <div className="w-full h-20 relative mb-2 rounded-lg overflow-hidden border border-gray-700">
                    <Image
                        src={card.image}
                        alt={card.title}
                        layout="fill"
                        objectFit="cover"
                        className="opacity-70"
                    />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                <p className="text-xs text-gray-300 flex-grow">{card.description}</p>
                
                {index === currentCardIndex && (
                    <span className="text-xs font-semibold text-indigo-400 mt-3">
                        <span className="animate-pulse">Active Category</span>
                    </span>
                )}
              </div>
            </div>
          ))}

          <button
            className="absolute right-0 translate-x-full bg-gray-700/50 p-3 rounded-full hover:bg-gray-700 transition z-40"
            onClick={handleRightArrow}
            aria-label="Next Category"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
        {/* --- End Carousel --- */}
        
        {/* Indicator Dots - Reduced margin-top */}
        <div className="flex justify-center space-x-2 mt-8"> 
            {quizCategories.map((_, index) => (
                <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentCardIndex ? "bg-indigo-500 w-5" : "bg-gray-700"
                    }`}
                    onClick={() => slideToCard(index)}
                    aria-label={`Go to card ${index + 1}`}
                />
            ))}
        </div>

        {/* Play Button - Reduced margin-top to bring it higher */}
        <button
          className="w-full h-14 bg-indigo-600 text-white font-extrabold rounded-full mt-8 shadow-lg shadow-indigo-600/50 hover:bg-indigo-500 transition"
          onClick={handlePlayQuiz}
        >
          START QUIZ NOW
        </button>
      </div>
    </div>
  );
}