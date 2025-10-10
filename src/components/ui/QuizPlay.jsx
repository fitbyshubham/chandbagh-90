// src/app/quiz/play/page.jsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// IMPORTANT: Assuming this path is correct
import quizData from "@/data/quiz.json"; 

const QuizPlay = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const categoryKey = searchParams.get("category"); 
  const currentQuiz = quizData[categoryKey] || []; 
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);

  const currentQuestion = currentQuiz[currentQuestionIndex];
  const QUESTION_TIME_LIMIT = 5;

  // --- Core Logic Functions ---

  const handleFinishQuiz = useCallback((finalAnswers) => {
    const correctCount = finalAnswers.filter(answer => answer.isCorrect).length;
    const totalQuestions = finalAnswers.length;
    router.replace(`/quiz/result?correct=${correctCount}&total=${totalQuestions}`);
  }, [router]);

  const handleNextQuestion = useCallback((newAnswer) => {
    const nextAnswers = [...answers, newAnswer];
    setAnswers(nextAnswers);

    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < currentQuiz.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedOption(null);
      setTimeLeft(QUESTION_TIME_LIMIT);
    } else {
      handleFinishQuiz(nextAnswers);
    }
  }, [answers, currentQuestionIndex, currentQuiz.length, handleFinishQuiz]);

  const handleSelectOption = useCallback((optionText) => {
    if (selectedOption || !currentQuestion) return;

    const isCorrect = optionText === currentQuestion.correctAnswer;
    setSelectedOption(optionText);

    const newAnswer = {
      question: currentQuestion.question,
      selected: optionText,
      correct: currentQuestion.correctAnswer,
      isCorrect
    };

    setTimeout(() => {
      handleNextQuestion(newAnswer);
    }, 1500); 
    
  }, [currentQuestion, selectedOption, handleNextQuestion]);

  // --- Effects ---

  useEffect(() => {
    if (!currentQuestion || selectedOption) return;

    if (timeLeft <= 0) {
      handleSelectOption(null);
      return;
    }
    
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, currentQuestion, selectedOption, handleSelectOption]);


  // --- Rendering Functions ---

  if (!categoryKey || currentQuiz.length === 0) {
    return (
        <div className="w-full min-h-screen p-6 flex flex-col justify-center items-center bg-gray-900 text-white">
            <h2 className="text-xl font-bold mb-4 text-red-500">Quiz Data Not Found! 🛑</h2>
            <p className="text-center text-gray-400">
                Please go back and select a valid quiz category.
            </p>
            <button 
                onClick={() => router.push('/quiz')} 
                className="mt-6 bg-indigo-600 text-white font-bold py-2 px-4 rounded-full hover:bg-indigo-500 transition"
            >
                Go to Quiz Selection
            </button>
        </div>
    );
  }
  
  if (!currentQuestion) {
    return (
      <div className="w-full min-h-screen p-6 flex flex-col justify-center items-center bg-gray-900 text-white">
        <div className="text-2xl font-semibold animate-pulse">Calculating Results... 🧠</div>
      </div>
    );
  }

  const getOptionClasses = (optionText) => {
    let base = "bg-gray-800 text-white rounded-xl p-4 flex items-center shadow-lg transition-all duration-300 transform font-semibold text-base ";
    
    if (selectedOption) {
      if (optionText === currentQuestion.correctAnswer) {
        return base + "bg-green-600 ring-4 ring-green-400 scale-[1.03] text-white";
      } else if (optionText === selectedOption) {
        return base + "bg-red-600 ring-4 ring-red-400 scale-[1.03] text-white";
      } else {
        return base + "opacity-50 pointer-events-none";
      }
    } else {
      return base + "hover:bg-indigo-600 hover:scale-[1.02] cursor-pointer";
    }
  };

  return (
    // FIX: Increased top padding (pt-16) to push content below the fixed header bar.
    <div className="w-full min-h-screen bg-gray-900 text-white px-6 py-4 pt-16 flex flex-col justify-between pb-28"> 
        
        {/* Inner container to constrain content on very large screens */}
        <div className="w-full max-w-xl mx-auto flex flex-col flex-1">
            
            {/* Header and Status */}
            <div className="pt-2 mb-4">
                <button
                    onClick={() => router.push('/quiz')}
                    className="text-gray-400 hover:text-white transition mb-3 flex items-center text-sm"
                    aria-label="Back to Quiz Selection"
                >
                    ← Back to Categories
                </button>
                
                {/* Progress Bar and Timer Inline */}
                <div className="flex justify-between items-center mb-1">
                    <div className="text-lg font-bold text-white">
                        Q.{currentQuestionIndex + 1} / {currentQuiz.length}
                    </div>
                    {/* Timer Ring */}
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-colors duration-500 ${
                        timeLeft <= 2 && !selectedOption ? 'border-red-500 text-red-500' : 'border-indigo-500 text-indigo-500'
                    }`}>
                        {String(timeLeft).padStart(2, "0")}s
                    </div>
                </div>

                {/* Visual Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                        className="bg-indigo-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${((currentQuestionIndex + 1) / currentQuiz.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Question Text */}
            <h1 className="text-3xl font-extrabold text-center mt-3 leading-tight flex-grow flex items-center justify-center">
                {currentQuestion.question}
            </h1>
        </div>

        {/* Bottom Section: Options (Grid Layout) */}
        <div className="w-full py-4 max-w-xl mx-auto"> 
            <div className="grid grid-cols-1 gap-3">
                {currentQuestion.options.map((option) => (
                    <button
                        key={option}
                        className={getOptionClasses(option)}
                        onClick={() => handleSelectOption(option)}
                        disabled={!!selectedOption}
                    >
                        <div className="text-center w-full">
                            {option}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    </div>
  );
};

export default QuizPlay;