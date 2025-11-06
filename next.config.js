/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // For MVP - remove in production with proper image optimization
  },
}

module.exports = nextConfig

