"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [userName, setUserName] = useState("Guest");
  const [userPhone, setUserPhone] = useState("Not Provided");
  const [showHelp, setShowHelp] = useState(false); // state for help popup

  useEffect(() => {
    const savedName = localStorage.getItem("signup_name");
    const savedPhone = localStorage.getItem("signup_phone");
    if (savedName) setUserName(savedName);
    if (savedPhone) setUserPhone(savedPhone);
  }, []);

  const handleClick = (itemLabel) => {
    if (itemLabel === "Recent Transactions") {
      router.push("/my-orders");
    } else if (itemLabel === "Help & Support") {
      setShowHelp(true);
    } else if (itemLabel === "Logout") {
      // Clear any user data
      localStorage.removeItem("signup_name");
      localStorage.removeItem("signup_phone");
      router.push("/firstpage");
    }
  };

  const menuItems = [
    {
      label: "Recent Transactions",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDcmCG2F_4GYTBV3EwUTIQJztQTxt2BbYMAg&s",
    },
    {
      label: "Help & Support",
      icon: "https://www.svgrepo.com/show/192522/customer-service-support.svg",
    },
    {
      label: "Logout",
      icon: "https://cdn-icons-png.flaticon.com/512/4421/4421772.png",
      danger: true,
    },
  ];

  return (
    <div className="fixed inset-0 bg-gray-50 overflow-y-auto">
      <div className="max-w-md mx-auto p-6 pb-24">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mt-20 text-center">
          <div className="relative">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-md"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            {userName || "Guest"}
          </h2>
          <p className="text-sm text-gray-500">{userPhone}</p>
        </div>

        {/* Menu Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm divide-y divide-gray-100 overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleClick(item.label)}
              className={`w-full flex items-center justify-between p-5 transition-all hover:bg-orange-50 ${
                item.danger ? "text-red-500 font-medium" : "text-gray-700"
              }`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-8 h-8 object-contain"
                />
                <span className="text-base font-medium">{item.label}</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>

        {/* Help & Support Modal */}
        {showHelp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg">
              <h2 className="text-xl font-bold mb-4">Contact Us</h2>
              <ul className="space-y-2 text-gray-700">
                <li>Contact:</li>
                <li>+91 7777060768</li>
                <li>+91 7579440559</li>
                <li>+91 6393690775</li>
                
              </ul>
              <button
                onClick={() => setShowHelp(false)}
                className="mt-6 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* App Info / Footer */}
        <div className="text-center text-gray-400 text-xs mt-10">
          <p>Version 1.0.0 • DS90 Founders Day App</p>
          <p className="mt-1">© 2025 All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}
