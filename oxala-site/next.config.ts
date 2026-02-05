import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly scope output tracing to this app root to avoid monorepo lockfile ambiguity.
  outputFileTracingRoot: path.join(__dirname),
  // Hide the Next.js dev indicator floating button
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
