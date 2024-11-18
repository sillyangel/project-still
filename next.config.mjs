/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a5.mzstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'offbrandspotifydb.web.app',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;