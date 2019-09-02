'use strict'

let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
let env = {
    NODE_ENV: 'development'
}
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
        filename: assetsPath('js/[name].[hash].js'),  // 主文件js文件
        chunkFilename: assetsPath('js/[name].[hash].js') // chunk模块js文件
    },
    mode: 'development',
    devtool: env.NODE_ENV == 'development'? 'inline-source-map': false, 
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
        minimize: env.NODE_ENV == 'production'? true : false,
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
                default: false
            },
        },
        runtimeChunk: {
            name: 'manifest'
        }
    },
    plugins: [               // 插件模块
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html', // 模板文件
            filename: 'index.html',       // 最终生成的文件名
            chunks: ['app', 'vendor', 'manifest'],     // 引入打包js文件
            minify:{ //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:true    //删除空白符与换行符
            }
        }),
        new MiniCssExtractPlugin({
            filename: assetsPath('css/[name].[contenthash].css'),
            chunkFilename: assetsPath('css/[id].css'),
        })
    ],               
}

module.exports = webpackConfig