import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/learn", destination: "/", permanent: false },
      { source: "/learn/lifecycle", destination: "/tracks/lifecycle", permanent: false },
      { source: "/learn/governance", destination: "/tracks/governance", permanent: false },
      { source: "/learn/dama", destination: "/tracks/dama-wheel", permanent: false },
      { source: "/learn/roles", destination: "/tracks/roles", permanent: false },
      { source: "/learn/quality", destination: "/tracks/quality-metadata", permanent: false },
      { source: "/learn/mdm", destination: "/tracks/mdm-reference", permanent: false },
      { source: "/learn/:track/:module", destination: "/modules/:module", permanent: false },
    ];
  },
};

export default nextConfig;
