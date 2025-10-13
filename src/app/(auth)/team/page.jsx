"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";

const team = [
  {
    name: "Harshal Gunwant",
    role: "HOD Computer Science",
    img: "/Portraits/hgt.jpg",
    desc: "I reviewed the project and provided constructive feedback and improvement suggestions throughout the development process.",
  },
  {
    name: "Shubham Sharma",
    role: "Mentor",
    img: "/Photos/shm.jpg",
    desc: "I guided the team with strategic vision and technical expertise throughout the development journey.",
  },
  {
    name: "Samarth Pundeer",
    img: "/Portraits/Pundeer.jpg",
    desc: "I focused on developing the Home, Schedule, and Orders pages, while simultaneously upgrading the UI of the About page.",
  },
  {
    name: "Hemant Khandelwal",
    img: "/Photos/hw.jpg",
    desc: "I focused on designing the app’s database structure and updating the backend whenever required.",
  },
  {
    name: "Aarav Anand",
    img: "/Photos/q4.jpg",
    desc: "I developed the Food Menu feature and resolved critical frontend issues.",
  },
  
  {
    name: "Vibhor Saraogi",
    img: "/Photos/vb.jpg",
    desc: "I developed the Quiz, Profile, and Landing page, and also managed and updated the UI of the Home and About pages."
  },
  {
    name: "Reyhan Singh",
    img: "/Photos/q3.jpg",
    desc: "I contributed to developing the app’s content and designed several posters for it.",
  },
  {
    name: "Shiven Goenka",
    img: "/Photos/q1.jpg",
    desc: "I created content for the app and also worked on designing its promotional posters.",
  },
  {
    name: "Daksh Veer Singh",
    img: "/Photos/q2.jpg",
    desc: "I was responsible for the app’s content creation and poster design.",
  },
  {
    name: "Nachiket Kediyal",
    img: "/Photos/q14.jpg",
    desc: "I helped enhance the app by writing content and making posters for it.",
  },
  {
    name: "Agastya Jitesh Shetty",
    img: "/Photos/sh.jpg",
    desc: "I worked on both the content development and the poster design for the app.",
  },
  {
    name: "Shubh Agarwal",
    img: "/Photos/q11.jpg",
    desc: "I handled the app’s content and created visually engaging posters to promote it.",
  },
  {
    name: "Zafir Ali Naqvi",
    img: "/Photos/nq.jpg",
    desc: "I developed the app’s written content and designed accompanying posters for better outreach.",
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
          We built this app specially for our 90th Founder's Day to make the experience seamless.
          The app lets visitors order food easily while skipping long queues. 
          It also provides detailed schedules for each day’s events and offers insights into our school’s rich history.
          Every feature was developed to reflect our school’s spirit of innovation, collaboration, and teamwork.
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
