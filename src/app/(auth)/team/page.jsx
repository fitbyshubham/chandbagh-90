"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";

const team = [
  { name: "Shubham Sharma", role: "Mentor", img: "/Portraits/Shubham.jpg" },
  { name: "Samarth Pundeer", role: "Lead Developer", img: "/Portraits/Pundeer.jpg" },
  { name: "Hemant Khandelwal", role: "Lead Developer", img: "/Portraits/Hemant.jpg" },
  { name: "Vibhor Saraogi", role: "Developer", img: "/Portraits/Vibhor.jpg" },
  { name: "Ojas Tripathi", role: "Developer", img: "/Portraits/Ojas.jpg" },
  { name: "Aarav Anand", role: "Developer", img: "/Portraits/Aarav.jpg" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotate: -2 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function TeamPage() {
  const router = useRouter();

  return (
    <motion.main
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="min-h-screen relative flex flex-col items-center pt-28 pb-32 px-6 md:px-20 lg:px-32 overflow-y-auto bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 via-blue-200 to-blue-300 opacity-20 -z-10"></div>

      <button
        onClick={() => router.push("/home")}
        className="absolute top-6 left-6 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
      >
        ← Back
      </button>

      <motion.h2
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-extrabold text-3xl md:text-4xl mb-12 text-center text-blue-900"
      >
        Meet the Team
      </motion.h2>

      <motion.div
        variants={containerVariants}
        className="flex flex-col items-center space-y-12 w-full max-w-6xl"
      >
        {/* Mentor */}
        <motion.div variants={cardVariants} className="flex justify-center w-full">
          <div className="mx-4 bg-white/20 backdrop-blur-xl border border-blue-400 rounded-3xl shadow-2xl flex flex-col items-center p-6 w-44 h-60 transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-3xl hover:rotate-1">
            <img
              src={team[0].img}
              alt={team[0].name}
              className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-blue-300"
            />
            <div className="font-semibold text-lg text-blue-900 text-center">{team[0].name}</div>
            <div className="text-sm text-blue-700 text-center mt-1">{team[0].role}</div>
          </div>
        </motion.div>

        {/* Lead Developers */}
        <div className="flex justify-center">
          {team.slice(1, 3).map((t) => (
            <motion.div key={t.name} variants={cardVariants} className="mx-3">
              <div className="bg-white/20 backdrop-blur-xl border border-blue-400 rounded-3xl shadow-2xl flex flex-col items-center p-6 w-44 h-60 transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-3xl hover:rotate-1">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-blue-300"
                />
                <div className="font-semibold text-lg text-blue-900 text-center">{t.name}</div>
                <div className="text-sm text-blue-700 text-center mt-1">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Developers */}
        <div className="flex justify-center">
          {team.slice(3, 5).map((t) => (
            <motion.div key={t.name} variants={cardVariants} className="mx-3">
              <div className="bg-white/20 backdrop-blur-xl border border-blue-400 rounded-3xl shadow-2xl flex flex-col items-center p-6 w-44 h-60 transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-3xl hover:rotate-1">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-blue-300"
                />
                <div className="font-semibold text-lg text-blue-900 text-center">{t.name}</div>
                <div className="text-sm text-blue-700 text-center mt-1">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Last Developer */}
        <motion.div variants={cardVariants} className="flex justify-center w-full">
          <div className="mx-4 bg-white/20 backdrop-blur-xl border border-blue-400 rounded-3xl shadow-2xl flex flex-col items-center p-6 w-44 h-60 transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-3xl hover:rotate-1">
            <img
              src={team[5].img}
              alt={team[5].name}
              className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-blue-300"
            />
            <div className="font-semibold text-lg text-blue-900 text-center">{team[5].name}</div>
            <div className="text-sm text-blue-700 text-center mt-1">{team[5].role}</div>
          </div>
        </motion.div>
      </motion.div>
    </motion.main>
  );
}
