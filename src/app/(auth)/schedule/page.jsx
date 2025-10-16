"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";
import scheduleData from "../../../data/schedule.json";
import useProtectedRoute from "../../../components/hook/useProtectedRoute";
// Mock components and data
const CalenderCard = ({ selectedDay, onSelectDay }) => {
  const days = ["OCT 16", "OCT 17", "OCT 18"];
  return (
    <div className="space-y-2">
      {days.map((day) => (
        <button
          key={day}
          onClick={() => onSelectDay(day)}
          className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
            selectedDay === day
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-50 text-gray-700 hover:bg-gray-100"
          }`}
        >
          <div className="font-semibold">{day}</div>
        </button>
      ))}
    </div>
  );
};

const ScheduleCard = ({ day, date, eventName, desc, location, startTime, endTime, coverImage, numberOfPeople, avatars }) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="absolute -left-8 top-6 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center border-4 border-white shadow-md">
        <div className="text-center">
          <div className="text-xs font-medium text-gray-500">{day}</div>
          <div className="text-sm font-bold text-gray-900">{date?.split(' ')[1]}</div>
        </div>
      </div>

      <div className="pl-12 pr-6 py-6">
        <div className="mb-3">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{eventName}</h3>
          <p className="text-sm text-gray-600">{desc}</p>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{startTime} - {endTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{location}</span>
          </div>
        </div>

        {coverImage && (
          <div className="relative h-48 rounded-xl overflow-hidden mb-4">
            <img
              src={coverImage}
              alt={eventName}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {numberOfPeople && (
          <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-sm text-gray-600">{numberOfPeople} attending</span>
          </div>
        )}
      </div>
    </div>
  );
};

import schedule from "../../../data/schedule.json";

const timelineVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
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

  useEffect(() => {
    if (isMobile) {
      setIsCalendarOpen(false);
    }
  }, [isMobile]);

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setIsCalendarOpen(false);
  };

  const events = scheduleData.schedule.filter(
    (event) => event.date === selectedDay
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 py-8">
        <div className="text-left mt-[80px] mb-8">
          <p className="text-gray-500 text-sm mb-1">Events & Activities</p>
          <h1 className="text-5xl font-light text-gray-900 tracking-tight mb-2">Schedule</h1>
          <p className="text-gray-600 text-sm">Discover the detailed agenda for each day</p>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-8 mb-8">
          <aside className="hidden lg:block w-full lg:w-64 mb-8 lg:mb-0">
            <div className="sticky top-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Select Date
              </h2>
              <CalenderCard selectedDay={selectedDay} onSelectDay={handleDaySelect} />
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-6 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <span className="text-sm text-gray-500 block">Timeline for</span>
                  <span className="text-lg font-semibold text-gray-900">{selectedDay}</span>
                </div>
              </div>
              <button
                onClick={() => setIsCalendarOpen(true)}
                className="lg:hidden flex items-center gap-2 py-2 px-4 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-all shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                Change Date
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDay}
                variants={timelineVariants}
                initial="hidden"
                animate="visible"
                className="relative pl-8 border-l-2 border-gray-200"
              >
                {events.length > 0 ? (
                  events.map((event, index) => (
                    <motion.div key={index} variants={itemVariants} className="mb-10 relative">
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
                    className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100"
                  >
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No events scheduled for this day</p>
                    <p className="text-gray-400 text-sm mt-2">Check back for updates</p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
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
              className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="fixed bottom-0 left-0 right-0 p-6 bg-white rounded-t-3xl shadow-2xl z-50 border-t border-gray-100 lg:hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Select a Date</h2>
                <button 
                  onClick={() => setIsCalendarOpen(false)} 
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <CalenderCard selectedDay={selectedDay} onSelectDay={handleDaySelect} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="h-20"></div>
    </div>
  );
}