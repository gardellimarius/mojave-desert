const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');


module.exports = function(){
  return {
    mode: 'production',
    entry: [
      './src/app.js'
    ],
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin()
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Webpack starter project',
        filename: 'index.html',
        template: path.resolve('./src/index.pug')
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.pug$/,
          use: ['raw-loader', 'pug-html-loader'],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
          ]
        },
        {
         test: /\.(jpg|jpeg|gif|png|svg|webp)$/,
         use: [
           {
             loader: "file-loader",
               options: {
                   name: "[path]/[name].[ext]",
                   context: "src"
               },
           },
           {
             loader: 'image-webpack-loader',
             options: {
               bypassOnDebug: true,
               mozjpeg: {
                 progressive: false,
                 quality: 45
               },
               // optipng.enabled: false will disable optipng
               optipng: {
                 enabled: true,
               },
               pngquant: {
                 quality: [0.65, 0.90],
                 speed: 4
               },
               gifsicle: {
                 interlaced: true,
                 optimizationLevel: 3
               },
               // the webp option will enable WEBP
               webp: {
                 quality: 20
               }
             }
           },
         ],
       },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
          }
        },
      ]
    }
  };
}
