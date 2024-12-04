'use client';

import React, { useState } from 'react';
import { Menu } from "@/app/components/menu";
import { Sidebar } from "@/app/components/sidebar";
import { playlists } from "@/app/data/playlists";
import { AudioPlayer } from "./AudioPlayer";

interface IhateserversideProps {
  children: React.ReactNode;
}

const Ihateserverside: React.FC<IhateserversideProps> = ({ children }) => {
  
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  return (
    <div className="hidden md:block">
      <div className="sticky top-0 z-10 bg-background">
        <Menu toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
      </div>
      <div className="border-t">
        <div className="bg-background">
          <div className={isSidebarVisible ? "grid lg:grid-cols-5" : ""}>
            {isSidebarVisible && (
              <Sidebar playlists={playlists} className="hidden lg:block sticky top-0 h-screen" />
            )}
            <div className={`col-span-3 lg:col-span-4 ${isSidebarVisible ? 'lg:border-l' : ''}`}>
              {children}
            </div>
          </div>
        </div>
      </div>
      <AudioPlayer />
    </div>
  );
};

export default Ihateserverside;