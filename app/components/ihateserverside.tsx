'use client';

import React, { useState } from 'react';
import { Menu } from "@/app/components/menu";
import { Sidebar } from "@/app/components/sidebar";
import { playlists } from "@/app/data/playlists";
import { AudioPlayer } from "./AudioPlayer";
import Footer from "./footer";
import { Toaster } from "@/components/ui/toaster"

interface IhateserversideProps {
  children: React.ReactNode;
}

const Ihateserverside: React.FC<IhateserversideProps> = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isStatusBarVisible, setIsStatusBarVisible] = useState(true);
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  const handleTransitionEnd = () => {
    if (!isSidebarVisible) {
      setIsSidebarHidden(true); // This will fully hide the sidebar after transition
    }
  };
  return (
    <div className="hidden md:flex flex-col min-h-screen bg-background">
      {/* Top Menu */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <Menu
          toggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)}
          isSidebarVisible={isSidebarVisible}
          toggleStatusBar={() => setIsStatusBarVisible(!isStatusBarVisible)}
          isStatusBarVisible={isStatusBarVisible}
        />
      </div>

      {/* Main Content Area */}
      <div className={`${isSidebarVisible ? "grid lg:grid-cols-5" : ""}`}>
          <Sidebar
            playlists={playlists}
            className="hidden lg:block border-r"
          />
          <div className={`col-span-3 lg:col-span-4`}>
              <div>{children}</div>
          <Footer />
        </div>
      </div>

      {/* Audio Player */}
      {isStatusBarVisible && (
        <div className="sticky bottom-0 z-10 bg-background">
          <AudioPlayer />
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default Ihateserverside;