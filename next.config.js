/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    VERCEL_URL: process.env.VERCEL_URL,
  },
};

module.exports = nextConfig;
