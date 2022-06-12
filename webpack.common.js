const path = require('path');
//const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
    vendor: './src/vendor.js'
  },
  //plugins: [
  //  new HtmlWebpackPlugin({
  //    template: './src/index.pug'
  //  })
  //],
  module: {
    rules: [
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        type: 'asset/resource',
        generator: {
         filename: 'images/[hash][ext][query]',
       }
        //use: {
        //  options: {
        //    name: '[name].[hash].[ext]',
        //    outputPath: 'img'
        //  }
        //}
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        }
      }
    ]
  }
};
