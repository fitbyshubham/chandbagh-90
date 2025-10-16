"use client";
import React from "react";
import { useRouter } from "next/navigation";
import useProtectedRoute from "../../../components/hook/useProtectedRoute";
export default function Onboarding() {
  const router = useRouter();

  const images = [
    "/photos/i1.png",
    "/photos/i2.png",
    "/photos/i3.png",
    "/photos/i4.png",
    "/photos/i5.png",
    "/photos/i6.png",
    "/photos/i7.png",
    "/photos/i8.png",
  ];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      {/* Moving Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-scrollUp grid grid-cols-3 gap-2 opacity-75">
          {[...images, ...images, ...images].map((src, i) => (
            <img
              key={i}
              src={`${src}?auto=format&fit=crop&w=300&q=80`}
              alt={`poster-${i}`}
              className="w-full h-32 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 text-center px-6c mt-[250px]">
        <h1 className="text-3xl font-bold mb-3">Welcome to DS90 App</h1>
        <p className="text-gray-300 mb-6 text-sm">
          Perfect Place To Maximize Your Founders Experience
        </p>
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-10 rounded-full transition"
        >
          Get Started
        </button>
      </div>

      {/* Background Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes scrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .animate-scrollUp {
          animation: scrollUp 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
