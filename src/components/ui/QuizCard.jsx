"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const QuizCard = () => {
  const router = useRouter();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [autoSwitch, setAutoSwitch] = useState(true);

  const cards = [
    { category: "friendship", title: "Friendship quiz" },
    { category: "love", title: "Love quiz" },
    { category: "adventure", title: "Adventure quiz" },
  ];

  const handlePlayQuiz = () => {
    setAutoSwitch(false);
    setTimeout(() => router.push(`/quiz/play?card=${currentCardIndex}`), 500);
  };

  const handleCustomizeQuiz = () => {
    setAutoSwitch(false);
    setTimeout(() => {
      alert("🎨 Customize your quiz settings!");
      setAutoSwitch(true);
    }, 500);
  };

  const handleBack = () => {
    setAutoSwitch(false);
    setTimeout(() => setAutoSwitch(true), 1000);
  };

  const slideToCard = (newIndex) => {
    if (newIndex === currentCardIndex) return;
    setCurrentCardIndex(newIndex);
    setAutoSwitch(false);
    setTimeout(() => setAutoSwitch(true), 1000);
  };

  const handleLeftArrow = () => slideToCard(currentCardIndex === 0 ? cards.length - 1 : currentCardIndex - 1);
  const handleRightArrow = () => slideToCard(currentCardIndex === cards.length - 1 ? 0 : currentCardIndex + 1);

  useEffect(() => {
    if (!autoSwitch) return;
    const interval = setInterval(() => setCurrentCardIndex((prev) => (prev + 1) % cards.length), 3000);
    return () => clearInterval(interval);
  }, [autoSwitch, cards.length]);

  return (
    <div className="w-100 h-[850px] bg-blue-200 rounded-2xl p-6 flex flex-col justify-between mx-auto shadow-lg relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <button
          className="w-10 h-10 rounded-full bg-white font-bold text-xl flex items-center justify-center hover:scale-110 transition"
          onClick={handleBack}
        >
          ←
        </button>
        <button
          className="px-4 py-1 border-2 border-gray-800 rounded-full font-bold hover:bg-gray-100 transition"
          onClick={handleCustomizeQuiz}
        >
          Customize quiz
        </button>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
        Pick a card <br /> to play quiz
      </h1>
      <p className="text-sm text-gray-600 mb-8 text-center">Select the quiz category you want to play</p>

      {/* Carousel */}
      <div className="relative flex items-center justify-center flex-1">
        <button
          className="absolute left-0 bg-white/70 p-2 rounded-full hover:bg-white/90 transition z-10"
          onClick={handleLeftArrow}
        >
          ←
        </button>

        <div className="w-full h-full relative flex justify-center items-center">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`absolute w-48 h-80 rounded-xl p-4 cursor-pointer transition-all duration-500 ${
                index === currentCardIndex ? "scale-100 opacity-100 z-20" : "scale-90 opacity-0 z-10"
              }`}
              onClick={handlePlayQuiz}
            >
              <div className="w-full h-full border-4 border-black rounded-xl bg-white flex items-center justify-center">
                <span className="text-lg font-bold">{card.title}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          className="absolute right-0 bg-white/70 p-2 rounded-full hover:bg-white/90 transition z-10"
          onClick={handleRightArrow}
        >
          →
        </button>
      </div>

      {/* Play Button */}
      <button
        className="w-full h-14 bg-gray-800 text-white font-bold rounded-full mt-4 mb-[125px] hover:bg-gray-900 transition"
        onClick={handlePlayQuiz}
      >
        Play Quiz
      </button>
    </div>
  );
};

export default QuizCard;
