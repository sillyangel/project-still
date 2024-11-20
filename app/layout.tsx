import React from 'react'
import { Menu } from "@/app/components/menu"
import { Sidebar } from "@/app/components/sidebar"
import { playlists } from "@/app/data/playlists"
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
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="md:hidden">
          <p>Please view on desktop</p>
        </div>
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