const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'simple-pug-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', //3. Injects css into the DOM
          'css-loader', //2. Turns css into js
          'sass-loader' //1. Turns sass into css
        ]
      },
    ]
  },
  devServer: {
    hot: true,
    liveReload: true,
    open: 'Google Chrome'
  },
  plugins: [
    new LiveReloadPlugin({  // LiveReloadPlugin is necessary in order to fix live reloading on the dev side
      appendScriptTag: true
    }),
    new HtmlWebpackPlugin({
      template: './src/index.pug'
    })
  ]
});
