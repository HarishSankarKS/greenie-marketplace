import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/greenie-marketplace",
  assetPrefix: "/greenie-marketplace/",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
