"use client";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [userName, setUserName] = useState("Guest");
  const [userPhone, setUserPhone] = useState("Not Provided");

  useEffect(() => {
    const savedName = localStorage.getItem("signup_name");
    const savedPhone = localStorage.getItem("signup_phone");
    if (savedName) setUserName(savedName);
    if (savedPhone) setUserPhone(savedPhone);
  }, []);

  return (
    <div className="fixed inset-0 bg-white overflow-y-auto mt-[100px]">
      <div className="flex flex-col p-6 min-h-screen">
        {/* Profile Header */}
        <div className="text-center mt-10 mb-6">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto object-cover"
          />
          <h2 className="text-2xl font-semibold mt-4 text-gray-800">
            Hello {userName}
          </h2>
          <p className="text-sm text-gray-600 mt-2">{userPhone}</p>
        </div>

        {/* Menu items */}
        <div className="flex flex-col divide-y divide-gray-200">
          <div className="flex items-center justify-between px-5 py-4 mt-[50px]">
            <div className="flex items-center gap-3">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDcmCG2F_4GYTBV3EwUTIQJztQTxt2BbYMAg&s"
                alt="Recent Transactions"
                className="w-12 h-12 mr-[20px]"
              />
              <span className="text-base text-gray-800 mr-[20px]">Recent Transactions</span>
            </div>
            <span className="text-gray-400">{">"}</span>
          </div>

          <div className="flex items-center justify-between px-5 py-4 ">
            <div className="flex items-center gap-3 ">
              <img
                src="https://www.svgrepo.com/show/192522/customer-service-support.svg"
                alt="Help & Support"
                className="w-10 h-10 mr-[20px] ml-[5px]"
              />
              <span className="text-base text-gray-800 mr-[20px]">Help & Support</span>
            </div>
            <span className="text-gray-400">{">"}</span>
          </div>

          <div className="flex items-center justify-between px-5 py-4 mt-[50px]">
            <div className="flex items-center gap-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4421/4421772.png"
                alt="Logout"
                className="w-6 h-6 mr-[20px] ml-[15px]"
              />
              <span className="text-base text-gray-800 ml-[6px] mr-[20px]">Logout</span>
            </div>
            <span className="text-gray-400">{">"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
