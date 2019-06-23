const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.base');
const ClearWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");  //压缩css
const path = require('path');

const __RootPath = path.resolve('./');

module.exports = merge(commonConfig,{
  mode: 'production',
  output: {
    path: path.resolve(__RootPath,'dist'),
    publicPath: '/',
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].chunk.js',
  },
  devtool: false,
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        styles: {
          name: 'style',
          test: /\.(sc|le|sa|c)ss$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    runtimeChunk: 'single',
    minimizer: [
      new UglifyJsPlugin({  //压缩js
        exclude: /\.min\.js$/,  //排除.min.js文件
        cache: true,
        parallel: true,   //开启并行压缩
        sourceMap: false,
        extractComments: false,   //移除注释
        uglifyOptions: {
          compress: {
            unused: true,
            warnings: false,
            drop_debugger: true
          },
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({   //压缩css
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          safe: true,
          autoprefixer: {disable: true},
          mergeLonghand: false,
          discardComments: {
            removeAll: true, //移除注释
          }
        },
        canPrint: true
      })
    ]
  },
  plugins: [
    new ClearWebpackPlugin(['dist'],{root:__RootPath}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[chunkhash].css"  //抽离css
    }),
    new webpack.HashedModuleIdsPlugin(),
  ]
});