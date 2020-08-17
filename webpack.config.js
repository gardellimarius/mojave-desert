const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = function(){
  return {
    mode: 'development',
    entry: [
      './src/app.js'
    ],
    watch: true,
    watchOptions: {
      aggregateTimeout: 300, // Process all changes which happened in this time into one rebuild
      poll: 1000, // Check for changes every second,
      ignored: /node_modules/,
      // ignored: [
      //   '**/*.scss', '/node_modules/'
      // ]
    },
    devtool: 'source-maps',
    devServer: {
      contentBase: path.join(__dirname, 'src'),
      watchContentBase: true,
      host: '0.0.0.0',
      hot: true,
      open: true,
      inline: true,
      port: 9000
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack starter project',
        template: path.resolve('./src/index.pug')
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
            'style-loader',
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
                outputPath: './images',
                name: "[name].[ext]",
              },
            },
          ]
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
