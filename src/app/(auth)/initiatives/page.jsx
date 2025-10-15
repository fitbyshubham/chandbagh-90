// src/app/page.js
import Head from 'next/head';

// Move data to a shared file in real apps
const initiatives = [
  {
    id: 1,
    title: "Palletes Of Promise",
    longDesc: "Palettes of Promise — The Doon School’s Artists in Residency programme brought together 11 acclaimed artists from across India for two inspiring weeks of creation, collaboration and cultural exchange. More than 25 artworks were produced, each reflecting the spirit of Doon, where education and creativity meet. This initiative is not just a celebration of art, it’s a movement to transform lives. Proceeds from the collection support The Doon School Scholarship Fund, enabling deserving boys from all backgrounds to experience a Doon education. Join us in shaping futures, one brushstroke at a time.",
    youtubeUrl: "https://www.youtube.com/watch?v=-fXOjQVpF7Q"
  },
  {
    id: 2,
    title: "DSMUN",
    longDesc: "18th Edition of The Doon School Model United Nations (DSMUN 2025) the largest edition in history with over 475 delegates and 55 faculty advisors from across India. This highlight video captures three unforgettable days of: 1) Powerful debates on global issues 2)  Intense crisis simulations from Nanjing to NATO 3)  Inspirational addresses by Ambassador Gurjit Singh and Mr Amitabh Kant 4) Celebrations with the Secretariat’s Dinner, Headmaster’s Dinner & Delegate Dance 5) Award-winning committees and delegates who showcased leadership, vision, and diplomacy From the Opening Ceremony to the Closing Ceremony, DSMUN 2025 reaffirmed why it is among South Asia’s most prestigious student-led high school Model UN conferences blending rigour, creativity, and community spirit. Best Delegation: Welham Boys’ School, Dehradun. Best Small Committee: Nanjing Crisis Committee Best Big Committee: Lok Sabha",
    youtubeUrl: "https://www.youtube.com/watch?v=9fL2O1lEX2Q"
  },
  {
    id: 3,
    title: "CHUCKS",
    longDesc: "Between 28th and 30th August 2025, The Doon School hosted four major intellectual events — the Doon School Quiz, JEDI, Kamla Jeevan Hindi Debates, and Chuckerbutty Memorial Debates — bringing together top schools from across India. Winners included Vasant Valley School, Neerja Modi School, and The Cathedral & John Connon School, Mumbai, with The Doon School earning strong finishes in multiple contests. The campus buzzed with spirited debate, sharp intellect, and a shared passion for truth and knowledge.",
    youtubeUrl: "https://www.youtube.com/watch?v=yHrysIUH4eQ"
  },
  {
    id: 4,
    title: "YEC",
    longDesc: "The 12th Young Entrepreneurs’ Conference united over 220 delegates from 20 schools across India, fostering innovation and collaboration through venture pitches, market analyses, and crisis simulations. Students showcased exceptional creativity and critical thinking, while Chief Guest Mr. Prithvi Raj Tejavath inspired them to embrace grit, resilience, and action in their entrepreneurial journeys.",
    youtubeUrl: "https://www.youtube.com/watch?v=NX1iNe1vexY"
  }
];

export default function InitiativesPage() {
  // Extract YouTube ID
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Head>
        <title> The Doon School at 90 | Organization Name</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <main className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl mt-[70px] font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400 tracking-tight">The Doon School At 90</h1>
          <div className="w-24 h-1 ml-37 mt-5 bg-white rounded-full"></div>
          <p className="text-slate-400 mt-3 text-lg max-w-2xl mx-auto">
            Discover flagship events and initiatives <br/> The Doon School has done in its 90th year.<br/>Under The Leadership Of Our Headmaster Dr. Jagpreet Singh
          </p>
        </div>
        
        {/* Initiatives Grid */}
        <div className="space-y-7">
          {initiatives.map((initiative) => {
            const videoId = getYouTubeId(initiative.youtubeUrl);
            
            return (
              <div 
                key={initiative.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-teal-100 transition-all duration-300 hover:shadow-xl"
              >
                {/* Title & Short Description */}
                <div className="p-5 border-b border-teal-100">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{initiative.title}</h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">{initiative.shortDesc}</p>
                </div>
                
                {/* Video Section */}
                <div className="p-5">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                      Watch Our Impact
                    </h3>
                    
                    {videoId ? (
                      <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-lg border-2 border-teal-100">
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                          title={initiative.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-52"
                        ></iframe>
                      </div>
                    ) : (
                      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl h-52 flex items-center justify-center">
                        <p className="text-gray-500">Video not available</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Long Description */}
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">More About This Initiative</h3>
                    <p className="text-gray-700 leading-relaxed">{initiative.longDesc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Footer */}
        <div className="text-center mt-12 text-teal-700">
          <p>Knowledge our Light!</p>
        </div>
      </main>
    </div>
  );
}