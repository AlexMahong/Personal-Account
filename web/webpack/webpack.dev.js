const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.base');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const __RootPath = path.resolve('./');

module.exports = merge(commonConfig,{
  mode: 'development',
  output: {
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].chunk.js',
    publicPath: '/'
  },
  devtool: 'eval-source-map',
  devServer:{
    hot: true,
    inline: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css"  //抽离css
    }),
  ]
})