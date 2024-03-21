/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/* eslint-disable global-require */

const path = require('path');
const sass = require('sass');
const webpack = require('webpack');

function normalizeBrowser(browser) {
  return (
    {
      chrome: `Chrome${process.env.TRAVIS ? '_Travis' : ''}`,
      firefox: 'Firefox',
      safari: 'Safari',
      ie: 'IE',
    }[browser.toLowerCase()] || browser
  );
}

const serviceMocks = {
  '@carbon/ibmdotcom-services/es/services/Locale/Locale': path.resolve(
    __dirname,
    'mocks/LocaleAPI'
  ),
  '@carbon/ibmdotcom-services/es/services/Translation/Translation':
    path.resolve(__dirname, 'mocks/TranslationAPI'),
  '@carbon/ibmdotcom-services/es/services/KalturaPlayer/KalturaPlayer':
    path.resolve(__dirname, 'mocks/KalturaPlayerAPI'),
};

const reServices = /^@carbon\/ibmdotcom-services/i;

module.exports = function setupKarma(config) {
  const { browsers, collectCoverage, random, verbose } = config.customConfig;

  config.set({
    basePath: '..',

    browsers: (browsers.length > 0 ? browsers : ['ChromeHeadless']).map(
      normalizeBrowser
    ),

    frameworks: ['jasmine', 'aChecker'],

    client: {
      jasmine: {
        random: !!random,
      },
    },

    files: [
      'tests/utils/achecker-compliance.js',
      'tests/a11y/karma-setup-context.js',
      'tests/a11y/karma-test-shim.js',
    ],

    preprocessors: {
      'src/**/*.js': ['webpack', 'sourcemap'],
      'tests/a11y/**/*.js': ['webpack', 'sourcemap'],
      'tests/utils/**/*.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-maps',
      resolve: {
        extensions: ['.js', '.ts'],
      },
      module: {
        rules: [
          {
            test: /@storybook[\\/]addon-/i,
            use: 'null-loader',
          },
          {
            test: /[\\/]styles[\\/]icons[\\/]/i,
            use: [require.resolve('../tools/svg-result-ibmdotcom-icon-loader')],
          },
          {
            test: /\.ts$/,
            use: [
              {
                // Build note: Locking down `@babel/plugin-transform-typescript` to `~7.6.0`
                // given `7.7` or later versions seems to have a problem with using decorator with fields without an initializer
                loader: 'babel-loader',
                options: {
                  configFile: path.resolve(__dirname, '..', '.babelrc'),
                },
              },
            ],
          },
          !collectCoverage
            ? {}
            : {
                test: /\.[jt]s$/,
                exclude: [
                  __dirname,
                  /__tests__/,
                  path.resolve(__dirname, '../node_modules'),
                ],
                enforce: 'post',
                use: {
                  loader: 'istanbul-instrumenter-loader',
                  options: {
                    esModules: true,
                  },
                },
              },
          {
            test: /\.js$/,
            include: [__dirname, path.dirname(require.resolve('lit'))],
            use: {
              loader: 'babel-loader',
              options: {
                configFile: path.resolve(__dirname, '..', '.babelrc'),
              },
            },
          },
          {
            test: /\.scss$/,
            sideEffects: true,
            use: [
              require.resolve('../tools/css-result-loader'),
              {
                loader: 'postcss-loader',
                options: {
                  plugins: () => [
                    require('autoprefixer')({
                      overrideBrowsersList: [
                        '> 0.5%',
                        'last 2 versions',
                        'Firefox ESR',
                        'not dead',
                      ],
                    }),
                  ],
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  implementation: sass,
                  webpackImporter: false,
                  sassOptions: {
                    includePaths: [
                      path.resolve(__dirname, '..', 'node_modules'),
                      path.resolve(__dirname, '../../..', 'node_modules'),
                    ],
                  },
                },
              },
            ],
          },
          {
            test: /\.mdx$/,
            use: 'null-loader',
          },
          {
            test: /\.(jpe?g|png|gif)(\?[a-z0-9=.]+)?$/,
            loader: 'url-loader',
          },
          {
            test: /\.(jpe?g|png|gif)(\?[a-z0-9=.]+)?$/,
            loader: 'file-loader',
          },
        ],
      },

      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test'),
          'process.env.C4D_CLOUD_MASTHEAD': JSON.stringify('true'),
        }),
        new webpack.NormalModuleReplacementPlugin(reServices, (resource) => {
          const { request } = resource;
          resource.request = serviceMocks[request] || request;
        }),
      ],
    },

    webpackMiddleware: {
      noInfo: !verbose,
    },

    customLaunchers: {
      Chrome_Travis: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },

    plugins: [
      require('karma-accessibility-checker'),
      require('karma-jasmine'),
      require('karma-spec-reporter'),
      require('karma-sourcemap-loader'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-webpack'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
    ],

    reporters: [
      'spec',
      ...(!collectCoverage ? [] : ['coverage-istanbul']),
      'aChecker',
    ],

    coverageIstanbulReporter: {
      reports: ['html', 'text'],
      dir: path.join(__dirname, 'coverage'),
      combineBrowserReports: true,
      fixWebpackSourcePaths: true,
      verbose,
    },

    port: 9876,

    colors: true,

    browserNoActivityTimeout: 60000,

    autoWatch: true,
    autoWatchBatchDelay: 400,

    logLevel: verbose ? config.LOG_DEBUG : config.LOG_INFO,

    concurrency: Infinity,
  });
};
