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
    <div className="w-full max-w-md mx-auto h-screen p-6 flex flex-col justify-between bg-purple-700 text-white">
      <div className="mt-[50px]">
        <h2 className="text-lg font-bold flex items-center gap-2">🤔 Oh My Quiz!</h2>
        <h1 className="text-2xl font-bold mt-4 mb-6">What is the fastest animal in the world?</h1>

        <div className="w-24 h-24 rounded-full border-8 border-red-400 mx-auto flex items-center justify-center mb-6 mt-[100px]">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold">
            {`0:${String(timeLeft).padStart(2, "0")}`}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 mt-[160px]">
          {options.map((option) => (
            <div
              key={option.label}
              className="bg-white text-gray-800 rounded-xl p-4 flex flex-col items-center cursor-pointer shadow hover:scale-105 transition"
              onClick={() => handleSelectOption(option.label)}
            >
              <div className="w-8 h-8 rounded-full bg-teal-400 flex items-center justify-center font-bold mb-2">
                {option.label}
              </div>
              <div className="font-bold">{option.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizPlay;
