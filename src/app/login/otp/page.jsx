// src/app/login/otp/page.jsx
"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../components/AuthProvider';

const images = [
  {
    image: "/photos/a1.jpeg",
    imageNo: "1"
  },
  {
    image: "/photos/ac1.jpg",
    imageNo: "2"
  },
  {
    image: "https://www.doonschool.com/wp-content/uploads/2023/09/5-7-1024x1024.jpg",
    imageNo: "3"
  },
];

export default function OtpPage() {
  const router = useRouter();
  const { user } = useAuth();
  const length = 6;
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  // If user is already logged in, redirect to home
  useEffect(() => {
    if (user) {
      router.push('/home');
    }
  }, [user, router]);

  const savedPhone = typeof window !== 'undefined' 
    ? localStorage.getItem('signup_phone') 
    : null;

  useEffect(() => {
    if (!savedPhone) {
      router.push('/login');
      return;
    }
    
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

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== length) {
      setError(`Please enter a ${length}-digit OTP`);
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      // Get the confirmation result from the global variable
      const confirmationResult = window.confirmationResult;
      
      if (!confirmationResult) {
        throw new Error("Verification session expired. Please request a new OTP.");
      }

      // Verify OTP using Firebase
      const result = await confirmationResult.confirm(otpCode);
      console.log("OTP verification successful:", result);
      
      // Clear the global variable
      delete window.confirmationResult;
      
      // Store the user's name in localStorage (don't remove it after verification)
      // Only clear the phone number and other temporary data
      const savedName = localStorage.getItem('signup_name');
      
      // Clear only temporary data, keep the name
      localStorage.removeItem('signup_phone');
      
      // Store the name permanently for the home page
      if (savedName) {
        localStorage.setItem('user_name', savedName);
      }
      
      // User is now authenticated, so redirect to home
      router.push('/home');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      let errorMessage = "Invalid OTP. Please check and try again.";
      
      if (error.code === 'auth/invalid-verification-code') {
        errorMessage = "Invalid OTP code. Please check and try again.";
      } else if (error.code === 'auth/code-expired') {
        errorMessage = "OTP has expired. Please request a new one.";
      } else if (error.code === 'auth/credential-already-in-use') {
        errorMessage = "This phone number is already registered.";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 🔒 LOCK SCROLL & HIDE LAYOUT
  useLayoutEffect(() => {
  document.body.classList.add('login-page-active');
  const scrollY = window.scrollY;

  document.documentElement.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';

  return () => {
    document.body.classList.remove('login-page-active');
    document.documentElement.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, scrollY);
  };
}, []);


  const currentImage = images[current].image.trim();

  return (
    <div className="fixed inset-0 z-50 w-screen h-[100svh] overflow-y-auto bg-white touch-pan-y">
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
        <div className="relative z-20 flex-shrink-0 pt-8 pb-4 text-center">
          <div className="inline-block px-6 py-3 border shadow-lg bg-white/20 backdrop-blur-xl rounded-2xl border-white/30">
            <h1 className="text-2xl font-bold tracking-tight text-white">Welcome To</h1>
            <h2 className="mt-1 text-xl font-bold text-white">Chandbagh 90!</h2>
            <p className="mt-1 text-sm text-white/90">An app made by the students</p>
          </div>
        </div>

        <div className="flex-1"></div>

        {/* OTP Card */}
        <div className="relative z-20 flex-shrink-0 px-6 pt-8 pb-6 mx-6 border-t shadow-2xl bg-white/90 backdrop-blur-xl rounded-t-3xl border-gray-200/50">
          <div className="mb-2 text-center">
            <h1 className="text-xl font-bold text-gray-900">Verify your account</h1>
            <p className="mt-1 text-xs text-gray-500">Enter the OTP sent to your phone</p>
          </div>

          <div className="mb-4 space-y-1">
            <label className="text-xs font-medium text-gray-600">Phone Number</label>
            <div className="flex gap-2">
              <div className="flex items-center border border-gray-300 rounded-xl bg-white/80 px-3 py-2 min-w-[80px]">
                <span className="text-sm font-medium text-gray-600">+91</span>
              </div>
              <div className="flex-1 p-2 text-sm text-gray-900 border border-gray-300 rounded-xl bg-white/80">
                {savedPhone || '...'}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-xs font-medium text-gray-600">Enter OTP</label>
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
                  className="w-12 h-12 text-xl font-semibold text-center text-gray-900 bg-white border border-gray-200 shadow-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
              ))}
            </div>
          </div>

          {error && <p className="mb-3 text-sm text-center text-red-500">{error}</p>}

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
              Please check your phone messages for the OTP
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}