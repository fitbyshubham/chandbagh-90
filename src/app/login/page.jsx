// src/app/login/page.jsx
"use client";

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '../../components/ui/Alert.jsx';
import { auth } from '../../lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useAuth } from '../../components/AuthProvider';

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
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const router = useRouter();
  const { user } = useAuth();

  // If user is already logged in, redirect to home
  useEffect(() => {
    if (user) {
      router.push('/home');
    }
  }, [user, router]);

  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  // Initialize reCAPTCHA
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initializeRecaptcha = () => {
        try {
          // Clear existing recaptcha if any
          if (window.recaptchaVerifier) {
            try {
              window.recaptchaVerifier.clear();
            } catch (error) {
              console.warn('Error clearing existing reCAPTCHA:', error);
            }
          }

          const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            size: 'invisible',
            callback: (response) => {
              console.log('reCAPTCHA solved');
            },
            'expired-callback': () => {
              console.log('reCAPTCHA expired');
            }
          });

          setRecaptchaVerifier(verifier);
          window.recaptchaVerifier = verifier;
        } catch (error) {
          console.error('Error initializing reCAPTCHA:', error);
        }
      };

      // Delay initialization to ensure DOM is ready
      const timer = setTimeout(initializeRecaptcha, 500);
      return () => {
        clearTimeout(timer);
        if (window.recaptchaVerifier) {
          try {
            window.recaptchaVerifier.clear();
          } catch (error) {
            console.warn('Error clearing reCAPTCHA on unmount:', error);
          }
          delete window.recaptchaVerifier;
        }
      };
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return showAlertMessage("Name is required");
    if (!mobile.trim()) return showAlertMessage("Mobile number is required");
    if (mobile.length !== 10) return showAlertMessage("Mobile number must be 10 digits");
    if (!/^\d+$/.test(mobile)) return showAlertMessage("Mobile number must contain only digits");

    const fullPhoneNumber = `+91${mobile}`;

    setLoading(true);
    try {
      if (!recaptchaVerifier) {
        throw new Error("Security verification not ready. Please wait...");
      }

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        fullPhoneNumber,
        recaptchaVerifier
      );

      // Store phone number and confirmation result reference in localStorage
      localStorage.setItem('signup_phone', mobile);
      localStorage.setItem('signup_name', name);
      // Store the confirmationResult in a global variable for access in OTP page
      window.confirmationResult = confirmationResult;

      // Navigate to OTP page
      router.push('/login/otp');
    } catch (error) {
      console.error('Error sending OTP:', error);
      let errorMessage = "Failed to send OTP. Please try again.";
      
      if (error.code === 'auth/invalid-phone-number') {
        errorMessage = "Invalid phone number format.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many requests. Please try again later.";
      } else if (error.code === 'auth/quota-exceeded') {
        errorMessage = "SMS quota exceeded. Please try again later.";
      } else if (error.code === 'auth/captcha-check-failed') {
        errorMessage = "Security check failed. Please refresh and try again.";
      }

      showAlertMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % images.length), 5000);
    return () => clearInterval(timer);
  }, []);

  useLayoutEffect(() => {
    document.body.classList.add('login-page-active');

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
    document.body.style.height = '100dvh';

    return () => {
      document.body.classList.remove('login-page-active');
      document.documentElement.style.overflow = originalOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.position = originalBodyPosition;
      document.body.style.width = originalBodyWidth;
      document.body.style.height = '';
      window.scrollTo(0, scrollY);
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
        <div className="relative z-20 flex-shrink-0 pt-8 pb-4 text-center">
          <div className="inline-block px-6 py-3 border shadow-lg bg-white/20 backdrop-blur-xl rounded-2xl border-white/30">
            <h1 className="text-2xl font-bold tracking-tight text-white">Welcome To</h1>
            <h2 className="mt-1 text-xl font-bold text-white">Chandbagh 90!</h2>
            <p className="mt-1 text-sm text-white/90">An app made by the students</p>
          </div>
        </div>

        <div className="flex-1"></div>

        {/* Login Card */}
        <div className="relative z-20 flex-shrink-0 px-6 pt-8 pb-6 mx-6 border-t shadow-2xl bg-white/90 backdrop-blur-xl rounded-t-3xl border-gray-200/50">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-2 text-center">
              <h1 className="text-xl font-bold text-gray-800">Let's get you signed in!</h1>
              <p className="mt-1 text-xs text-gray-500">Enter your details below.</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Phone Number</label>
              <div className="flex gap-2">
                <div className="flex items-center border border-gray-300 rounded-xl bg-white/80 px-3 py-2 min-w-[80px]">
                  <span className="text-sm font-medium text-gray-600">+91</span>
                </div>
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="Phone Number"
                  className="flex-1 p-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  maxLength={10}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
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

          {/* Hidden reCAPTCHA container */}
          <div id="recaptcha-container" style={{ display: 'none' }} />
        </div>
      </div>
    </div>
  );
}