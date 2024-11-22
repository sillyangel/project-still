'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SpeedInsights } from "@vercel/speed-insights/next"
import React from 'react';
import { usePathname } from 'next/navigation';
import Head from 'next/head';
import { Menu } from "@/app/components/menu";
import { Sidebar } from "@/app/components/sidebar";
import { playlists } from "@/app/data/playlists";
import localFont from "next/font/local";
import "./globals.css";

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

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

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
        {/* <div className="md:hidden">
          <p>Please view on desktop</p>
        </div> */}
        <div className="hidden md:block">
          <div className="sticky top-0 z-10 bg-background">
            <Menu />
          </div>
          <div className="border-t">
            <div className="bg-background">
              <div className="grid lg:grid-cols-5">
                <Sidebar playlists={playlists} className="hidden lg:block sticky top-0 h-screen" />
                <div className="col-span-3 lg:col-span-4 lg:border-l">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

export default Layout;