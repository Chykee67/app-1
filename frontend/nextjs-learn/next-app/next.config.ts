import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('http://127.0.0.1/media/**')],
  },
};

export default nextConfig;
