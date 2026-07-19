import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.replit.dev", "*.spock.replit.dev", "*.janeway.replit.dev", "*.worf.replit.dev", "*.riker.replit.dev", "*.picard.replit.dev", "*.kirk.replit.dev", "*.repl.co"],
  images: {
    formats: ['image/webp', 'image/avif'],
    qualities: [75, 95],
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
      destination: "https://orgni.olyxee.com",
      permanent: false,
    },
    {
      source: "/products/addup",
      destination: "https://addup.olyxee.com",
      permanent: false,
    },
    {
      source: "/document-integrity",
      destination: "/",
      permanent: false,
    },
    {
      source: "/solutions/enterprise-automation",
      destination: "/",
      permanent: false,
    },
    {
      source: "/research/cortex",
      destination: "/research",
      permanent: false,
    },
  ],
  // Replit dev-watcher mitigation: on the overlay filesystem, watching churny
  // platform dirs (.cache/.local/.next/...) causes phantom file-change events,
  // triggering an infinite recompile -> Fast Refresh full-reload loop in the
  // preview. Scoping the watcher to ignore them stops the loop. Dev-only.
  webpack: (config, { dev }) => {
    if (dev) {
      // Use an all-string glob list. Webpack rejects mixing the default
      // RegExp `ignored` with string globs, so we replace rather than merge.
      config.watchOptions = {
        ...(config.watchOptions || {}),
        aggregateTimeout: 300,
        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          "**/.next/**",
          "**/.cache/**",
          "**/.local/**",
          "**/.agents/**",
          "**/.config/**",
          "**/.upm/**",
        ],
      };
    }
    return config;
  },
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
