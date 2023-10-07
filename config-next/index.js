const withPwa = require("next-pwa");

const { version } = require("./package.json");

const isProduction = process.env.NODE_ENV === "production";
const shouldAnalyze = process.env.ANALYZE === "true";

/** @type {import('next-pwa').PWAConfig} */
const defaultPwaConfig = {
  dest: "public",
  disable: !isProduction,
};

/** @type {import('next').NextConfig} */
const defaultNextConfig = {
  compiler: {},
  experimental: {
    // webVitalsAttribution: ["CLS", "FCP", "FID", "INP", "LCP", "TTFB"],
  },
  modularizeImports: {},

  productionBrowserSourceMaps: false,

  publicRuntimeConfig: {
    version,
  },

  reactStrictMode: true,

  serverRuntimeConfig: {},

  swcMinify: true,

  transpilePackages: ["@tntfx/components", "@tntfx/core", "@tntfx/hooks", "@tntfx/theme"],
};

/**
 *
 * @param {import('next').NextConfig} nextConfig
 * @param {[import('next-pwa').PWAConfig]} pwaConfig
 */
function withSparrow(nextConfig, pwaConfig) {
  /** @type {import('next').NextConfig} */
  const finalNextConfig = {
    ...defaultNextConfig,
    ...nextConfig,

    transpilePackages: [...(defaultNextConfig.transpilePackages || []), ...(nextConfig.transpilePackages || [])],

    publicRuntimeConfig: {
      ...defaultNextConfig.publicRuntimeConfig,
      ...nextConfig?.publicRuntimeConfig,
    },

    serverRuntimeConfig: {
      ...defaultNextConfig.serverRuntimeConfig,
      ...nextConfig?.serverRuntimeConfig,
    },

    webpack(config, options) {
      config.module.rules.push({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
      });

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  };

  /** @type {import('next-pwa').PWAConfig} */
  const finalPwaConfig = { ...defaultPwaConfig, ...pwaConfig };

  if (shouldAnalyze) {
    const withAnalyzer = require("@next/bundle-analyzer")({ enabled: true, openAnalyzer: true });

    return withPwa(finalPwaConfig)(withAnalyzer(finalNextConfig));
  }

  // @ts-ignore
  return withPwa(finalPwaConfig)(finalNextConfig);
}

module.exports = withSparrow;
