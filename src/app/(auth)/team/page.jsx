"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";

const team = [
  {
    name: "Shubham Sharma",
    role: "Mentor",
    img: "/Portraits/Shubham.jpg",
    desc: "Guided the team with strategic vision and technical expertise throughout the development journey.",
  },
  {
    name: "Hemant Khandelwal",
    img: "/Portraits/Hemant.jpg",
    desc: "Led the core development and optimized app performance with clean, efficient code.",
  },
  {
    name: "Samarth Pundeer",
    img: "/Portraits/Pundeer.jpg",
    desc: "Oversaw the app architecture, ensuring seamless integration between frontend and backend.",
  },
  
  {
    name: "Vibhor Saraogi",
    img: "/Portraits/Vibhor.jpg",
    desc: "Focused on UI/UX development, bringing the design to life with animations and responsiveness.",
  },
  {
    name: "Aarav Anand",
    img: "/Portraits/Aarav.jpg",
    desc: "Worked on the app’s user interaction layer and contributed to feature enhancements.",
  },
  
  {
    name: "Reyhan Singh",
    img: "/Portraits/d.jpg",
    desc: "Implemented key backend features and helped in maintaining robust data structures.",
  },
  {
    name: "Shiven Goenka",
    img: "/Portraits/d.jpg",
    desc: "Implemented key backend features and helped in maintaining robust data structures.",
  },
  {
    name: "Daksh Veer Singh",
    img: "/Portraits/d.jpg",
    desc: "Implemented key backend features and helped in maintaining robust data structures.",
  },
  {
    name: "Nachiket Kediyal",
    img: "/Portraits/d.jpg",
    desc: "Implemented key backend features and helped in maintaining robust data structures.",
  },
  {
    name: "Agastya Jitesh Shetty",
    img: "/Portraits/d.jpg",
    desc: "Implemented key backend features and helped in maintaining robust data structures.",
  },
  {
    name: "Shubh Agarwal",
    img: "/Portraits/d.jpg",
    desc: "Implemented key backend features and helped in maintaining robust data structures.",
  },
  {
    name: "Zafir Ali Naqvi",
    img: "/Portraits/d.jpg",
    desc: "Implemented key backend features and helped in maintaining robust data structures.",
  },
  
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function TeamPage() {
  const router = useRouter();

  return (
    <motion.main
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="min-h-screen relative flex flex-col items-center pt-28 pb-32 px-6 md:px-20 lg:px-40 bg-gradient-to-b from-blue-50 via-teal-50 to-gray-50"
    >
      {/* Back Button */}
      <button
        onClick={() => router.push("/home")}
        className="absolute top-6 left-6 px-4 py-2 rounded-full bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-500 transition-colors"
      >
        ← Back
      </button>

      {/* Why We Made This App */}
      <motion.section
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl text-center mb-24"
      >
        <h2 className="font-extrabold text-3xl md:text-4xl mb-6 text-gray-900">
          Why We Made This App
        </h2>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          We built this app to create something meaningful — a solution that simplifies user
          experience while feeling intuitive, personal, and elegant. Our goal was to design a product
          that doesn’t just work well but inspires confidence, creativity, and connection. Every part
          of this app reflects our dedication and teamwork.
        </p>
      </motion.section>

      {/* Meet the Team */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-extrabold text-3xl md:text-4xl mb-16 text-center text-gray-900"
      >
        Meet the Team
      </motion.h2>

      {/* Team List */}
      <motion.div
        variants={containerVariants}
        className="flex flex-col w-full max-w-4xl"
      >
        {team.map((member, index) => (
          <React.Fragment key={member.name}>
            <motion.div
              variants={itemVariants}
              className="flex flex-row items-start gap-6 w-full py-6 transition-transform transform hover:-translate-y-1"
            >
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover shadow-lg ring-1 ring-blue-400"
                />
              </div>

              {/* Name + Role + Description */}
              <div className="flex flex-col justify-center text-left">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                  {member.name}
                </h3>
                {member.role && (
                  <p className="text-teal-600 text-sm md:text-base font-medium mt-1 mb-2">
                    {member.role}
                  </p>
                )}
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {member.desc}
                </p>
              </div>
            </motion.div>

            {/* Neutral modern gradient separator */}
            {index !== team.length - 1 && (
              <div className="w-full h-1 mb-6 rounded-full bg-gradient-to-r from-blue-400 via-teal-400 to-yellow-400 opacity-60 shadow-sm"></div>
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </motion.main>
  );
}
