import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.replit.dev", "*.spock.replit.dev", "*.janeway.replit.dev", "*.worf.replit.dev", "*.riker.replit.dev", "*.picard.replit.dev", "*.kirk.replit.dev", "*.repl.co"],
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' }
    ]
  },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  devIndicators: false,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  redirects: async () => [
    {
      source: "/products/ordo",
      destination: "https://ordo.olyxee.com",
      permanent: false,
    },
    {
      source: "/products/addup",
      destination: "https://addup.olyxee.com",
      permanent: false,
    },
  ],
  headers: async () => [
    {
      source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
    {
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    },
  ],
};

export default nextConfig;
