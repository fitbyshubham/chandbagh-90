// src/components/layout/Navbar.jsx
"use client";
import { Home, Info, User, ClipboardClock, CookingPot } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const navItems = [
  { icon: <Home />, label: "Home", route: "/home" },
  { icon: <ClipboardClock />, label: "Schedule", route: "/schedule" },
  { icon: <Info />, label: "About", route: "/about" },
  { icon: <User />, label: "Profile", route: "/profile" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Move useEffect to the top level, before any conditional returns
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > 100) {
        setIsVisible(current < lastScrollY.current);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = current;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFoodClick = () => router.push("/order");
  const hideNavbarRoutes = ["/login", "/login/otp", "/Cart"];
  
  // Conditional return after all hooks have been called
  if (hideNavbarRoutes.includes(pathname)) return null;

  const leftNavItems = navItems.slice(0, 2);
  const rightNavItems = navItems.slice(2);

  return (
    <>
      {/* Floating Order Button — centered on entire screen */}
      <div
        className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button
          onClick={handleFoodClick}
          className="pulse bg-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg border-2 border-chandbagh-gold/30"
          aria-label="Order food"
        >
          <span className="bg-chandbagh-green rounded-full w-9 h-9 flex items-center justify-center">
            <CookingPot className="text-chandbagh-gold w-5 h-5" />
          </span>
        </button>
      </div>

      {/* Navbar */}
      <div
        className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[94vw] max-w-[360px] z-40 transition-all duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0 -bottom-6'
        }`}
      >
        <div
          className="rounded-[2rem] flex justify-between items-center px-5 py-3"
          style={{
            background: 'rgba(13, 92, 62, 0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          {leftNavItems.map((item) => (
            <button key={item.route} onClick={() => router.push(item.route)} className="flex flex-col items-center flex-1">
              <span className={pathname === item.route ? "text-chandbagh-gold" : "text-white/90"}>{item.icon}</span>
              <span className={`mt-1 text-[10px] font-semibold ${pathname === item.route ? "text-chandbagh-gold" : "text-white/90"}`}>
                {item.label}
              </span>
            </button>
          ))}

          <div className="w-12" /> {/* Spacer */}

          {rightNavItems.map((item) => (
            <button key={item.route} onClick={() => router.push(item.route)} className="flex flex-col items-center flex-1">
              <span className={pathname === item.route ? "text-chandbagh-gold" : "text-white/90"}>{item.icon}</span>
              <span className={`mt-1 text-[10px] font-semibold ${pathname === item.route ? "text-chandbagh-gold" : "text-white/90"}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}