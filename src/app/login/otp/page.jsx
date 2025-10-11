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
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
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
    router.push('/home');
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
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
        </div>

        {/* Welcome Banner */}
        <div className="relative z-20 pt-8 pb-4 text-center flex-shrink-0">
          <div className="inline-block bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
            <h1 className="text-white text-3xl font-bold">Welcome To<br />Chandbagh 90!</h1>
            <p className="text-white text-sm mt-1">An app made by the students</p>
          </div>
        </div>

        <div className="flex-1"></div>

        {/* OTP Card */}
        <div className="mx-6 relative z-20 bg-white rounded-t-3xl shadow-lg px-6 pt-8 pb-6 flex-shrink-0">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-1">Enter the OTP</h1>
            <p className="text-neutral-500 text-sm mb-2">
              Sent to +91{savedPhone || '...'}
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Demo mode: any 6-digit code works (e.g., 123456)
            </p>
          </div>

          <div className="mb-4 flex justify-center gap-2">
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
                className="w-12 h-12 text-center text-lg font-semibold rounded-lg border-2 border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-center text-sm mb-3">{error}</p>}

          <button
            onClick={handleVerify}
            className="w-full bg-black py-3 rounded-lg font-semibold text-white text-lg"
          >
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
}