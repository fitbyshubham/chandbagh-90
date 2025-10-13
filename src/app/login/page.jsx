// src/app/login/page.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '../../components/ui/Alert.jsx';

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return showAlertMessage("Name is required");
    if (!mobile.trim()) return showAlertMessage("Mobile number is required");
    if (mobile.length !== 10) return showAlertMessage("Mobile number must be 10 digits");
    if (!/^\d+$/.test(mobile)) return showAlertMessage("Mobile number must contain only digits");

    // ✅ MOCK: Skip Supabase — just save and redirect
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

  return (
    <div className="min-h-screen flex flex-col bg-white max-w-[375px] mx-auto relative overflow-hidden">
      {/* Background */}
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" aria-hidden="true" />
      </div>

      {/* Welcome Banner */}
      <div className="relative z-20 pt-8 pb-4 text-center">
        <div className="inline-block bg-white/20 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/30 shadow-lg">
          <h1 className="text-white text-2xl font-bold tracking-tight">Welcome To</h1>
          <h2 className="text-white text-xl font-bold mt-1">Chandbagh 90!</h2>
          <p className="text-white/90 text-sm mt-1">An app made by the students</p>
        </div>
      </div>

      <div className="flex-1"></div>

      {/* Login Card */}
      <div className="relative z-20 bg-white/90 backdrop-blur-xl rounded-t-3xl shadow-2xl px-6 pt-6 pb-5 -mt-6 border-t border-gray-200/50">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center mb-1">
            <h1 className="text-xl font-bold text-gray-800">Let's get you signed in!</h1>
            <p className="text-gray-500 text-xs mt-1">Enter your details below.</p>
          </div>

          {/* Phone Input */}
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
                // FIX: Explicitly added text-gray-900 to ensure dark text color
                className="flex-1 p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 text-sm text-gray-900" 
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                maxLength={10}
              />
            </div>
          </div>

          {/* Name Input */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              // FIX: Explicitly added text-gray-900 to ensure dark text color
              className="w-full p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 text-sm text-gray-900"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Submit Button */}
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
  );
}