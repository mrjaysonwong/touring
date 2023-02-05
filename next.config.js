/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  env: {
    NINJA_KEY: process.env.NINJA_KEY,
  },
};

module.exports = nextConfig;
