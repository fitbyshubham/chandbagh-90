"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const QuizPlay = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cardIndex = searchParams.get("card") || 0;

  const [timeLeft, setTimeLeft] = useState(10);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { label: "A", text: "Turtle" },
    { label: "B", text: "Cheetah" },
    { label: "C", text: "Rabbit" },
    { label: "D", text: "Leopard" },
  ];

  useEffect(() => {
    if (timeLeft <= 0) return handleFinishQuiz();
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setTimeout(handleFinishQuiz, 500);
  };

  const handleFinishQuiz = () => {
    const score = selectedOption === "B" ? 100 : 0;
    router.push(`/quiz/result?score=${score}`);
  };

  return (
    <div className="quiz-play-container">
      <h2>🤔 Oh My Quiz!</h2>
      <h1>What is the fastest animal in the world?</h1>

      <div className="quiz-timer">{`0:${String(timeLeft).padStart(2, "0")}`}</div>

      <div className="quiz-options-grid">
        {options.map((option) => (
          <div key={option.label} className="quiz-option" onClick={() => handleSelectOption(option.label)}>
            <div className="quiz-option-label">{option.label}</div>
            <div className="quiz-option-text">{option.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizPlay;
