import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure that Turbopack and Vercel handle the nested structure correctly
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
