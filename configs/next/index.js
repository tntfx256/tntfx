const { version } = require("./package.json");

const shouldAnalyze = process.env.ANALYZE === "true";

/** @type {import('next').NextConfig} */
const defaultNextConfig = {
  compiler: {},
  experimental: {
    webpackBuildWorker: true,
    // webVitalsAttribution: ["CLS", "FCP", "FID", "INP", "LCP", "TTFB"],
  },
  modularizeImports: {},
  productionBrowserSourceMaps: false,
  publicRuntimeConfig: { version },
  serverRuntimeConfig: { version },
  reactStrictMode: true,
  swcMinify: true,

  transpilePackages: ["@tntfx/components", "@tntfx/core", "@tntfx/theme"],
};

/**
 *
 * @param {import('next').NextConfig} nextConfig
 */
function withNext(nextConfig = {}) {
  /** @type {import('next').NextConfig} */
  const finalNextConfig = {
    ...defaultNextConfig,
    ...nextConfig,

    experimental: {
      ...defaultNextConfig.experimental,
      ...nextConfig.experimental,
    },

    transpilePackages: [...(defaultNextConfig.transpilePackages || []), ...(nextConfig.transpilePackages || [])],

    publicRuntimeConfig: {
      ...defaultNextConfig.publicRuntimeConfig,
      ...nextConfig.publicRuntimeConfig,
    },

    serverRuntimeConfig: {
      ...defaultNextConfig.serverRuntimeConfig,
      ...nextConfig.serverRuntimeConfig,
    },
  };

  if (shouldAnalyze) {
    const withAnalyzer = require("@next/bundle-analyzer")({ enabled: true, openAnalyzer: true });

    return withAnalyzer(finalNextConfig);
  }

  return finalNextConfig;
}

module.exports = withNext;
