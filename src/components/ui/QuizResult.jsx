"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const QuizResult = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const score = searchParams.get("score") || 0;

  return (
    <div className="quiz-result-container">
      <h1>Congrats!</h1>
      <h2>Your Score: {score}</h2>
      <p>Hope you enjoyed the quiz!</p>

      <div className="quiz-result-buttons">
        <button onClick={() => router.push("/quiz")}>🏠 Home</button>
        <button>⭐ Rating</button>
        <button>📤 Share</button>
      </div>
    </div>
  );
};

export default QuizResult;
