// src/components/ResponsiveWrapper.jsx
'use client';

import { useState, useEffect } from 'react';

export default function ResponsiveWrapper({ children }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIfDesktop = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isWideScreen = window.innerWidth > 768;
      setIsDesktop(isWideScreen && !isMobileDevice);
    };

    checkIfDesktop();
    window.addEventListener('resize', checkIfDesktop);
    return () => window.removeEventListener('resize', checkIfDesktop);
  }, []);

  if (isDesktop) {
    return (
      <div className="desktop-wrapper flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="phone-frame w-[375px] h-[812px] rounded-[40px] overflow-hidden shadow-2xl border-8 border-black relative">
          <div className="notch absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-6 bg-black rounded-b-2xl z-10"></div>
          <div className="app-content h-full bg-white overflow-auto">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return <div className="mobile-app h-screen w-screen overflow-auto">{children}</div>;
}