import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/config-301",
        destination: "/news",
        statusCode: 301,
      },
      {
        source: "/config-302",
        destination: "/business",
        statusCode: 302,
      },
    ];
  },
};

export default nextConfig;
