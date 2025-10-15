"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";

// Assuming CalenderCard and ScheduleCard are in the paths you provided
import CalenderCard from "../../../components/ui/CalenderCard.jsx";
import ScheduleCard from "../../../components/ui/ScheduleCard.jsx";
import schedule from "../../../data/schedule.json";

const timelineVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState("OCT 16");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  // Close calendar when switching to mobile view
  useEffect(() => {
    if (isMobile) {
      setIsCalendarOpen(false);
    }
  }, [isMobile]);

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setIsCalendarOpen(false); // Close mobile sheet on selection
  };

  // Get events for the selected day
  const events = schedule.schedule.filter(
  (event) => event.date === selectedDay
);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        {/* Premium Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-600/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <header className="text-center mb-12 md:mb-16 mt-[20px]">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent mt-[70px] bg-gradient-to-br from-white to-slate-400 tracking-tight">
              Event Schedule
            </h1>
            <p className="text-slate-400 mt-3 text-lg max-w-2xl mx-auto">
              Discover the detailed agenda for each day of our special event
            </p>
          </header>

          <div className="flex flex-col lg:flex-row lg:gap-12">
            <aside className="hidden lg:block w-full lg:w-1/3">
              <div className="sticky top-8 bg-gray-800/60 backdrop-blur-lg border border-gray-700 rounded-3xl shadow-2xl p-6">
                <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                  Select Date
                </h2>
                <CalenderCard selectedDay={selectedDay} onSelectDay={handleDaySelect} />
              </div>
            </aside>

            <main className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium text-slate-400">Timeline for:</span>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {selectedDay}
                  </span>
                </div>
                <button
                  onClick={toggleCalendar}
                  className="lg:hidden flex items-center gap-2 py-2 px-4 bg-slate-800 border border-slate-700 rounded-full font-semibold text-slate-300 transition-all hover:bg-slate-700 active:scale-95 shadow-lg"
                >
                  <Calendar size={16} />
                  Change Date
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedDay}
                  variants={timelineVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative pl-8 border-l-2 border-slate-700"
                >
                  {events.length > 0 ? (
                    events.map((event, index) => (
                      <motion.div key={index} variants={itemVariants} className="mb-10 relative">
                        {/* --- 2. Use ScheduleCard component here --- */}
                        <ScheduleCard
                          day={event.day}
                          date={event.date}
                          eventName={event.eventName}
                          desc={event.desc}
                          location={event.location}
                          startTime={event.startTime}
                          endTime={event.endTime}
                          coverImage={event.coverImage}
                          numberOfPeople={event.numberOfPeople}
                          avatars={event.avatars}
                        />
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-16"
                    >
                      <p className="text-slate-400 text-lg">No events scheduled for this day. ✨</p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isCalendarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCalendarOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
              aria-hidden="true"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="fixed bottom-0 left-0 right-0 p-4 pt-6 bg-slate-800 rounded-t-3xl shadow-2xl z-50 border-t border-slate-700 lg:hidden"
            >
              <div className="flex justify-between items-center mb-4 px-2">
                <h2 className="text-xl font-bold text-white">Select a Date</h2>
                <button onClick={() => setIsCalendarOpen(false)} className="text-slate-400 font-bold text-2xl">&times;</button>
              </div>
              <CalenderCard selectedDay={selectedDay} onSelectDay={handleDaySelect} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Global Animation Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </>
  );
}