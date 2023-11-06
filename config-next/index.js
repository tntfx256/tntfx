const { version } = require("./package.json");

const shouldAnalyze = process.env.ANALYZE === "true";

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
 */
function withNext(nextConfig) {
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

  if (shouldAnalyze) {
    const withAnalyzer = require("@next/bundle-analyzer")({ enabled: true, openAnalyzer: true });

    return withAnalyzer(finalNextConfig);
  }

  return finalNextConfig;
}

module.exports = withNext;
