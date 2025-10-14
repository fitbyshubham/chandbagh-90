"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";

// Assuming CalenderCard and ScheduleCard are in the paths you provided
import CalenderCard from "../../../components/ui/CalenderCard.jsx";
import ScheduleCard from "../../../components/ui/ScheduleCard.jsx";

// --- 1. Use the event data from the second code block ---
const eventsData = {
  "OCT 16": [
    {
      day: "THU",
      date: "16",
      eventName: "Breakfast",
      desc: "Students have breakfast in school before the start of the day",
      location: "CDH",
      startTime: "09:00",
      endTime: "09:25",
      coverImage: "https://static.toiimg.com/photo/60132641.cms?imgsize=312455",
      numberOfPeople: 130,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "THU",
      date: "16",
      eventName: "Exhibitions",
      desc: "Exhibitions by all the Departements of School",
      location: "Various Locations",
      startTime: "10:30",
      endTime: "13:30",
      coverImage: "/Schedule/founder-science-exhibition.jpg",
      numberOfPeople: 135,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "THU",
      date: "16",
      eventName: "Lunch",
      desc: "Lunch for all Students, Parents, Old Boys and Guests",
      location: "CDH",
      startTime: "13:00",
      endTime: "14:00",
      coverImage: "  https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmpImaE8oO6M4LGlyfAr0AEOiNjJpjEMxcFQ&s",
      numberOfPeople: 114,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "THU",
      date: "16",
      eventName: "Interhouse Athletics",
      desc: "Finals of the Interhouse Athletics Competition, 2025",
      location: "Main Field",
      startTime: "15:00",
      endTime: "17:00",
      coverImage: "/Schedule/iha.png",
      numberOfPeople: 106,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "THU",
      date: "16",
      eventName: "Walk for the Batch of 1955",
      desc: "Walk for the Batch of 1955 (30m walk) & 90m Run for Fun (1 of 2 Races) by age categories (2 Old Boys, Masters and Parents)",
      location: "Main Field",
      startTime: "TBC",
      endTime: "TBC",
      coverImage: "  https://www.doonschool.com/wp-content/uploads/2023/05/3-1-1024x1024.jpg  ",
      numberOfPeople: 127,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "THU",
      date: "16",
      eventName: "At Home",
      desc: "At Home Tea for the parents with Housemasters, Tutors and Dames",
      location: "Respective House of the Ward",
      startTime: "17:00",
      endTime: "18:00",
      coverImage: "https://www.doonschool.com/wp-content/uploads/2023/10/29-1024x1024.jpg  ",
      numberOfPeople: 124,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "THU",
      date: "16",
      eventName: "Music recital",
      desc: "Music performance for D, C, B and A Forms and invited schools and guests",
      location: "Rose Bowl",
      startTime: "18:30",
      endTime: "19:10",
      coverImage: "https://www.doonschool.com/wp-content/uploads/2019/01/BF1A0255-min-1024x683.jpg  ",
      numberOfPeople: 139,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "THU",
      date: "16",
      eventName: "Departure",
      desc: "Parents, Old Boys and Guests depart",
      location: "Main Gate",
      startTime: "19:50",
      endTime: "18:00",
      coverImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Main_Gate%2C_The_Doon_School.jpg/960px-Main_Gate%2C_The_Doon_School.jpg  ",
      numberOfPeople: 142,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "THU",
      date: "16",
      eventName: "Dinner",
      desc: "Dinner for the Entire School",
      location: "CDH",
      startTime: "20:00",
      endTime: "20:25",
      coverImage: "https://www.doonschool.com/wp-content/uploads/2023/01/dddddddddd.jpg  ",
      numberOfPeople: 146,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
  ],
  "OCT 17": [
    {
      day: "FRI",
      date: "17",
      eventName: "Parents and Old Boys Enter",
      desc: "Parents and Old Boys are allowed to enter the school",
      location: "Main Gate",
      startTime: "09:30",
      endTime: "20:20",
      coverImage: "https://www.doonschool.com/wp-content/uploads/2018/05/about-doon-2.jpg  ",
      numberOfPeople: 148,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "FRI",
      date: "17",
      eventName: "R.L. Holdsworth",
      desc: "R.L Holdsworth Cricket Match (20 Overs) betweem the Old Boys and the School Team",
      location: "Main Field",
      startTime: "10:30",
      endTime: "14:00",
      coverImage: "/Schedule/rlhf.png",
      numberOfPeople: 134,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "FRI",
      date: "17",
      eventName: "Old Boys Sports",
      desc: "Old Boys play sports like Hockey, Basketball, Soccer/Futsal, Tennis, Padel, Sqaush and Swimming",
      location: "Main Field, Basketball, Squash and Tennis Courts, Swimming Pool",
      startTime: "TBC",
      endTime: "TBC",
      coverImage: "https://www.doonschool.com/wp-content/uploads/2015/04/hockey-apr15.jpg  ",
      numberOfPeople: 143,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "FRI",
      date: "17",
      eventName: "DSOBS Interaction",
      desc: "Members from DSOBS interact with Parents B, A and S Froms",
      location: "Kilachand Library",
      startTime: "11:00",
      endTime: "12:30",
      coverImage: "/Schedule/DSOBS.png",
      numberOfPeople: 123,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "FRI",
      date: "17",
      eventName: "Lunch",
      desc: "Lunch & Refreshments at the Food stalls for Students, Staff, Parents and Old Boys",
      location: "Stalls outside CDH and Old Basketball Courts",
      startTime: "11:00",
      endTime: "18:00",
      coverImage: "https://londonbitestours.com/wp-content/uploads/2024/05/IMG_2157.jpg",
      numberOfPeople: 132,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "FRI",
      date: "17",
      eventName: "Hindi Street Play",
      desc: "Students perform a Street Play in Hindi",
      location: "Near CDH/Pavillion",
      startTime: "12:00 & 1:00",
      endTime: "12:15 & 13:15",
      coverImage: "https://www.doonschool.com/wp-content/uploads/2023/10/14-1024x1024.jpg  ",
      numberOfPeople: 169,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "FRI",
      date: "17",
      eventName: "Prize Giving",
      desc: "Distribution of the Holdworth's Cricket Trophy",
      location: "Main Field",
      startTime: "14:30",
      endTime: "14:45",
      coverImage: "/Schedule/rp.png",
      numberOfPeople: 152,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "FRI",
      date: "17",
      eventName: "Tug of War",
      desc: "Tug of War between Old Boys & Parents, Masters & Parents, Finale",
      location: "Main Field",
      startTime: "15:15",
      endTime: "15:30",
      coverImage: "https://thinkingpathwayz.weebly.com/uploads/1/0/4/4/104440805/tug-of-war-kidspot_orig.jpg  ",
      numberOfPeople: 158,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "FRI",
      date: "17",
      eventName: "Band",
      desc: "Western Band Performance",
      location: "Near Auditorium Steps/CDH",
      startTime: "15:30",
      endTime: "16:30",
      coverImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEBIQDxIVFRUVFRUVFRYVFRUVFhYXGBUXFhUVFxUYHSggGBolGxUXITEhJSkrLi4uFx8zODUtNygtLisBCgoKDg0OGxAQGy0lHyUvLTYyLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALIBGgMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAABAMGAgUHAQj/xABCEAACAQIDBQYDBQYFAgcAAAABAgADEQQSIQUGMUFRBxNhcYGRIjKhFCNSscFCYnKCotEzQ5Lw8VPhFSRzo7Kzwv/EABsBAAIDAQEBAAAAAAAAAAAAAAACAQMEBQYH/8QAKxEAAgICAQMDAwMFAAAAAAAAAAECEQMSIQQxQRNRYRQi8AUycSO HobJbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbHbH......",
      numberOfPeople: 158,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "FRI",
      date: "17",
      eventName: "Sand Art",
      desc: "Sand Art",
      location: "BML Munjal Auditorium",
      startTime: "16:15",
      endTime: "16:45",
      coverImage: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/71/d9/9a/beach-sand-sculptures.jpg?w=1200&h=1200&s=1",
      numberOfPeople: 166,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "FRI",
      date: "17",
      eventName: "Chandbagh Debates",
      desc: "Debate between School Team and Old Boys",
      location: "BML Munjal Auditorium",
      startTime: "17:00",
      endTime: "18:30",
      coverImage: " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlDpAMYqYQHVy_z1_7H3ofRJ1LUH4hptT22A&s",
      numberOfPeople: 163,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "FRI",
      date: "17",
      eventName: "Musical Pagent",
      desc: "A trilingual-English, Hindi and Dosco Lingo-pagen showing the life of a student before, during and after school",
      location: "Rose Bowl",
      startTime: "18:45",
      endTime: "20:15",
      coverImage: " https://i0.wp.com/ishootshows.com/wp-content/uploads/2013/07/Screen-Shot-2013-07-07-at-5.21.40-PM.jpg?fit=435%2C405&ssl=1",
      numberOfPeople: 120,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "FRI",
      date: "17",
      eventName: "Departure",
      desc: "Parents and Old Boys depart",
      location: "Main Gate",
      startTime: "20:20",
      endTime: "20:30",
      coverImage: " https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Main_Gate%2C_The_Doon_School.jpg/960px-Main_Gate%2C_The_Doon_School.jpg  ",
      numberOfPeople: 145,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "FRI",
      date: "17",
      eventName: "Dinner",
      desc: "Dinner for the school",
      location: "CDH",
      startTime: "20:30",
      endTime: "20:55",
      coverImage: "https://www.doonschool.com/wp-content/uploads/2023/01/dddddddddd.jpg",
      numberOfPeople: 135,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
  ],
  "OCT 18": [
    {
      day: "SAT",
      date: "18",
      eventName: "Parents and Old Boys Enter",
      desc: "Parents and Old Boys enter the school",
      location: "Main Gate",
      startTime: "09:30",
      endTime: "16:30",
      coverImage: "https://www.doonschool.com/wp-content/uploads/2018/05/about-doon-2.jpg  ",
      numberOfPeople: 168,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "SAT",
      date: "18",
      eventName: "Jaipur House Pagal Gymkhana",
      desc: "Fun activities and competitions organized by Jaipur House",
      location: "Skinners",
      startTime: "10:30",
      endTime: "15:00",
      coverImage: "https://www.doonschool.com/wp-content/uploads/2024/04/JH_TH_logo_png4.png  ",
      numberOfPeople: 144,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "SAT",
      date: "18",
      eventName: "Lunch for All",
      desc: "Lunch for all at Jaipur House Pagal Gymkhana",
      location: "Skinners",
      startTime: "13:00",
      endTime: "14:00",
      coverImage: "https://static.toiimg.com/photo/47782089.cms  ",
      numberOfPeople: 178,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "SAT",
      date: "18",
      eventName: "Chief Guest Interaction",
      desc: "Chief Guest interacts with senior students and faculty",
      location: "Art & Media Centre",
      startTime: "15:00",
      endTime: "15:45",
      coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJCVzfhveaxVORgRYyktxJlQ9AODeqtnf4Og&s",
      numberOfPeople: 145,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "SAT",
      date: "18",
      eventName: "Founder’s Day Programme",
      desc: "Founder’s Day main function and programme",
      location: "Rose Bowl",
      startTime: "18:00",
      endTime: "20:00",
      coverImage: "  https://www.doonschool.com/wp-content/uploads/2016/10/founders_speeches.jpg  ",
      numberOfPeople: 156,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "SAT",
      date: "18",
      eventName: "Founders Music Production",
      desc: "Music Performance as part of Founder’s Day celebrations",
      location: "Rose Bowl",
      startTime: "20:20",
      endTime: "21:00",
      coverImage: "https://www.doonschool.com/wp-content/uploads/2024/10/464193763_539644192148610_4505489439754893471_n-1024x1024.jpg  ",
      numberOfPeople: 156,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
    {
      day: "SAT",
      date: "18",
      eventName: "Students Departure",
      desc: "Students leave with parents after Housemaster’s permission",
      location: "Campus",
      startTime: "21:15",
      endTime: "21:30",
      coverImage: " https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Main_Gate%2C_The_Doon_School.jpg/960px-Main_Gate%2C_The_Doon_School.jpg  ",
      numberOfPeople: 134,
      avatars: ["./Avatars/m1.jpg", "./Avatars/m2.jpg", "./Avatars/m3.jpg"],
    },
  ],
};

// --- Animation Variants for Framer Motion ---
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
  const events = eventsData[selectedDay] || [];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden mt-10">
        {/* Premium Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-600/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <header className="text-center mb-12 md:mb-16 mt-[80px]">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400 tracking-tight">
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