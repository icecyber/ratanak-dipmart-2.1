/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
