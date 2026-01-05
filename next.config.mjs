import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development
  reactStrictMode: true,

  // Enable compression
  compress: true,

  // Disable X-Powered-By header for security
  poweredByHeader: false,

  // Exclude public assets from serverless bundle tracing (Next.js 16+)
  outputFileTracingExcludes: {
    '*': ['public/**'],
  },

  // Explicitly pass Firebase credentials to serverless functions
  // This ensures the env var is available at runtime in Netlify functions
  env: {
    FIREBASE_SERVICE_ACCOUNT_BASE64: process.env.FIREBASE_SERVICE_ACCOUNT_BASE64,
  },

  // Optimize images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel-insights.com https://*.netlify.app; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob: https://*.netlify.app https://*.netlify.com; connect-src 'self' https://*.vercel-insights.com https://*.supabase.co https://*.firebaseio.com https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://*.netlify.app; frame-src 'self' https://vercel.live;",
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      // Public route redirects
      {
        source: '/services',
        destination: '/how-we-work',
        permanent: true,
      },
      {
        source: '/partnerships',
        destination: '/how-we-work',
        permanent: true,
      },
      {
        source: '/partnerships/:slug',
        destination: '/how-we-work',
        permanent: true,
      },

      // Investor route consolidation (Phase 2)
      // Consolidate /invest/* and /investment/* → /investors/*
      {
        source: '/invest',
        destination: '/investors',
        permanent: true,
      },
      {
        source: '/invest/amplify',
        destination: '/investors/amplify',
        permanent: true,
      },
      {
        source: '/invest/atlas',
        destination: '/investors/atlas',
        permanent: true,
      },
      {
        source: '/invest/studio',
        destination: '/investors/studio',
        permanent: true,
      },
      {
        source: '/invest/studio/data-room',
        destination: '/investors/studio/data-room',
        permanent: true,
      },
      {
        source: '/invest/zero',
        destination: '/investors/zero',
        permanent: true,
      },
      {
        source: '/investment',
        destination: '/investors',
        permanent: true,
      },
      {
        source: '/investment/zero',
        destination: '/investors/zero',
        permanent: true,
      },

      // Zero case study consolidation - redirect sub-pages to main case study
      {
        source: '/work/zero/overview',
        destination: '/work/zero',
        permanent: true,
      },
      {
        source: '/work/zero/demo',
        destination: '/work/zero',
        permanent: true,
      },
      {
        source: '/work/zero/demo-new',
        destination: '/work/zero',
        permanent: true,
      },
      {
        source: '/work/zero/architecture',
        destination: '/work/zero',
        permanent: true,
      },
      {
        source: '/work/zero/metrics',
        destination: '/work/zero',
        permanent: true,
      },
      {
        source: '/work/zero/taxonomy',
        destination: '/work/zero',
        permanent: true,
      },
      {
        source: '/work/zero/timeline',
        destination: '/work/zero',
        permanent: true,
      },
      {
        source: '/work/zero/stats',
        destination: '/work/zero',
        permanent: true,
      },
    ];
  },

  // Webpack optimization
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Three.js bundle
          three: {
            name: 'three',
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            priority: 20,
          },
          // Framer Motion bundle
          framer: {
            name: 'framer',
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            priority: 20,
          },
          // Common vendor bundle
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
          },
          // Common code
          common: {
            name: 'common',
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };
    }

    return config;
  },

  // Turbopack configuration (empty to acknowledge Turbopack usage)
  turbopack: {},
};

export default withBundleAnalyzer(nextConfig);
