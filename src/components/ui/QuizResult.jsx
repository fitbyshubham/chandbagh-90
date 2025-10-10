"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const QuizResult = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get correct answers and total questions from query params
  const correct = parseInt(searchParams.get("correct") || 0, 10);
  const total = parseInt(searchParams.get("total") || 1, 10);

  // Calculate percentage
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="w-full max-w-md mx-auto h-screen p-6 flex flex-col justify-between bg-teal-600 text-white">
      {/* Main message */}
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold mb-2">Congrats!</h1>
        <h2 className="text-2xl font-semibold mb-4">You completed the quiz!</h2>
        <p className="text-lg">
          Your Score: <span className="font-bold">{correct}</span> /{" "}
          <span className="font-bold">{total}</span>
        </p>
        <p className="text-lg mt-2">
          ({percentage}% Correct)
        </p>
        <p className="mt-4">Hope you enjoyed the quiz!</p>
      </div>

      {/* Bottom buttons */}
      <div className="flex justify-around mb-[120px]">
        <button
          className="bg-white text-gray-800 px-4 py-3 rounded-xl font-bold shadow hover:bg-gray-200 transition"
          onClick={() => router.push("/quiz")} // Navigate back to quiz selection
        >
          Back to Quizzes
        </button>
      </div>
    </div>
  );
};

export default QuizResult;