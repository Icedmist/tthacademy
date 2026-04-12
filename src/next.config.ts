
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
       {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
       {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      }
    ],
  },
  webpack: (config, { isServer }) => {
    // Genkit uses Handlebars, which in turn uses a feature not supported by
    // Webpack. We mark it as external to avoid this error.
    if (isServer) {
      config.externals.push('handlebars');
    }
    return config;
  },
};

export default nextConfig;
