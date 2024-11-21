import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Offbrand Spotify',
    short_name: 'Offbrand',
    description: 'a very offbrand spotify clone',
    start_url: '/',
    categories: ["music", "entertainment"],
    display_override: ['window-controls-overlay'],
    display: 'standalone',
    background_color: '#0f0f0f',
    theme_color: '#0f0f0f',
    icons: [
      { 
         src: './public/favicon.ico', 
         type: 'image/x-icon', 
         sizes: '16x16 32x32'
      },
      { 
         src: './public/icon-192.png', 
         type: 'image/png', 
         sizes: '192x192' 
      },
      { 
         src: './public/icon-512.png', 
         type: 'image/png', 
         sizes: '512x512' 
      },
      { 
         src: './public/icon-192-maskable.png', 
         type: 'image/png', 
         sizes: '192x192', 
         purpose: 'maskable' 
      },
      { 
         src: './public/icon-512-maskable.png', 
         type: 'image/png', 
         sizes: '512x512', 
         purpose: 'maskable'
      }
   ],
  }
}