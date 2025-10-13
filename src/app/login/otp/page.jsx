// src/app/login/otp/page.jsx
"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';

const images = [
  {
    image: "https://plus.unsplash.com/premium_photo-1727552116095-889cb485a803?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JvdXAlMjBzZWxmaWV8ZW58MHx8MHx8fDA%3D",
    imageNo: "1"
  },
  {
    image: "  https://media.istockphoto.com/id/1479798765/photo/vertical-group-of-happy-friends-posing-for-a-selfie-on-a-spring-day-as-they-party-together.jpg?s=612x612&w=0&k=20&c=3ch9k6zg71DfVtWzf1Q-TgJXPeQyoflY7fCpiPLmoZs=",
    imageNo: "2"
  },
  {
    image: "  https://c8.alamy.com/comp/EC1E47/indian-group-friends-park-enjoy-EC1E47.jpg  ",
    imageNo: "3"
  },
];

export default function OtpPage() {
  const router = useRouter();
  const length = 6;
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
    
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      router.push('/home');
    }, 800);
  };

  // 🔒 LOCK SCROLL & HIDE LAYOUT
  useLayoutEffect(() => {
    // Add class to hide Header/Navbar
    document.body.classList.add('login-page-active');

    // Lock scroll
    const scrollY = window.scrollY;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      height: document.body.style.height,
    };

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.height = '100dvh';

    return () => {
      // Cleanup
      document.body.classList.remove('login-page-active');
      document.documentElement.style.overflow = originalHtmlOverflow;
      Object.assign(document.body.style, originalBodyStyles);
      window.scrollTo(0, scrollY);
    };
  }, []);

  const currentImage = images[current].image.trim();

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen overflow-hidden bg-white">
      <div className="max-w-[100%] max-h-[100%] h-full mx-auto relative flex flex-col">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url('${currentImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" aria-hidden="true" />
        </div>

        {/* Welcome Banner */}
        <div className="relative z-20 pt-8 pb-4 text-center flex-shrink-0">
          <div className="inline-block bg-white/20 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/30 shadow-lg">
            <h1 className="text-white text-2xl font-bold tracking-tight">Welcome To</h1>
            <h2 className="text-white text-xl font-bold mt-1">Chandbagh 90!</h2>
            <p className="text-white/90 text-sm mt-1">An app made by the students</p>
          </div>
        </div>

        <div className="flex-1"></div>

        {/* OTP Card */}
        <div className="mx-6 relative z-20 bg-white/90 backdrop-blur-xl rounded-t-3xl shadow-2xl px-6 pt-8 pb-6 border-t border-gray-200/50 flex-shrink-0">
          <div className="text-center mb-2">
            <h1 className="text-xl font-bold text-gray-800">Verify your account</h1>
            <p className="text-gray-500 text-xs mt-1">Enter the OTP sent to your phone</p>
          </div>

          <div className="space-y-1 mb-4">
            <label className="text-xs font-medium text-gray-600">Phone Number</label>
            <div className="flex gap-2">
              <div className="flex items-center border border-gray-300 rounded-xl bg-white/80 px-3 py-2 min-w-[80px]">
                <span className="text-gray-600 font-medium text-sm">+91</span>
              </div>
              <div className="flex-1 p-2 rounded-xl border border-gray-300 bg-white/80 text-sm text-gray-900">
                {savedPhone || '...'}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-xs font-medium text-gray-600 block mb-2">Enter OTP</label>
            <div className="flex justify-center gap-2">
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
                  className="w-12 h-12 text-center text-xl font-semibold rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 shadow-sm"
                />
              ))}
            </div>
          </div>

          {error && <p className="text-red-500 text-center text-sm mb-3">{error}</p>}

          <button
            onClick={handleVerify}
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-base ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg'
            }`}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Demo mode: any 6-digit code works (e.g., 123456)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}