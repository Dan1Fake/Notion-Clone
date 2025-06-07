/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    nodeMiddleware: true,
    runtime: 'edge',
  },
};

module.exports = nextConfig;
