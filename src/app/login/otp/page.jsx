// src/app/login/otp/page.jsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const images = [
  {
    image: "https://plus.unsplash.com/premium_photo-1727552116095-889cb485a803?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JvdXAlMjBzZWxmaWV8ZW58MHx8MHx8fDA%3D",
    imageNo: "1"
  },
  {
    image: "https://media.istockphoto.com/id/1479798765/photo/vertical-group-of-happy-friends-posing-for-a-selfie-on-a-spring-day-as-they-party-together.jpg?s=612x612&w=0&k=20&c=3ch9k6zg71DfVtWzf1Q-TgJXPeQyoflY7fCpiPLmoZs=",
    imageNo: "2"
  },
  {
    image: "https://c8.alamy.com/comp/EC1E47/indian-group-friends-park-enjoy-EC1E47.jpg",
    imageNo: "3"
  },
];

export default function OtpPage() {
  const router = useRouter();
  const length = 6;
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const savedPhone = typeof window !== 'undefined' 
    ? localStorage.getItem('signup_phone') 
    : null;

  useEffect(() => {
    if (!savedPhone) router.push('/login');
    // Focus on the first input box when the component loads
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [savedPhone, router]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value === "" && otp[index] === "") return;

    const newOtp = [...otp];
    newOtp[index] = value ? value[0] : "";
    setOtp(newOtp);
    setError("");

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      } else if (otp[index]) {
        // Allow backspace to clear current digit without moving back immediately
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % images.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const handleVerify = () => {
    const otpCode = otp.join("");
    if (otpCode.length !== length) {
      setError(`Please enter a ${length}-digit OTP`);
      return;
    }

    // ✅ MOCK: Skip real verification — just go to home
    router.push('/home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white max-w-[375px] mx-auto relative overflow-hidden">
      {/* Background with fading image carousel */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `url('${images[current].image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/50 z-10" aria-hidden="true" />
      </div>

      {/* Header Banner */}
      <div className="relative z-20 pt-8 pb-4 text-center">
        <div className="inline-block bg-black/50 backdrop-blur-sm px-4 py-2 rounded-xl">
          <h1 className="text-white text-3xl font-bold tracking-tight">Welcome To</h1>
          <h2 className="text-white text-xl font-bold mt-1">Chandbagh 90!</h2>
          <p className="text-white text-sm mt-1">An app made by the students</p>
        </div>
      </div>

      <div className="flex-1"></div>

      {/* OTP Card */}
      <div className="relative z-20 bg-white rounded-t-3xl shadow-2xl px-6 pt-8 pb-6 -mt-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-1">Enter the OTP</h1>
          <p className="text-neutral-500 text-sm mb-2">
            Sent to <span className="font-semibold text-gray-700">+91 {savedPhone || '...'}</span>
          </p>
          <p className="text-xs text-gray-500 mb-6">
            Demo mode: any 6-digit code works (e.g., 123456)
          </p>
        </div>

        <div className="mb-6 flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              // FIX: Explicitly set text color to dark (text-gray-900)
              className="w-12 h-12 text-center text-lg font-semibold rounded-lg border-2 border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black text-gray-900" 
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}

        <button
          onClick={handleVerify}
          className="w-full bg-black py-3 rounded-xl font-semibold text-white text-lg shadow-md hover:bg-gray-800 transition"
        >
          Verify OTP
        </button>
        
        <button
            onClick={() => { /* In a real app, this would trigger re-send logic */ }}
            className="w-full mt-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
        >
            Resend OTP
        </button>
      </div>
    </div>
  );
}