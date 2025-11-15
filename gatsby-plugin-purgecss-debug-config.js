{
  name: 'build-javascript',
  context: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion',
  entry: {
    app: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/.cache/production-app'
  },
  output: {
    filename: '[name]-[contenthash].js',
    chunkFilename: '[name]-[contenthash].js',
    path: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/public',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.mjs$/i,
        resolve: { byDependency: { esm: { fullySpecified: false } } }
      },
      {
        test: /\.js$/i,
        descriptionData: { type: 'module' },
        resolve: { byDependency: { esm: { fullySpecified: false } } }
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: [Function: include],
        type: 'javascript/auto',
        use: [Function: use]
      },
      {
        test: /\.ya?ml$/,
        type: 'json',
        use: [
          {
            loader: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/yaml-loader/index.js',
            options: { asJSON: true }
          }
        ]
      },
      {
        use: [
          {
            loader: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/url-loader/dist/cjs.js',
            options: {
              limit: 10000,
              name: 'static/[name]-[hash].[ext]',
              fallback: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/file-loader/dist/cjs.js'
            }
          }
        ],
        test: /\.(eot|otf|ttf|woff(2)?)(\?.*)?$/
      },
      {
        use: [
          {
            loader: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/url-loader/dist/cjs.js',
            options: {
              limit: 10000,
              name: 'static/[name]-[hash].[ext]',
              fallback: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/file-loader/dist/cjs.js'
            }
          }
        ],
        test: /\.(ico|svg|jpg|jpeg|png|gif|webp|avif)(\?.*)?$/
      },
      {
        use: [
          {
            loader: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/url-loader/dist/cjs.js',
            options: {
              limit: 10000,
              name: 'static/[name]-[hash].[ext]',
              fallback: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/file-loader/dist/cjs.js'
            }
          }
        ],
        test: /\.(mp4|webm|ogv|wav|mp3|m4a|aac|oga|flac)$/
      },
      {
        use: [
          {
            loader: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/file-loader/dist/cjs.js',
            options: { name: 'static/[name]-[hash].[ext]' }
          }
        ],
        test: /\.pdf$/
      },
      {
        oneOf: [
          {
            use: [
              {
                loader: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: { modules: { namedExport: true } }
              },
              {
                loader: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/css-loader/dist/cjs.js',
                options: {
                  url: [Function: url],
                  sourceMap: false,
                  modules: {
                    auto: undefined,
                    namedExport: true,
                    localIdentName: '[name]--[local]--[hash:hex:5]',
                    exportLocalsConvention: 'dashesOnly',
                    exportOnlyLocals: false
                  }
                }
              },
              {
                loader: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-purgecss/loader.js',
                options: {
                  printSummary: true,
                  printAll: false,
                  tailwind: false,
                  ignore: [],
                  purgeCSSOptions: {
                    rejected: true,
                    content: [
                      '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/src/**/!(*.d).{ts,js,jsx,tsx}'
                    ],
                    css: [],
                    safelist: { standard: [ 'html', 'body' ] }
                  },
                  develop: true,
                  printRejected: true,
                  purgeOnly: [ '/sass/main.scss' ],
                  debug: true
                }
              },
              {
                loader: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  execute: false,
                  sourceMap: false,
                  postcssOptions: [Function: postcssOptions]
                }
              }
            ],
            test: /\.module\.css$/
          },
          {
            use: [
              {
                loader: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: { modules: undefined }
              },
              {
                loader: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/css-loader/dist/cjs.js',
                options: {
                  url: [Function: url],
                  sourceMap: false,
                  modules: false
                }
              },
              {
                loader: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-purgecss/loader.js',
                options: {
                  printSummary: true,
                  printAll: false,
                  tailwind: false,
                  ignore: [],
                  purgeCSSOptions: {
                    rejected: true,
                    content: [
                      '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/src/**/!(*.d).{ts,js,jsx,tsx}'
                    ],
                    css: [],
                    safelist: { standard: [ 'html', 'body' ] }
                  },
                  develop: true,
                  printRejected: true,
                  purgeOnly: [ '/sass/main.scss' ],
                  debug: true
                }
              },
              {
                loader: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  execute: false,
                  sourceMap: false,
                  postcssOptions: [Function: postcssOptions]
                }
              }
            ],
            test: /\.css$/
          }
        ]
      },
      {
        oneOf: [
          {
            test: /\.module\.s(a|c)ss$/,
            use: [
              {
                loader: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: { modules: { namedExport: true } }
              },
              {
                loader: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/css-loader/dist/cjs.js',
                options: {
                  url: [Function: url],
                  sourceMap: false,
                  modules: {
                    auto: undefined,
                    namedExport: true,
                    localIdentName: '[name]--[local]--[hash:hex:5]',
                    exportLocalsConvention: 'dashesOnly',
                    exportOnlyLocals: false
                  }
                }
              },
              {
                loader: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-purgecss/loader.js',
                options: {
                  printSummary: true,
                  printAll: false,
                  tailwind: false,
                  ignore: [],
                  purgeCSSOptions: {
                    rejected: true,
                    content: [
                      '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/src/**/!(*.d).{ts,js,jsx,tsx}'
                    ],
                    css: [],
                    safelist: { standard: [ 'html', 'body' ] }
                  },
                  develop: true,
                  printRejected: true,
                  purgeOnly: [ '/sass/main.scss' ],
                  debug: true
                }
              },
              {
                loader: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  execute: false,
                  sourceMap: false,
                  postcssOptions: [Function: postcssOptions]
                }
              },
              {
                loader: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: undefined,
                  sassOptions: {
                    indentedSyntax: false,
                    file: null,
                    data: null,
                    includePaths: [],
                    indentType: 'space',
                    indentWidth: 2,
                    linefeed: 'lf',
                    omitSourceMapUrl: false,
                    outFile: null,
                    precision: 5,
                    sourceComments: false,
                    sourceMapContents: false,
                    sourceMapEmbed: false
                  },
                  additionalData: undefined
                }
              }
            ]
          },
          {
            test: /\.s(a|c)ss$/,
            use: [
              {
                loader: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: { modules: undefined }
              },
              {
                loader: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/css-loader/dist/cjs.js',
                options: {
                  url: [Function: url],
                  sourceMap: false,
                  modules: false
                }
              },
              {
                loader: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-purgecss/loader.js',
                options: {
                  printSummary: true,
                  printAll: false,
                  tailwind: false,
                  ignore: [],
                  purgeCSSOptions: {
                    rejected: true,
                    content: [
                      '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/src/**/!(*.d).{ts,js,jsx,tsx}'
                    ],
                    css: [],
                    safelist: { standard: [ 'html', 'body' ] }
                  },
                  develop: true,
                  printRejected: true,
                  purgeOnly: [ '/sass/main.scss' ],
                  debug: true
                }
              },
              {
                loader: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  execute: false,
                  sourceMap: false,
                  postcssOptions: [Function: postcssOptions]
                }
              },
              {
                loader: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: undefined,
                  sassOptions: {
                    indentedSyntax: false,
                    file: null,
                    data: null,
                    includePaths: [],
                    indentType: 'space',
                    indentWidth: 2,
                    linefeed: 'lf',
                    omitSourceMapUrl: false,
                    outFile: null,
                    precision: 5,
                    sourceComments: false,
                    sourceMapContents: false,
                    sourceMapEmbed: false
                  },
                  additionalData: undefined
                }
              }
            ]
          }
        ]
      }
    ]
  },
  plugins: [
    IgnorePlugin {
      options: { resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ },
      checkIgnore: [Function: bound checkIgnore]
    },
    DefinePlugin {
      definitions: {
        'process.env': '({})',
        'process.env.NODE_ENV': '"production"',
        'process.env.PUBLIC_DIR': '"/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/public"',
        'process.env.BUILD_STAGE': '"build-javascript"',
        'process.env.CYPRESS_SUPPORT': undefined,
        'process.env.GATSBY_QUERY_ON_DEMAND': 'false',
        'process.env.GATSBY_LOGGER': '"ink"',
        'process.env.GATSBY_REPORTER_ISVERBOSE': '"0"',
        'process.env.GATSBY_SLICES': '"true"',
        'process.env.GATSBY_QUERY_ON_DEMAND_LOADING_INDICATOR': '"true"',
        __BASE_PATH__: '""',
        __PATH_PREFIX__: '""',
        __ASSET_PREFIX__: '""',
        __TRAILING_SLASH__: '"always"',
        BROWSER_ESM_ONLY: 'true',
        'global.hasPartialHydration': false
      }
    },
    GatsbyWebpackVirtualModules {},
    BabelConfigItemsCacheInvalidatorPlugin {
      name: 'BabelConfigItemsCacheInvalidatorPlugin'
    },
    MiniCssExtractPlugin {
      _sortedModulesCache: WeakMap { <items unknown> },
      options: {
        filename: '[name].[contenthash].css',
        ignoreOrder: false,
        experimentalUseImportModule: false,
        chunkFilename: '[name].[contenthash].css'
      },
      runtimeOptions: {
        insert: undefined,
        linkType: 'text/css',
        attributes: undefined
      }
    },
    GatsbyWebpackStatsExtractor {
      plugin: { name: 'GatsbyWebpackStatsExtractor' },
      publicPath: ''
    },
    StaticQueryMapper {
      store: {
        dispatch: [Function (anonymous)],
        subscribe: [Function: subscribe],
        getState: [Function: getState],
        replaceReducer: [Function: replaceReducer],
        '@@observable': [Function: observable]
      },
      name: 'StaticQueryMapper'
    },
    DefinePlugin { definitions: { GATSBY___IMAGE: true } }
  ],
  devtool: 'source-map',
  performance: { hints: false },
  mode: 'production',
  resolveLoader: {
    modules: [
      '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules',
      '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby/dist/loaders',
      'node_modules'
    ]
  },
  resolve: {
    extensions: [
      '.mjs',  '.js',
      '.jsx',  '.wasm',
      '.json', '.ts',
      '.tsx'
    ],
    alias: {
      'gatsby$': '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/.cache/gatsby-browser-entry.js',
      '@babel/runtime': '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/@babel/runtime',
      '@reach/router': '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/@gatsbyjs/reach-router',
      'react-lifecycles-compat': '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/.cache/react-lifecycles-compat.js',
      'react-server-dom-webpack': '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/react-server-dom-webpack',
      '@pmmmwh/react-refresh-webpack-plugin': '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/@pmmmwh/react-refresh-webpack-plugin',
      'socket.io-client': '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/socket.io-client',
      'webpack-hot-middleware': '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/@gatsbyjs/webpack-hot-middleware',
      '$virtual': '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/.cache/_this_is_virtual_fs_path_/$virtual',
      'gatsby-core-utils/create-content-digest': '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/.cache/create-content-digest-browser-shim',
      react: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/react',
      'react-dom': '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/react-dom',
      'object.assign': '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby/dist/internal-plugins/bundle-optimisations/polyfills/object-assign.js',
      'object-assign$': '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby/dist/internal-plugins/bundle-optimisations/polyfills/object-assign.js',
      '@babel/runtime/helpers/extends.js$': '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby/dist/internal-plugins/bundle-optimisations/polyfills/object-assign.js',
      'unfetch$': '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby/dist/internal-plugins/bundle-optimisations/polyfills/fetch.js',
      'unfetch/polyfill$': '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby/dist/internal-plugins/bundle-optimisations/polyfills/no-op.js',
      'isomorphic-unfetch$': '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby/dist/internal-plugins/bundle-optimisations/polyfills/fetch.js',
      'isomorphic-fetch$': '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby/dist/internal-plugins/bundle-optimisations/polyfills/fetch.js',
      'whatwg-fetch$': '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby/dist/internal-plugins/bundle-optimisations/polyfills/whatwg-fetch.js',
      'url-polyfill$': '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby/dist/internal-plugins/bundle-optimisations/polyfills/no-op.js'
    },
    plugins: [
      CoreJSResolver {
        _coreJSNodeModulesPath: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules'
      },
      CacheFolderResolver {
        isEnabled: false,
        requestsFolder: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/.cache'
      },
      GatsbyThemeComponentShadowingResolverPlugin {
        themes: [
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby/dist/internal-plugins/dev-404-page',
            themeName: 'dev-404-page'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby/dist/internal-plugins/load-babel-config',
            themeName: 'load-babel-config'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby/dist/internal-plugins/internal-data-bridge',
            themeName: 'internal-data-bridge'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby/dist/internal-plugins/prod-404-500',
            themeName: 'prod-404-500'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby/dist/internal-plugins/webpack-theme-component-shadowing',
            themeName: 'webpack-theme-component-shadowing'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby/dist/internal-plugins/bundle-optimisations',
            themeName: 'bundle-optimisations'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby/dist/internal-plugins/functions',
            themeName: 'functions'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-react-helmet',
            themeName: 'gatsby-plugin-react-helmet'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-sass',
            themeName: 'gatsby-plugin-sass'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-gdpr-cookies',
            themeName: 'gatsby-plugin-gdpr-cookies'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-sitemap',
            themeName: 'gatsby-plugin-sitemap'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-source-filesystem',
            themeName: 'gatsby-source-filesystem'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-source-filesystem',
            themeName: 'gatsby-source-filesystem'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-source-filesystem',
            themeName: 'gatsby-source-filesystem'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-source-filesystem',
            themeName: 'gatsby-source-filesystem'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-source-filesystem',
            themeName: 'gatsby-source-filesystem'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-source-filesystem',
            themeName: 'gatsby-source-filesystem'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-image',
            themeName: 'gatsby-plugin-image'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-sharp',
            themeName: 'gatsby-plugin-sharp'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-transformer-sharp',
            themeName: 'gatsby-transformer-sharp'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-transformer-remark',
            themeName: 'gatsby-transformer-remark'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-remark-relative-images',
            themeName: 'gatsby-remark-relative-images'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-remark-images',
            themeName: 'gatsby-remark-images'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-remark-copy-linked-files',
            themeName: 'gatsby-remark-copy-linked-files'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-decap-cms',
            themeName: 'gatsby-plugin-decap-cms'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-omni-font-loader',
            themeName: 'gatsby-omni-font-loader'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-purgecss',
            themeName: 'gatsby-plugin-purgecss'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-react-svg',
            themeName: 'gatsby-plugin-react-svg'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-netlify',
            themeName: 'gatsby-plugin-netlify'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-page-creator',
            themeName: 'gatsby-plugin-page-creator'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-page-creator',
            themeName: 'gatsby-plugin-page-creator'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-page-creator',
            themeName: 'gatsby-plugin-page-creator'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-page-creator',
            themeName: 'gatsby-plugin-page-creator'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-page-creator',
            themeName: 'gatsby-plugin-page-creator'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-page-creator',
            themeName: 'gatsby-plugin-page-creator'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-page-creator',
            themeName: 'gatsby-plugin-page-creator'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-page-creator',
            themeName: 'gatsby-plugin-page-creator'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-page-creator',
            themeName: 'gatsby-plugin-page-creator'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-page-creator',
            themeName: 'gatsby-plugin-page-creator'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-page-creator',
            themeName: 'gatsby-plugin-page-creator'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-page-creator',
            themeName: 'gatsby-plugin-page-creator'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-page-creator',
            themeName: 'gatsby-plugin-page-creator'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-page-creator',
            themeName: 'gatsby-plugin-page-creator'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-page-creator',
            themeName: 'gatsby-plugin-page-creator'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-page-creator',
            themeName: 'gatsby-plugin-page-creator'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-page-creator',
            themeName: 'gatsby-plugin-page-creator'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-page-creator',
            themeName: 'gatsby-plugin-page-creator'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-page-creator',
            themeName: 'gatsby-plugin-page-creator'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-page-creator',
            themeName: 'gatsby-plugin-page-creator'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-page-creator',
            themeName: 'gatsby-plugin-page-creator'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-typescript',
            themeName: 'gatsby-plugin-typescript'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion',
            themeName: 'default-site-plugin'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-page-creator',
            themeName: 'gatsby-plugin-page-creator'
          },
          {
            themeDir: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby/dist/internal-plugins/partytown',
            themeName: 'partytown'
          }
        ],
        projectRoot: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion',
        extensions: [
          '.mjs',  '.js',
          '.jsx',  '.wasm',
          '.json', '.ts',
          '.tsx'
        ],
        extensionsCategory: {
          js: 'code',
          jsx: 'code',
          ts: 'code',
          tsx: 'code',
          cjs: 'code',
          mjs: 'code',
          mts: 'code',
          coffee: 'code',
          json: 'json',
          yaml: 'json',
          yml: 'json',
          css: 'stylesheet',
          sass: 'stylesheet',
          scss: 'stylesheet',
          less: 'stylesheet',
          'css.js': 'stylesheet',
          jpeg: 'image',
          jpg: 'image',
          jfif: 'image',
          png: 'image',
          tiff: 'image',
          webp: 'image',
          avif: 'image',
          gif: 'image',
          woff: 'font',
          woff2: 'font'
        },
        additionalShadowExtensions: [
          {
            key: '.mjs',
            value: [ '.mjs', '.js', '.jsx', '.ts', '.tsx' ]
          },
          {
            key: '.js',
            value: [ '.mjs', '.js', '.jsx', '.ts', '.tsx' ]
          },
          {
            key: '.jsx',
            value: [ '.mjs', '.js', '.jsx', '.ts', '.tsx' ]
          },
          {
            key: '.ts',
            value: [ '.mjs', '.js', '.jsx', '.ts', '.tsx' ]
          },
          {
            key: '.tsx',
            value: [ '.mjs', '.js', '.jsx', '.ts', '.tsx' ]
          },
          { key: '.json', value: [ '.json' ] }
        ]
      }
    ]
  },
  target: [ 'web', 'es5' ],
  optimization: {
    runtimeChunk: { name: 'webpack-runtime' },
    mangleExports: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: false,
        defaultVendors: false,
        framework: {
          chunks: 'all',
          name: 'framework',
          test: [Function: test],
          priority: 40,
          enforce: true
        },
        lib: {
          test: [Function: test],
          name: [Function: name],
          priority: 30,
          minChunks: 1,
          reuseExistingChunk: true
        },
        commons: { name: 'commons', minChunks: 8, priority: 20 },
        shared: {
          test: [Function: test],
          name: [Function: name],
          priority: 10,
          minChunks: 2,
          reuseExistingChunk: true
        },
        styles: {
          test: [Function: test],
          name: 'styles',
          priority: 40,
          enforce: true
        },
        'netlify-identity-widget': {
          test: /[\\/]node_modules[\\/](netlify-identity-widget)[\\/]/,
          name: 'netlify-identity-widget',
          chunks: 'all',
          enforce: true
        }
      },
      maxAsyncRequests: Infinity,
      maxInitialRequests: 25,
      minSize: 20000
    },
    minimizer: [
      TerserPlugin {
        options: {
          test: /\.[cm]?js(\?.*)?$/i,
          extractComments: true,
          parallel: 9,
          include: undefined,
          exclude: /\.min\.js/,
          minimizer: {
            implementation: [AsyncFunction: terserMinify] {
              getMinimizerVersion: [Function (anonymous)],
              supportsWorkerThreads: [Function (anonymous)]
            },
            options: {
              ie8: false,
              mangle: { safari10: true },
              parse: { ecma: 5 },
              compress: { ecma: 5 },
              output: { ecma: 5 }
            }
          }
        }
      },
      CssMinimizerPlugin {
        options: {
          test: /\.css(\?.*)?$/i,
          warningsFilter: [Function: warningsFilter],
          parallel: 9,
          include: undefined,
          exclude: undefined,
          minify: [AsyncFunction: cssnanoMinify],
          minimizerOptions: {
            preset: [
              'default',
              {
                svgo: {
                  full: true,
                  plugins: [
                    'cleanupAttrs',
                    'cleanupEnableBackground',
                    'cleanupIDs',
                    'cleanupListOfValues',
                    'cleanupNumericValues',
                    'collapseGroups',
                    'convertColors',
                    'convertPathData',
                    'convertStyleToAttrs',
                    'convertTransform',
                    'inlineStyles',
                    'mergePaths',
                    'minifyStyles',
                    'moveElemsAttrsToGroup',
                    'moveGroupAttrsToElems',
                    'prefixIds',
                    'removeComments',
                    'removeDesc',
                    'removeDoctype',
                    'removeEditorsNSData',
                    'removeEmptyAttrs',
                    'removeEmptyContainers',
                    'removeEmptyText',
                    'removeHiddenElems',
                    'removeMetadata',
                    'removeNonInheritableGroupAttrs',
                    'removeRasterImages',
                    'removeScriptElement',
                    'removeStyleElement',
                    'removeTitle',
                    'removeUnknownsAndDefaults',
                    'removeUnusedNS',
                    'removeUselessDefs',
                    'removeUselessStrokeAndFill',
                    'removeXMLProcInst',
                    'reusePaths',
                    'sortAttrs'
                  ]
                }
              }
            ]
          }
        }
      }
    ]
  },
  cache: {
    type: 'filesystem',
    name: 'build-javascript',
    cacheLocation: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/.cache/webpack/stage-build-javascript',
    buildDependencies: {
      config: [
        '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby/dist/utils/webpack.config.js',
        '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby/dist/internal-plugins/webpack-theme-component-shadowing/gatsby-node.js',
        '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby/dist/internal-plugins/bundle-optimisations/gatsby-node.js',
        '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-sass/gatsby-node.js',
        '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-image/gatsby-node.js',
        '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-decap-cms/gatsby-node.js',
        '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-purgecss/gatsby-node.js',
        '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-react-svg/gatsby-node.js',
        '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-netlify/gatsby-node.js',
        '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby-plugin-typescript/gatsby-node.js'
      ]
    }
  }
}