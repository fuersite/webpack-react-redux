const path = require('path');
const merge = require('webpack-merge');
let webpack = require('webpack');
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
  ]
});

console.log("listening localhost:3000")