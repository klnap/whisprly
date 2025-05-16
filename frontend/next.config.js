/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  transpilePackages: [
    '@/modules/auth',
    '@/modules/user',
  ],
};

module.exports = nextConfig;
