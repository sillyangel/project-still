import { Metadata } from "next";
import type { Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: 'black',
};

export const metadata: Metadata = {
  title: {
    template: 'offbrand spotify | %s',
    default: 'offbrand spotify',
  },
  description: 'a very awesome music streaming service',
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};