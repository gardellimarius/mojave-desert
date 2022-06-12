const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.pug",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      }),
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CleanWebpackPlugin()
  ],
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
          MiniCssExtractPlugin.loader, //3. Creates separate CSS file
          'css-loader', //2. Turns css into js
          'sass-loader' //1. Turns sass into css
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          // Using file-loader will create another set of images and will link to the wrong images
          // As of Webpack 5.0, this can be handled without installing a loader at all. So file-loader, url-loader, raw-loader, etc. are now obsolete.
          // https://stackoverflow.com/questions/69147962/file-loader-creating-2-images-and-linking-the-wrong-one
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
});
