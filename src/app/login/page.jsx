// src/app/login/page.jsx
"use client";

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '../../components/ui/Alert.jsx';

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

export default function LoginPage() {
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const router = useRouter();

  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  useLayoutEffect(() => {
    // Add class to hide header/navbar
    document.body.classList.add('login-page-active');

    // Lock scroll
    const originalOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPosition = document.body.style.position;
    const originalBodyWidth = document.body.style.width;
    const scrollY = window.scrollY;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.height = '100dvh'; // Prevent height expansion

    return () => {
      // Cleanup
      document.body.classList.remove('login-page-active');
      document.documentElement.style.overflow = originalOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.position = originalBodyPosition;
      document.body.style.width = originalBodyWidth;
      document.body.style.height = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return showAlertMessage("Name is required");
    if (!mobile.trim()) return showAlertMessage("Mobile number is required");
    if (mobile.length !== 10) return showAlertMessage("Mobile number must be 10 digits");
    if (!/^\d+$/.test(mobile)) return showAlertMessage("Mobile number must contain only digits");

    localStorage.setItem('signup_phone', mobile);
    localStorage.setItem('signup_name', name);
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/login/otp');
    }, 800);
  };

  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % images.length), 5000);
    return () => clearInterval(timer);
  }, []);

  // 🔒 CRITICAL: Disable body scroll when component mounts
  useLayoutEffect(() => {
    // Save original overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';

    // Re-enable on unmount
    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, []);

  const currentImage = images[current].image.trim();

  return (
    <div className="fixed inset-0 z-50 w-auto h-auto overflow-hidden bg-white">
      <div className="max-w-[100%] max-h-[100%] h-full mx-auto relative flex flex-col">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full transition-opacity duration-1000"
            style={{
              backgroundImage: `url('${currentImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
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

        {/* Login Card */}
        <div className="mx-6 relative z-20 bg-white/90 backdrop-blur-xl rounded-t-3xl shadow-2xl px-6 pt-8 pb-6 border-t border-gray-200/50 flex-shrink-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center mb-2">
              <h1 className="text-xl font-bold text-gray-800">Let's get you signed in!</h1>
              <p className="text-gray-500 text-xs mt-1">Enter your details below.</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Phone Number</label>
              <div className="flex gap-2">
                <div className="flex items-center border border-gray-300 rounded-xl bg-white/80 px-3 py-2 min-w-[80px]">
                  <span className="text-gray-600 font-medium text-sm">+91</span>
                </div>
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="Phone Number"
                  className="flex-1 p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 text-sm text-gray-900 placeholder-gray-500"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  maxLength={10}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 text-sm text-gray-900 placeholder-gray-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold text-base ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg'
              }`}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>

          {showAlert && (
            <div className="mt-3">
              <Alert type="danger" text={alertMessage} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}