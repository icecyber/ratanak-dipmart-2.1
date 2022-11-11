/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'www.dipmarts.com',
      's3.ap-southeast-1.amazonaws.com',
      'cdn.pixabay.com',
    ],
  },
};

module.exports = nextConfig;
