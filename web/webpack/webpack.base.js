const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//获取当前工作目录
const __RootPath = path.resolve('./');

module.exports = {
  entry: {
    app: ['babel-polyfill',path.join(__RootPath,'src/index.js')]
  },
  resolve: {
    alias: {
      "@": path.join(__RootPath, 'src'),
      "@assets": path.join(__RootPath, 'src/assets'),
      "jquery": "jquery"
    },
    // 约定省略后缀
    extensions: [".js", '.jsx', ".json", '.less'],
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        loader: "babel-loader?cacheDirectory",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['url-loader?limit=1024&name=images/[name].[ext]']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: ['url-loader?limit=1024&name=fonts/[name].[ext]']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__RootPath,'index.html')
    }),
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ]
}