import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    nodeMiddleware: true,  // keep this to enable Node.js middleware runtime
  },
};

export default nextConfig;
