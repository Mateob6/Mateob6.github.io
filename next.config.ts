import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // Two root layouts (English at /, Spanish at /es): the 404 page is app/global-not-found.tsx
  experimental: { globalNotFound: true },
};

export default nextConfig;
