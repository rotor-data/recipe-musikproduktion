{
  name: 'develop',
  context: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion',
  entry: {
    commons: [
      '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/.cache/app'
    ]
  },
  output: {
    path: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion',
    filename: '[name].js',
    pathinfo: true,
    publicPath: '/',
    devtoolModuleFilenameTemplate: [Function: devtoolModuleFilenameTemplate],
    crossOriginLoading: 'anonymous'
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
                  sourceMap: true,
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
                  sourceMap: true,
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
                  sourceMap: true,
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
                  sourceMap: true,
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
                  sourceMap: true,
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
                  sourceMap: true,
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
                  sourceMap: true,
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
                  sourceMap: true,
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
        'process.env.MAILCHIMP_API_KEY': '"203b77c1189c9601b5c7ead7b93badbd-us4"',
        'process.env.MAILCHIMP_LIST_ID': '"6991276398"',
        'process.env.NODE_ENV': '"development"',
        'process.env.PUBLIC_DIR': '"/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/public"',
        'process.env.BUILD_STAGE': '"develop"',
        'process.env.CYPRESS_SUPPORT': undefined,
        'process.env.GATSBY_QUERY_ON_DEMAND': '"true"',
        'process.env.GATSBY_SOCKET_IO_DEFAULT_TRANSPORT': '"websocket"',
        'process.env.GATSBY_LOGGER': '"yurnalist"',
        'process.env.GATSBY_TELEMETRY_DISABLED': '"1"',
        'process.env.GATSBY_PRECOMPILE_DEVELOP_FUNCTIONS': '"true"',
        'process.env.GATSBY_REPORTER_ISVERBOSE': '"0"',
        'process.env.GATSBY_NODE_GLOBALS': '"{\\"buildId\\":\\"d66a9eaf-0da7-4c20-8b22-0f4e12b5979f\\",\\"root\\":\\"/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion\\"}"',
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
    ReactRefreshPlugin {
      options: {
        overlay: {
          sockIntegration: 'whm',
          module: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby/dist/utils/fast-refresh-module',
          entry: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/@pmmmwh/react-refresh-webpack-plugin/client/ErrorOverlayEntry.js'
        },
        exclude: /node_modules/ { test: [Function (anonymous)] },
        include: /\.([cm]js|[jt]sx?|flow)$/i
      }
    },
    ForceCssHMRForEdgeCases {
      hackCounter: 0,
      previouslySeenCss: Set(0) {},
      name: 'ForceCssHMRForEdgeCases'
    },
    HotModuleReplacementPlugin { options: {} },
    NoEmitOnErrorsPlugin {},
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
    MiniCssExtractPlugin {
      _sortedModulesCache: WeakMap { <items unknown> },
      options: {
        filename: '[name].css',
        ignoreOrder: false,
        experimentalUseImportModule: false,
        chunkFilename: '[id].css'
      },
      runtimeOptions: {
        insert: undefined,
        linkType: 'text/css',
        attributes: undefined
      }
    },
    ESLintWebpackPlugin {
      key: 'ESLintWebpackPlugin_1',
      options: {
        extensions: [ 'js', 'jsx' ],
        emitError: true,
        emitWarning: true,
        failOnError: true,
        exclude: [
          '/node_modules/',
          '/bower_components/',
          '.cache/_this_is_virtual_fs_path_'
        ],
        useEslintrc: false,
        resolvePluginsRelativeTo: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby/dist/utils',
        rulePaths: [
          '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby/dist/utils/eslint-rules'
        ],
        baseConfig: {
          globals: {
            graphql: true,
            __PATH_PREFIX__: true,
            __TRAILING_SLASH__: true,
            __BASE_PATH__: true
          },
          extends: [
            '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/eslint-config-react-app/index.js',
            '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/gatsby/dist/utils/eslint/required.js'
          ],
          parser: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/@babel/eslint-parser/lib/index.cjs',
          parserOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            ecmaFeatures: { jsx: true },
            babelOptions: {
              presets: [
                '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/node_modules/babel-preset-gatsby/index.js'
              ]
            },
            requireConfigFile: false
          },
          plugins: [],
          rules: {
            'react/jsx-uses-react': 'error',
            'react/react-in-jsx-scope': 'error',
            'import/no-webpack-loader-syntax': [ 0 ],
            'react/jsx-pascal-case': [ 'warn', { allowNamespace: true } ],
            'jsx-a11y/alt-text': 'warn',
            'jsx-a11y/anchor-has-content': 'warn',
            'jsx-a11y/anchor-is-valid': 'warn',
            'jsx-a11y/aria-activedescendant-has-tabindex': 'warn',
            'jsx-a11y/aria-props': 'warn',
            'jsx-a11y/aria-proptypes': 'warn',
            'jsx-a11y/aria-role': 'warn',
            'jsx-a11y/aria-unsupported-elements': 'warn',
            'jsx-a11y/autocomplete-valid': [ 'warn', { inputComponents: [] } ],
            'jsx-a11y/click-events-have-key-events': 'warn',
            'jsx-a11y/control-has-associated-label': [
              'warn',
              {
                ignoreElements: [
                  'audio',    'canvas',
                  'embed',    'input',
                  'textarea', 'tr',
                  'video'
                ],
                ignoreRoles: [
                  'grid',       'listbox',
                  'menu',       'menubar',
                  'radiogroup', 'row',
                  'tablist',    'toolbar',
                  'tree',       'treegrid'
                ],
                includeRoles: [ 'alert', 'dialog' ]
              }
            ],
            'jsx-a11y/heading-has-content': 'warn',
            'jsx-a11y/html-has-lang': 'warn',
            'jsx-a11y/iframe-has-title': 'warn',
            'jsx-a11y/img-redundant-alt': 'warn',
            'jsx-a11y/interactive-supports-focus': [
              'warn',
              {
                tabbable: [
                  'button',
                  'checkbox',
                  'link',
                  'progressbar',
                  'searchbox',
                  'slider',
                  'spinbutton',
                  'switch',
                  'textbox'
                ]
              }
            ],
            'jsx-a11y/label-has-associated-control': 'warn',
            'jsx-a11y/lang': 'warn',
            'jsx-a11y/media-has-caption': 'warn',
            'jsx-a11y/mouse-events-have-key-events': 'warn',
            'jsx-a11y/no-access-key': 'warn',
            'jsx-a11y/no-autofocus': 'warn',
            'jsx-a11y/no-distracting-elements': 'warn',
            'jsx-a11y/no-interactive-element-to-noninteractive-role': 'warn',
            'jsx-a11y/no-noninteractive-element-interactions': [
              'warn',
              {
                body: [ 'onError', 'onLoad' ],
                iframe: [ 'onError', 'onLoad' ],
                img: [ 'onError', 'onLoad' ]
              }
            ],
            'jsx-a11y/no-noninteractive-element-to-interactive-role': 'warn',
            'jsx-a11y/no-noninteractive-tabindex': 'warn',
            'jsx-a11y/no-redundant-roles': 'warn',
            'jsx-a11y/no-static-element-interactions': 'warn',
            'jsx-a11y/role-has-required-aria-props': 'warn',
            'jsx-a11y/role-supports-aria-props': 'warn',
            'jsx-a11y/scope': 'warn',
            'jsx-a11y/tabindex-no-positive': 'warn'
          }
        }
      },
      run: [Function: bound run] AsyncFunction
    },
    DefinePlugin { definitions: { GATSBY___IMAGE: true } }
  ],
  devtool: 'eval-cheap-module-source-map',
  performance: { hints: false },
  mode: 'development',
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
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: false,
        defaultVendors: false,
        framework: {
          chunks: 'all',
          name: 'framework',
          test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types)[\\/]/,
          priority: 40,
          enforce: true
        },
        styles: {
          test: [Function: test],
          name: 'commons',
          priority: 40,
          enforce: true
        }
      }
    },
    minimize: false
  },
  externals: { 'socket.io-client': 'io' },
  cache: {
    type: 'filesystem',
    name: 'develop',
    cacheLocation: '/Users/danielpettersson/Local sites.nosync/recipe-musikproduktion/.cache/webpack/stage-develop',
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