// src/app/info/page.jsx 
"use client";

import InfoCard from "../../../components/ui/InfoCard";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

const locations = [
  {
    image: "/Photos/MB.jpg",
    name: "Main Building",
    aspect: 1 / 2, // Portrait for this item
    description: (
      <>
        The main building of The Doon School stands as a majestic symbol of
        tradition, heritage, and knowledge. It is not just as an architectural
        landmark, but as the heart of our school. Its red-brick walls, arches,
        and long corridors remind us of the legacy generations before us that we
        are part of. Walking through its halls, I feel a deep sense of belonging
        and admiration for the wisdom shared here. It is where every Dosco
        learns discipline, responsibility, and excellence, and where the bond
        between teachers and students grows stronger. It represents the enduring
        spirit of Doon, inspiring us to uphold the school’s timeless legacy.
      </>
    ),
  },
  {
    image: "/Photos/FH.jpg",
    name: "Foot House",
    aspect: 2 / 3, // Slightly less portrait
    description: (
      <>
        Foot House isn't a permanent house like Jaipur, Kashmir, Oberoi, Tata,
        or Hyderabad. It's a holding house, where every new boy starts his
        journey at Doon before moving into his main house. Named after Arthur E.
        Foot, the school’s first Headmaster (1935–48), Foot House is where we
        all learn the ropes of Dosco life — from folding our bedsheets to
        finding our way around campus. The faculty and staff here are legends in
        their own right. Our Housemaster, Ms. Ruchi Sahni, makes sure everyone
        settles in smoothly, while Mr. Keshav Bhatt, the Assistant Housemaster,
        guides us through daily routines. And of course, our Dame, Ms. Kanchan
        Shukla, keeps the house running like clockwork — she somehow knows
        everything, from who forgot their shoes to who’s sneaking an extra
        snack!
        <br />
        <strong>Fun Fact:</strong> Foot House is built on land that was once
        part of the <strong>Imperial Forest Research Institute (IFRI)</strong>,
        established in 1906. Before Doon School took over the Chandbagh estate
        in 1935, IFRI operated from this very site, making our dorms and common
        rooms part of a rich history in forestry research.
      </>
    ),
  },
  {
    image: "/Photos/MH.jpg",
    name: "Martyn House",
    aspect: 1 / 1, // Square
    description: (
      <>
        Martyn House at The Doon School, named after the school’s second
        Headmaster John A.K. Martyn is the holding house for 40 D-Form boys
        (seventh grade). It marks the start of their boarding journey, helping
        them settle into school routines, form friendships, and adjust to life
        away from home. The house is led by{" "}
        <strong>Mr. Samik Das (Housemaster)</strong>, supported by{" "}
        <strong>Mr. Rajat Sabharwal (Assistant Housemaster)</strong>,{" "}
        <strong>Ms. Gurjeet Kaur Dhaliwal (Dame)</strong>, and a team of tutors
        who ensure the boys’ well-being and growth. Martyn House is thus the
        gateway to the Doon experience, offering care, structure, and a strong
        sense of community.
      </>
    ),
  },
  {
    image: "/Photos/HH.jpg",
    name: "Hyderabad House",
    aspect: 4 / 3, // Landscape
    description: (
      <>
        Hyderabad House is the oldest house at The Doon School, holding the
        distinction of being the first House, established with Mr. JAK Martyn as
        its pioneering Housemaster. This "House of Nizams" has a rich legacy of
        achievements in sports, the arts and education, including producing one
        of the school's headmasters. Personal development is a big part of the
        house system: leadership, teamwork, values of humility and service, not
        just competition.
        <br />
        <strong>House Master:</strong> Mr. Sudhir Thapa (SRT)
        <br />
        <strong>Assistant House Master:</strong> Mr. Harshal Gunwant (HGT)
        <br />
        <strong>Dame:</strong> Meenakshi Tripathi
      </>
    ),
  },
  {
    image: "/Photos/KH.jpg",
    name: "Kashmir House",
    aspect: 1 / 1.2, // Tall Portrait
    description: (
      <>
        Kashmir House, established in 1937 as Gibson House, is one of the oldest
        and most distinguished houses at The Doon School. In 1938, the house was
        renamed Kashmir House following a generous donation from Maharaja Hari
        Singh of Kashmir for its construction. Situated next to Hyderabad House
        along one flank of the Main Field, it boasts a rich history and a legacy
        of producing some of the most accomplished Doscos.
        <br />
        <strong>Housemaster:</strong> Mr. Manish Kant Pant (M.Sc., B.Ed.)
        <br />
        <strong>Assistant Housemaster:</strong> Mr. Satya Shrava Sharma
        <br />
        <strong>Dame:</strong> Ms. Ria Chakraborty
        <br />
        Kashmir House is renowned for its discipline, camaraderie, and a strong
        sense of tradition. The house's emblem, the chinar leaf, symbolizes
        resilience and the rich cultural heritage of Kashmir. Known as the
        "House of Gentlemen," it has consistently upheld high standards in
        academics, sports, and co-curricular activities.
        <br />
        <strong>Fun Fact:</strong> In 2003, the two separate entities, Kashmir-A
        and Kashmir-B, were unified to form a single cohesive unit,
        strengthening the house's community spirit.
      </>
    ),
  },
  {
    image: "/Photos/jh.jpg",
    name: "Jaipur House",
    aspect: 1.7 / 2,
    description: (
      <>
        Established in 1936 as Thomas House, Jaipur House is one of the oldest
        and most distinguished houses at The Doon School. In 1937, the house
        moved into its current building, and 49 boys were inducted under the
        leadership of the first Housemaster, Mr. C.L. Howell-Thomas. The house
        was later renamed Jaipur House, reflecting its deep connection with the
        royal family of Jaipur, who were significant patrons of the school The
        Doon School.
        <br />
        The house is renowned for its strong traditions and has produced many
        notable alumni. The first Housemaster was Mr. C.L. Howell-Thomas. The
        house is named after the Maharaja of Jaipur, who made a significant
        donation to the school, symbolizing the strong ties between the house
        and the royal family.
        <br />
        Housemaster: Mr. Pratyush Vaishnava
        <br />
        Assistant Housemaster: Mr. Parvinder Kumar
        <br />
        Dame: Ms. Durgesh Kumari
        <br />
        Jaipur House is known for its rich traditions, strong academic
        performance, and active participation in various school activities. The
        house's emblem, featuring an eagle, symbolizes strength, vision, and
        leadership.
        <br />
        Fun Fact: The house is named after the Maharaja of Jaipur, who made a
        significant donation to the school, symbolizing the strong ties between
        the house and the royal family.
      </>
    ),
  },
  {
    image: "/Photos/TH.jpg",
    name: "Tata House",
    aspect: 1.4 / 1.6,
    description: (
      <>
        Tata House is one of the oldest and most respected houses at Doon. Its
        motto, “True as Steel,” reflects its spirit. Living here feels like
        being part of a close-knit family where everyone supports one another
        while also pushing you to do your best. The house has a strong
        reputation for discipline, hard work, and loyalty. Seniors guide juniors
        patiently. Life in Tata combines study, sport, and fun. In the mornings,
        the house buzzes with energy as everyone prepares for classes. In the
        evenings, the common room fills with laughter, debates, and stories.
        Tata boys are competitive in sports, debates, and cultural events, but
        they also celebrate each other’s successes. The house has its
        traditions, including special dinners, house songs, and late-night
        discussions, which foster a sense of belonging. Living here teaches
        responsibility, teamwork, and lifelong friendships, making Tata not just
        a house but a home for all.
        <br />
        <strong>House Master:</strong> Mr. Ashish Dean (ADN)
        <br />
        <strong>Assistant House Master:</strong> Ms. Mughda Pandey (MPY)
        <br />
        <strong>Dame:</strong> Ruthann Rozario
      </>
    ),
  },
  {
    image: "/Photos/OH.jpg",
    name: "Oberoi House",
    aspect: 1.5 / 1.9,
    description: (
      <>
        Oberoi House is the newest among the senior houses. It was established
        in 1991, joining the original four houses of the school. Its creation
        initially met with some resistance (mainly concerns about rebalancing
        inter-house games and competitions), but over time Oberoi has become
        deeply integrated into the school’s culture.
        <br />
        By 2015, Oberoi House celebrated its 25th anniversary / Silver Jubilee —
        a milestone that highlighted its increasing heritage and contribution.
        House.
        <br />
        <strong>House Master:</strong> Mr. Vishal Mohla (VSM)
        <br />
        <strong>Assistant House Master:</strong> Dr. Ankur Joshi (ARJ)
        <br />
        <strong>Dame:</strong> Ms. Sarabjeet Kaur
      </>
    ),
  },
  {
    image: "/Photos/library.jpg",
    name: "Library",
    aspect: 1.7 / 1,
    description: (
      <>
        The Kilachand Library, with over{" "}
        <strong>30,000 books and digital resources</strong>, is The Doon
        School’s intellectual hub. It offers ample space for reading, research,
        and IT access .It blends tradition, technology and also houses the
        Founders’ Room and Archives, preserving the school’s rich history.
      </>
    ),
  },
    {
    image: "/Photos/MF.jpg",
    name: "Main Field",
    aspect: 3/ 3,
    description: (
      <>
        The Main Field at The Doon School is a sprawling green heart of the campus, alive with energy. 
        Boys compete in sports, building teamwork and resilience under Himalayan skies.
         Surrounded by lush flora, it’s where rivalries spark and friendships deepen.
        This iconic field, steeped in tradition, fosters physical prowess and school spirit,
         shaping disciplined leaders through sweat and camaraderie.
      </>
    ),
  },
  {
    image: "/Photos/MS.jpg",
    name: "Music School",
    aspect: 1 / 2,
    description: (
      <>
        The Music School at The Doon School is a hub for musical education and performance,
         offering students a curriculum that spans both Hindustani classical and Western classical traditions.
          The department is committed to nurturing talent through structured courses, the various talents Doscos showcase.
           It is located near Martyn house where all young musicians go and play their best instrument.
      </>
    ),
  },
  {
    image: "/Photos/rb.jpeg",
    name: "Rose Bowl",
    aspect: 1 / 1,
    description: (
      <>
        The Rose Bowl, The Doon School’s open-air amphitheatre, is a cultural heart of Doon. Nestled amid flora,
         it hosts plays, music, and assemblies. Boys perform with passion, building confidence.
        Its steps and natural acoustics amplify school spirit as students create memories that echo beyond campus,
         shaping expressive leaders in a breathtaking setting. It is a beautiful structure surrounded by nature.
      </>
    ),
  },
  {
    image: "/Photos/AMC.jpeg",
    name: "Art and Media Center",
    aspect: 4 / 3,
    description: (
      <>
        The Art and Media Center (AMC) is the creative hub of the school, 
        offering facilities for visual arts, photography, film-making, and digital media.
         It encourages students to express themselves through various artistic mediums, 
         fostering creativity and critical thinking.
      </>
    ),
  },
  {
    image: "/Photos/CDH.jpeg",
    name: "Central Dining Hall",
    aspect: 1 / 1.2,
    description: (
      <>
        The Central Dining Hall (CDH) is where the entire school community—boys and masters—gathers for meals. 
        It is a large, stately hall that serves as a central point for daily social interaction, 
        reinforcing the communal aspect of boarding school life.
      </>
    ),
  },
  {
    image: "/Photos/pv.jpeg",
    name: "Pavilion",
    aspect: 1.7 / 2,
    description: (
      <>
        The Pavilion overlooks the Main Field, serving as the central viewing and gathering spot for all major sporting events. 
        It is a historic structure that houses changing rooms and offers a prestigious vantage point for sports dignitaries and guests.
      </>
    ),
  },
  {
    image: "/Photos/MG.jpg",
    name: "Cafe Aquaduct",
    aspect: 1.4 / 1.6,
    description: (
      <>
        The Cafe Aquaduct is a modern addition to the campus, offering a casual and relaxed space for students 
        to socialize and enjoy snacks and light meals outside of the main dining schedule.
      </>
    ),
  },
  {
    image: "/Photos/COE.jpg", // Assuming an image for Centers of Excellence
    name: "Centers of Excellence",
    aspect: 1.5 / 1.9,
    description: (
      <>
        The Centers of Excellence are dedicated hubs for advanced learning and extracurricular passion, 
        including Robotics, Astronomy, and Entrepreneurship. They provide resources and mentorship 
        for students to pursue deep dives into specialized, forward-looking fields.
      </>
    ),
  },
    {
    image: "/Photos/gl.jpeg",
    name: "Guru's Lawns",
    aspect: 4 / 3,
    description: (
      <>
       The name “Guru’s Lawn” is a tribute to a teacher that has been nicknamed “Guru”. 
       Guru has contributed to the school by encouraging students to get involved in mountaineering and trekking.
        These activities are a core of The Doon School. Every walk to the Main Building is a reminder 
        of the contributions to the School made by Guru.

      </>
    ),
  },
  {
    image: "/Photos/Rt.jpg",
    name: "Oldest Tree of Doon",
    aspect: 1.5 / 1.9,
    description: (
      <>
        This ancient tree, a towering landmark on the campus, is a symbol of the school's enduring legacy and connection to nature. 
        It provides a quiet, shaded retreat and is a traditional meeting spot for Doscos.
      </>
    ),
  },
  {
    image: "/Photos/SK.jpg", // Assuming a placeholder image path
    name: "Skinners",
    aspect: 1.7 / 1,
    description: (
      <>
       The Skinners, an iconic sports field at The Doon School contains legacy in Doon’s lush landscape. 
       The term "Skinners" is short for Skinner's Field, in between Jaipur and Oberoi House. 
       It hosts competitive sports matches, fostering teamwork. Skinners Field is named as it is because it was once 
       the property of the descendants of James Skinner.
      </>
    ),
  },
    {
    image: "/Photos/TC.jpg",
    name: "Time Capsule",
    aspect: 1.4 / 1.6,
    description: (
      <>
        The Time Capsule is a monument marking the school's commitment to its past and future. 
        It contains artifacts and messages to be opened by a future generation of Doscos, 
        connecting the present students to the school's long history.
      </>
    ),
  },
  {
    image: "/Photos/wc.jpg",
    name: "Wellness Center",
    aspect: 1.5 / 1.9,
    description: (
      <>
        The Wellness Center is dedicated to the physical and mental health of the students. 
        It houses medical facilities, counseling services, and resources focused on overall student well-being, 
        ensuring a supportive environment for every boy.
      </>
    ),
  },
];

export default function InfoPage() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const router = useRouter();

  return (
    // Outer container for dark theme and bottom padding (for fixed Navbar)
    <div className="w-full min-h-screen text-white bg-gray-900 pb-32">
      <div className="px-4 max-w-[420px] mx-auto"> 

        {/* Header Section */}
        <div className="flex justify-between items-center mb-6 pt-4">
            <div className="text-3xl font-extrabold text-white">Chandbagh Landmarks</div>
            
            {/* Quiz Button */}
            <button
                onClick={() => router.push("/quiz")}
                className="bg-[#cc2366] text-white font-semibold text-sm px-4 py-2 rounded-full shadow-lg hover:bg-[#dc2743] transition focus:outline-none focus:ring-2 focus:ring-[#f09433] flex items-center space-x-1"
            >
                <span className="text-xl">🎯</span> <span>Take a Quiz</span>
            </button>
        </div>

        {/* --- MODERN STAGGERED LAYOUT --- */}
        <AnimatePresence mode="wait">
          {!selectedLocation && (
            <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                // Tailwind utility to create a staggered list/Pinterest style columns
                className="columns-2 gap-4"
            >
                {locations.map((loc) => (
                    // The break-inside-avoid ensures items don't break across columns
                    <div
                        key={loc.name}
                        // Use aspectRatio for variable heights based on the data
                        style={{ aspectRatio: loc.aspect || '1/1' }} 
                        className="mb-4 break-inside-avoid overflow-hidden rounded-xl shadow-xl bg-gray-800 border border-gray-700 cursor-pointer transition transform hover:scale-[1.03]"
                        onClick={() => setSelectedLocation(loc)}
                    >
                        {/* InfoCard component goes here */}
                        <InfoCard image={loc.image} name={loc.name} />
                    </div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
      
      {/* --- Detail View (Bottom-Up Sliding Sheet Modal) --- */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            key="detail"
            // Slide up animation with Framer Motion spring
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            // Full-screen fixed container with black background
            className="fixed inset-0 z-50 flex flex-col bg-black overflow-y-auto"
          >
            {/* Image Section */}
            <div className="relative h-72 w-full">
              <img
                src={selectedLocation.image}
                alt={selectedLocation.name}
                className="w-full h-full object-cover"
              />
              {/* Back Button on top of the image */}
              <button
                onClick={() => setSelectedLocation(null)}
                className="absolute top-6 left-6 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white backdrop-blur-sm z-10 hover:bg-black/70 transition"
                aria-label="Back"
              >
                <svg width={24} height={24} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            
            {/* Content Section */}
            <div className="p-6">
              <h1 className="text-4xl font-bold mb-4 text-white">{selectedLocation.name}</h1>
              {/* Soft text color for readability against black background */}
              <div className="mb-4 text-gray-300 space-y-4 leading-relaxed">
                  {selectedLocation.description}
              </div>
            </div>

            {/* Empty space for scrolling content above fixed navigation */}
            <div className="h-32 shrink-0" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}