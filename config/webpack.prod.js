// prod webpack configuration file 
// share webpack.common.js configuration and adds:
// - source map original source (lines only)
// - extract scss => css => site.css

const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const autoprefixer = require('autoprefixer');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// function to return custom theme path
const themePath = (folder = '') => path.join(__dirname, '../wp-content/themes/starter/assets', folder);

module.exports = merge(common, {
  module: {
    rules: [
      {
        // will generate a single css file for all .scss
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          // if any error occurs will fallback to inline styles
          fallback: 'style-loader',
          use: [
            // loaders will pipe content through from the bottom to the top
            // i.e. css-loader(postcss-loader(sass-loader()))
            { 
              loader: 'css-loader', 
              options: { 
                discardComments: {
                  removeAll: true
                }
              } 
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer]
              }
            },
            { 
              loader: 'sass-loader', 
              options: { 
                sourceMap: false,
                outputStyle: 'compressed',
                includePaths: [
                  require('path').resolve(__dirname, '../node_modules')
                ]
              }
            }
          ]
        }),
        include: themePath('/scss')
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin({ 
      filename: 'site.css', 
      disable: false, 
      allChunks: true
    }),
    new UglifyJSPlugin()
  ]
});
