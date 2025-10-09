"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@/globals.css"; // Ensure your global styles are applied

const QuizCard = () => {
  const router = useRouter();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [autoSwitch, setAutoSwitch] = useState(true);

  const cards = [
    { category: "friendship", title: "Friendship quiz", description: "A quiz suitable for gathering friends." },
    { category: "love", title: "Love quiz", description: "Test your relationship knowledge." },
    { category: "adventure", title: "Adventure quiz", description: "Challenge your explorer spirit." },
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
    <div className="quiz-card-container">
      {/* Header */}
      <div className="quiz-card-header">
        <button className="back-button" onClick={handleBack}>←</button>
        <button className="customize-button" onClick={handleCustomizeQuiz}>Customize quiz</button>
      </div>

      {/* Title */}
      <h1 className="quiz-card-title">
        Pick a card<br />to play quiz
      </h1>
      <p className="quiz-card-subtitle">Select the quiz category you want to play</p>

      {/* Carousel */}
      <div className="quiz-card-carousel">
        <button className="carousel-arrow left" onClick={handleLeftArrow}>←</button>
        <div className="cards-wrapper">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`quiz-card-item ${index === currentCardIndex ? "active" : ""}`}
              onClick={handlePlayQuiz}
            >
              <div className="quiz-card-inner" />
            </div>
          ))}
        </div>
        <button className="carousel-arrow right" onClick={handleRightArrow}>→</button>
      </div>

      {/* Play Button */}
      <button className="play-quiz-button" onClick={handlePlayQuiz}>Play Quiz</button>
    </div>
  );
};

export default QuizCard;
