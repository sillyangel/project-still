/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a5.mzstatic.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;