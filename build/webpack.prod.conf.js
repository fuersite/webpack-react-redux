'use strict'
const path = require('path')
const merge = require('webpack-merge')
let webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
let env = {
  NODE_ENV: 'production'
}
const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'async',//默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
      minSize: 30000,//合并前模块文件的体积
      minChunks: 1,//最少被引用次数
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',//自动命名连接符
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendor',  
          priority: 10
        },
        default: {
          chunks: 'async',
          test: /[\\/]src[\\/]js[\\/]/,
          minChunks: 2,  //一般为非第三方公共模块
          priority: -20,
          reuseExistingChunk: true
        }
      },
    }
  },
  plugins: [
      // js 混淆 不用webpack自带，js会很大
      new UglifyJsPlugin({
        uglifyOptions: {
          comments: false,
          compress: {
            warnings: false,
            drop_console: true
          }
        },
        sourceMap: false,
        parallel: true
      }),
      // css 压缩
      new OptimizeCSSPlugin({
        cssProcessorOptions: false
          ? { safe: true, map: { inline: false } }
          : { safe: true }
      }),

      // copy static
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../static'),
          to: 'static',
          ignore: ['.*']
        }
      ]),

      // gzip压缩生成gz文件，需要进行Nginx配置开启
      new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' +
          ['js','jsx','css'].join('|') +
          ')$'
        ),
        threshold: 10240,
        minRatio: 0.8
      })
  ]
})

module.exports = webpackConfig
