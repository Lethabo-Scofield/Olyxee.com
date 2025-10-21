import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // disables Image Optimization API for static export
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' }
    ]
  },
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  turbopack: { rules: { "*.{jsx,tsx}": { loaders: [LOADER] } } },
  output: 'export' // enables static export for Firebase Hosting
};

export default nextConfig;
