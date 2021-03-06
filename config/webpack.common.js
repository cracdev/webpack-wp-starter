// common webpack configuration file
// the exports object is share between dev and prod builds.
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// function to return custom theme path
const themePath = (folder = '') => path.join(__dirname, '../wp-content/themes/starter/assets',  folder);

module.exports = {
	node: {
		fs: 'empty'
  },
  // entry point of our app
  entry: {
    app: themePath(`/js/app.js`)
  },
	output: {
    filename: '[name].js',
		path: themePath('/dist')
	},
	plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    // removes dist folder for us
		new CleanWebpackPlugin('dist')
	],
	module: {
    rules: [
      {
        // allows us to use imports and all the es6 stuff
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        include: themePath(`/js`),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              require('@babel/plugin-proposal-object-rest-spread').default,
              require('@babel/plugin-transform-block-scoping').default,
              require('@babel/plugin-transform-classes').default
            ]
          }
        }
      },

      {
        // return a DataURL if the file is smaller than a byte limit.
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        exclude: /node_modules/,
        use: [
          { loader: 'url-loader', options: { limit: 8192 } },
        ]
      }
    ]
  }
};
