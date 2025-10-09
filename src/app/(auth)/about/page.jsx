"use client";

import InfoCard from "../../../components/ui/InfoCard";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

const locations = [
  {
    image: "/Photos/MB.jpg",
    name: "Main Building",
    aspect: 1 / 2,
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
    aspect: 2 / 3,
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
    aspect: 1 / 1,
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
    aspect: 4 / 3,
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
    aspect: 1 / 1.2,
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
       The Doon School's Art and Media Centre stands as a hub of creativity in 2010 by 
       then-Union Minister Kapil Sibal during the school's platinum jubilee. 
       This architectural gem weaves contemporary innovation.The Art and media center is used for ceramics,sculpture,
        lino print.The lecture hall is used for debates, lectures and pitches of YEC and DSMUN


      </>
    ),
  },
  {
    image: "/Photos/CDH.jpeg",
    name: "Central Dining Hall",
    aspect: 1 / 1.2,
    description: (
      <>
        The CDH is at the center of life in Doon. It’s where the whole school community,
         students and teachers, comes together for every meal, making it feel like one big family. 
         CDH is where friendships deepen and jokes are exchanged. Here all Doscos and masters enjoy the delicious food and bond with 
         each other like family.

      </>
    ),
  },
  {
    image: "/Photos/pv.jpeg",
    name: "Pavilion",
    aspect: 1.7 / 2,
    description: (
      <>
 The Doon School Pavilion is a key structure near the Main Field, serving as a central venue for sports events.
  On the Pavillion there is a board with a calendar of all the scheduled Interhouse matches, helping students have a 
  schedule in their mind. It also has a room with sports equipment for students to practice with.

      </>
    ),
  },
  {
    image: "/Photos/MG.jpg",
    name: "Cafe Aquaduct",
    aspect: 1.4 / 1.6,
    description: (
      <>
        Cafe Aqueduct is a cozy retreat for Doon boys. Serving fresh sandwiches, coffees, and homemade treats,
         it buzzes with chatter during breaks. Inspired by the site's historic charm, it fosters relaxed conversations.
          A favorite for study sessions or quick bites, this spot blends with  modern vibes, nurturing community bonds 
          and a touch of indulgence in the school's timeless rhythm.


      </>
    ),
  },
  {
    image: "/Photos/",
    name: "Centers of Excellence",
    aspect: 1.5 / 1.9,
    description: (
      <>
        The Centre of Excellence is dedicated to fostering holistic development and excellence in various domains. 
        The institution has established several Centres of Excellence to provide specialized support and enrichment to students.
         These include centres of debating ,art ,drama,creative writing and technology.
         Their main purpose is to primarily focus on improving students greatly in these fundamental activities which are really important.
          Interested students would learn these valuable skills and be multilingual in various fields. 


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
        Silently hidden behind Tata house is a tree which contains many old stories to narrate.
        This old tree is not just simply a tree but is a symbol of legacy and experience. 
        The tree is not just a part of the school—it is the school’s memory made living.
         It has endured countless storms and even today it stands proudly.


      </>
    ),
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Oberoi_House_at_The_Doon_School.jpg/640px-Oberoi_House_at_The_Doon_School.jpg",
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
       The Time Capsule is like a treasure chest buried for the future! In 2010, when the school turned 75 years old,
        students, teachers, and old boys filled a box with things that showed what life at Doon was like back then. 
        The time capsule shows how much Doon cares about its history, its people, legacy, and the memories they make together.


      </>
    ),
  },
  {
    image: "/Photos/wc.jpg",
    name: "Wellness Center",
    aspect: 1.5 / 1.9,
    description: (
      <>
        The Wellness Centre at The Doon School is a sanctuary for health in our serene campus. 
        Offering medical care, and fitness programs, it nurtures boys’ physical and mental well-being. 
        It fosters resilience and balance. With expert staff, it ensures students recover, blending modern facilities with care. 

      </>
    ),
  },
];

export default function InfoPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  return (
    <div className="w-full px-4 sm:px-4 max-w-3xl mx-auto bg-white rounded-3xl pb-10">
      {/* Quiz Button */}
      <div className="flex justify-end mt-6 mb-4">
        <button
          onClick={() => router.push("/quiz")}
          className="bg-purple-600 text-white font-bold px-4 py-2 rounded-xl shadow hover:bg-purple-700 transition"
        >
          🎯 Take a Quiz
        </button>
      </div>

      <div className="text-3xl font-bold mb-3 mt-6">Explore the School</div>

      <div className="relative mb-4">
        <input
          className="w-full rounded-xl border border-gray-200 px-3 py-2 pr-10 outline-none bg-gray-50"
          placeholder="Search any place..."
        />
        <button className="absolute top-1/2 right-4 -translate-y-1/2 bg-yellow-400 p-2 rounded-xl">
          <svg width={16} height={16} fill="none" viewBox="0 0 24 24">
            <circle cx={11} cy={11} r={7} stroke="#222" strokeWidth={2} />
            <path stroke="#222" strokeWidth={2} strokeLinecap="round" d="M20 20L16.65 16.65" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {selectedImage ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex flex-col bg-white rounded-t-2xl shadow-xl overflow-y-auto"
          >
            <div className="flex-1">
              <img
                src={selectedImage.image}
                alt={selectedImage.name}
                className="h-70 w-full object-cover"
              />
            </div>
            <div className="p-6 mb-20">
              <h1 className="text-3xl font-bold mb-3">{selectedImage.name}</h1>
              <p className="mb-6 text-gray-700">{selectedImage.description}</p>
              <button
                onClick={() => setSelectedImage(null)}
                className="mt-2 px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
              >
                ← Back
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-white"
          >
            <div className="columns-2 gap-3">
              {locations.map((loc) => (
                <div
                  key={loc.name}
                  style={{ aspectRatio: loc.aspect }}
                  className="mb-3 break-inside-avoid overflow-hidden shadow-md bg-white cursor-pointer"
                  onClick={() => setSelectedImage(loc)}
                >
                  <InfoCard image={loc.image} name={loc.name} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
