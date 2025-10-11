"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

const QuizResult = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const correct = parseInt(searchParams.get("correct") || 0, 10);
  const total = parseInt(searchParams.get("total") || 1, 10);
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 px-6 text-white"
    >
      <div className="bg-gray-900/70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl w-full max-w-md text-center border border-gray-700">
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-4xl font-extrabold mb-2"
        >
          🎉 Congrats!
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-2xl font-semibold mb-6 text-gray-200"
        >
          You completed the quiz!
        </motion.h2>

        <div className="bg-gray-800 text-gray-100 rounded-2xl p-6 shadow-inner mb-6 border border-gray-700">
          <p className="text-lg font-semibold">Your Score</p>
          <p className="text-3xl font-bold text-cyan-400 mt-1">
            {correct} / {total}
          </p>
          <p className="text-sm text-gray-400 mt-1">({percentage}% Correct)</p>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/quiz")}
          className="bg-cyan-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-cyan-500 transition"
        >
          Back to Quizzes
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QuizResult;
