// dev webpack configuration file
// share webpack.common.js configuration and adds:
// - css and js source-maps
// - webpack-dashboard (https://github.com/FormidableLabs/electron-webpack-dashboard)
// - Liverealod with BrowserSync
//   * if you are not using lando just update the [proxy] to match your server

const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ETP = require('extract-text-webpack-plugin');
// const DashboardPlugin = require('webpack-dashboard/plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

// function to return custom theme path
const themePath = (folder = '') => path.join(__dirname, '../wp-content/themes/starter/assets', folder);

module.exports = merge(common, {
  devtool: 'inline-source-map',
  module: {
    rules: [{
      // creates style nodes from JS strings
      // translates CSS into CommonJS
      // compiles Sass to CSS
      test: /\.(css|scss|sass)$/,
      loader: ETP.extract({
        fallback: 'style-loader',
        use: [
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', 
            options: { 
              sourceMap: true,
              includePaths: [
                require('path').resolve(__dirname, '../node_modules')
              ]
            } 
          }
        ]
      }),
      include: themePath('/scss')
    }]
  },
  plugins: [
    // new KssWebpackPlugin(KssConfig),
    new WebpackNotifierPlugin(
      { excludeWarnings: true, skipFirstNotification: true }
    ),
    // new DashboardPlugin(),
    new ETP({
      filename: 'site.css',
      disable: false,
      allChunks: true
    }),
    new BrowserSyncPlugin({
      notify: false,
      host: '127.0.0.1',
      port: 8100, // this is the port you develop on. Can be anything.
      logLevel: 'info',
      files: [
        'wp-content/themes/**/*.php',
        'wp-content/themes/**/*.twig'
      ],
      proxy: 'http://smartboard.lndo.site', // This must match Lando, WAMP, MAMP, etc.
    })
  ]
});
