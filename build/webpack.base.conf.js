'use strict'

const path = require('path');
const webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

function assetsPath (_path) {
    const assetsSubDirectory = 'static'
    return path.posix.join(assetsSubDirectory, _path)
}

const webpackConfig  = {
    entry: {                 // 入口文件
        app: ['@babel/polyfill','./src/main.js']
    },
    output: {               // 出口文件
        path: resolve('dist'),
        publicPath: '/',
        filename: assetsPath('js/[name].[chunkhash].js'),  // 公共js文件
        chunkFilename: assetsPath('js/[id].[chunkhash].js') // 模块js文件
    },
    mode: 'development',
    devtool: process.env.NODE_ENV == 'development'? 'inline-source-map': false, 
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')] // 指定转换模块
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader','postcss-loader', 'less-loader']  // 从右往左解析
                
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                include: [resolve('src'), resolve('static')],
                options: {
                    limit: 10000, // 8k以下打包成base64
                    name: assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                include: [resolve('src'), resolve('static')],
                options: {
                    limit: 10000,
                    name: assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css', '.less'], // 省略后缀名
        alias: {   
          '@': resolve('src'),    // 设置别名
        }
    },
    optimization: {
        splitChunks: {
          chunks: 'all',//默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
          minSize: 30000,//合并前模块文件的体积
          minChunks: 1,//最少被引用次数
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',//自动命名连接符
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              chunks: 'initial',
              name: 'vendor',  
              priority: 10
            },
            default: false,
            runtimeChunk:{
                name:'manifest'
              }
          },
        }
    },
    plugins: [               // 插件模块
        new HtmlWebpackPlugin({
            template: './src/index.html', // 模板文件
            filename: 'index.html',       // 最终生成的文件名
            chunks: ['app', 'vendor']     // 引入打包js文件
        }),
        new MiniCssExtractPlugin({
            filename: assetsPath('css/[name].[contenthash].css'),
            chunkFilename: assetsPath('css/[id].css'),
        })
    ],               
}

module.exports = webpackConfig