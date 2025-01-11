'use client';

import React, { useState } from 'react';
import { Menu } from "@/app/components/menu";
import { Sidebar } from "@/app/components/sidebar";
import { playlists } from "@/app/data/playlists";
import { AudioPlayer } from "./AudioPlayer";
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
    <div className="hidden md:block">
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
      <div className={`h-screen ${isSidebarVisible ? "grid lg:grid-cols-5" : ""}`}>
      {isSidebarVisible && (
          <Sidebar
            playlists={playlists}
            className={`hidden lg:block `}
            onTransitionEnd={handleTransitionEnd}
          />
      )}
          <div className={`border-l col-span-3 lg:col-span-4`}>
              <div>{children}</div>
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