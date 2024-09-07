/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'be-staging.theyouthprint.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'theyouthprint.net',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
    ],
  },
  
  env: {
    STRAPI_API_URL: process.env.STRAPI_API_URL,
    OCP_APIM_SUBSCRIPTION_KEY: process.env.OCP_APIM_SUBSCRIPTION_KEY,
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.minimizer = config.optimization.minimizer.map((plugin) => {
        if (plugin.constructor.name === 'TerserPlugin') {
          return new plugin.constructor({
            ...plugin.options,
            terserOptions: {
              ...plugin.options.terserOptions,
              compress: {
                ...plugin.options.terserOptions.compress,
                drop_console: false,
              },
            },
          });
        }
        return plugin;
      });
    }
    return config;
  },
};

export default nextConfig;