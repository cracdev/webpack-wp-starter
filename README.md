# Webpack Starter for WP

## Getting Started
To get started, make sure you have [node](https://nodejs.org/) and [npm](https://www.npmjs.com/), installed locally. By searching online you can find lots of guides on getting these dependencies installed on your specific machine.

To install the node dependencies on first run, type `yarn install`
To install bower dependencies and start up gulp, type `yarn start`

## What’s Included
By taking a look at the `package.json`, `webpack.dev.js` and `webpack.prod.js` files you'll get a complete list of what's included in the theme, the following is just a brief overview.

* CSS (Sass) Compression and Minification
* JavaScript Compression and Minification
* SVG Compression and Minification
* Image Compression and Minification
* Source Mapping
* Babel

### Assets

All assets can be found in the `assets` directory. This includes CSS/Sass, JavaScript, Images, Fonts and SVGS.

The location of these assets are defined in  `webpack.**.js` and can be customized to suit your project requirements.

#### Sass Setup
Sass functions and partials can be found in the `assets/scss` directory. If you wish to add a new partial, just create it in one of the sub-folders and include it in `assets/scss/site.scss`. This file is compiled and output to `assets/css/site.css`. This is then enqueued in the theme's `functions.php` file. Vendor prefixing is automatically addressed through `webpack` and you can adjust these settings in the `webpack.**.js`.

#### JavaScript Setup
JavaScript live in the `assets/js` directory. This task will compile all JavaScript and outputs a `app.min.js` file to `assets/dist`. These files are then enqueued in the theme's `functions.php` file.

Built by [@cracdev](https://github.com/cracdev)
