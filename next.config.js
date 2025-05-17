// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['localhost'],
    },
    // Transpile @react-three libraries for better browser compatibility
    transpilePackages: [
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      '@react-three/xr',
      '@studio-freight/lenis',
    ],
  };
  
  module.exports = nextConfig;