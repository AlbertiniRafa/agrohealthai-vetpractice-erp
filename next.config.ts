import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.agrohealthai.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
