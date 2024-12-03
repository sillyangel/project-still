'use client';

import { SpeedInsights } from "@vercel/speed-insights/next";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Head from 'next/head';
import { Menu } from "@/app/components/menu";
import { Sidebar } from "@/app/components/sidebar";
import { Analytics } from "@vercel/analytics/react";
import { playlists } from "@/app/data/playlists";
import localFont from "next/font/local";
import "./globals.css";
import { AudioPlayerProvider } from "./components/AudioPlayerContext";
import { AudioPlayer } from "./components/AudioPlayer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  let title = 'Offbrand Spotify';

  if (pathname === '/browse') {
    title += ' | Browse';
  } else if (pathname === '/') {
    title += ' | Home';
  } else if (pathname.startsWith('/album')) {
    title += ' | Album';
  } else if (pathname.startsWith('/artist')) {
    title += ' | Artist';
  }

  return (
    <html lang="en">
      <Head>
        <title>{title}</title>
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiase dark`}>
        <AudioPlayerProvider>
          <SpeedInsights />
          <Analytics />
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
          </div>
          <AudioPlayer />
        </AudioPlayerProvider>
      </body>
    </html>
  );
}