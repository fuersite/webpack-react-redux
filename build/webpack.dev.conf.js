const path = require('path');
const merge = require('webpack-merge');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.base.conf');

module.exports = merge(config, {
  mode: 'development',
  devtool: '#source-map',
  devServer: {
    contentBase: path.join(__dirname,"..", "dist"),
    compress: true,
    port: 3000,
    historyApiFallback:true,
    hot: true // 开启热更新
  },
  plugins:[
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template:path.join(__dirname,"..", "src", "index.html"), // 模板文件
      filename: 'index.html',       // 最终生成的文件名
      chunks: ['app', 'vendor']     // 引入打包js文件
  }),
  ]
});

console.log("listening localhost:3000")