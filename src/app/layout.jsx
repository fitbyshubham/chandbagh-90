"use client";

import { useState } from "react";
import "./globals.css";
import ResponsiveWrapper from "@/components/ui/ResponsiveWrapper";
import Navbar from "@/components/layout/Navbar";
import Header from "@/components/layout/Header"; // 👈 Import the Header
import StoryModal from "@/components/layout/StoryModal"; // 👈 Import the StoryModal

const pageMetadata = {
  title: "Chandbagh 90 – Celebration Companion",
  description:
    "Official digital companion for Chandbagh School’s 90th Anniversary.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({ children }) {
  // State for the Story Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStory, setCurrentStory] = useState("");

  const handleAvatarClick = (imageSrc) => {
    setCurrentStory(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStory("");
  };

  return (
    <html lang="en">
      <body className="bg-black text-white">
        <ResponsiveWrapper>
          <Header onAvatarClick={handleAvatarClick} />

          <main>{children}</main>

          <Navbar />

          <StoryModal
            isOpen={isModalOpen}
            imageSrc={currentStory}
            onClose={closeModal}
          />
        </ResponsiveWrapper>
      </body>
    </html>
  );
}
