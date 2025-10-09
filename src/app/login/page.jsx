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
  const [countryCode] = useState("+91");
  const router = useRouter();

  const handleRoute = () => {
    router.push('/login/otp');
  };

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("Success");
  const [alertMessage, setAlertMessage] = useState("empty");

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mobile.trim()) return showAlertMessage("Error", "Mobile number is required");
    if (mobile.length !== 10) return showAlertMessage("Error", "Mobile number must be 10 digits");
    if (!/^\d+$/.test(mobile)) return showAlertMessage("Error", "Mobile number must contain only digits");
    if (!name.trim()) return showAlertMessage("Error", "Name is required");

    showAlertMessage("Success", "Login successful!");
    setTimeout(handleRoute, 1000);
  };

  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % images.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white max-w-[375px] mx-auto relative overflow-hidden">
      <div
        className="absolute inset-0 transition-opacity duration-1000 z-0"
        style={{
          backgroundImage: `url('${images[current].image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/30 z-10" aria-hidden="true" />

      <div className="relative z-20 pt-8 pb-4 text-center">
        <div className="inline-block bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
          <h1 className="text-white text-3xl font-bold">Welcome To<br />Chandbagh 90!</h1>
          <p className="text-white text-sm mt-1">An app made by the students</p>
        </div>
      </div>

      <div className="flex-1"></div>

      <div className="relative z-20 bg-white rounded-t-3xl shadow-lg px-6 pt-6 pb-6 -mt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Let's get you <br /> signed in!</h2>
            <p className="text-neutral-500 text-sm mt-1">Enter your details below.</p>
          </div>

          <div className="flex gap-2">
            <div className="flex items-center border border-neutral-300 rounded-lg bg-white px-3 py-2 min-w-[80px]">
              <span className="text-neutral-500 font-medium">+91</span>
            </div>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="Phone Number"
              className="flex-1 p-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
              maxLength={10}
            />
          </div>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-black py-3 rounded-lg font-semibold text-white text-lg"
          >
            Sign In
          </button>
        </form>

        {showAlert && (
          <div className="mt-4">
            <Alert type={alertType === "Success" ? "success" : "danger"} text={alertMessage} />
          </div>
        )}
      </div>
    </div>
  );
}