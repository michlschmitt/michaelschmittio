/* eslint-disable @typescript-eslint/no-var-requires */

// next.config.js

// import node_modules
const loaderUtils = require('loader-utils');
const path = require('path');

// import config
const { securityHeaders } = require('./security-headers');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return process.env.NODE_ENV !== 'production'
      ? []
      : [
          {
            // Apply these headers to all routes in your application.
            source: '/(.*)',
            headers: securityHeaders,
          },
        ];
  },
  async rewrites() {
    return [
      {
        source: '/js/script.js',
        destination: 'https://plausible.io/js/plausible.js',
      },
      {
        source: '/api/event/',
        destination: 'https://plausible.io/api/event',
      },
    ];
  },
  images:
    process.env.VERCEL === '1' || process.env.NODE_ENV === 'development'
      ? undefined
      : {
          domains: ['localhost'],
          loader: 'custom',
        },
  outputFileTracing: false,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: true,
  webpack(config) {
    // https://stackoverflow.com/questions/55175445/cant-import-svg-into-next-js
    config.module.rules.push({
      test: /\.svg$/,
      issuer: { and: [/\.(js|ts)x?$/] },
      use: ['@svgr/webpack'],
    });

    // https://stackoverflow.com/questions/66780177/next-js-how-to-change-css-modules-classes-output-format
    // https://github.com/webpack-contrib/css-loader/issues/1307#issuecomment-842164034
    const rules = config.module.rules
      .find((rule) => typeof rule?.oneOf === 'object')
      ?.oneOf.filter((rule) => Array.isArray(rule?.use));

    rules?.forEach((rule) => {
      rule.use.forEach((moduleLoader) => {
        if (
          moduleLoader?.loader?.includes('css-loader') &&
          !moduleLoader?.loader?.includes('postcss-loader')
        ) {
          delete moduleLoader?.options?.modules?.getLocalIdent;
          moduleLoader.options = {
            ...moduleLoader.options,
            modules: {
              ...moduleLoader.options.modules,
              getLocalIdent: (context, localIdentName, localName, options) => {
                const filePath = context.resourcePath;
                const fileBaseName = path.basename(filePath);

                // make sure custom classNames are only used for css modules otherwise global css will get changed to but will not match wil html.
                if (/\.module\.css$/.test(fileBaseName)) {
                  // Create a hash based on a the file location and class name. Will be unique across a project, and close to globally unique.
                  const hash = loaderUtils.getHashDigest(
                    path.posix.relative(context.rootContext, context.resourcePath) + localName,
                    'md5',
                    'base64',
                    6,
                  );

                  // https://githubhelp.com/webpack/loader-utils
                  // NOTE: md5 produces special characters, replace them with x
                  const serializedHash = hash.replace(/[^a-zA-Z0-9]/g, 'x');

                  // Return the classname we want to use
                  const className = loaderUtils.interpolateName(
                    context,
                    'ms-' + serializedHash,
                    options,
                  );

                  // Remove the .module that appears in every classname when based on the file and replace all "." with "_".
                  return className.replace('.module_', '_').replace(/\./g, '_');
                }

                return localName;
              },
            },
          };
        }
      });
    });

    return config;
  },
};

module.exports = nextConfig;
