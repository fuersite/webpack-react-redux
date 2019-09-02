# webpack-react-redux
webpack4 create react App

------

# 开始搭建脚手架

### 1. 初始化项目
npm init 

### 2. 安装webpack webpack-cli
npm i -D webpack webpack-cli

### 3. 创建build文件夹放置webpack配置文件
- webpack.base.conf.js
- webpack.dev.conf.js
- webpack.test.conf.js
- webpack.prod.conf.js

### 4. 创建src文件夹并添加main.js、index.html文件
- 创建main.js      // 作为入口文件
- 初始化index.html   // 作为模板文件

### 5. 配置Html模板

```
npm i html-webpack-plugin -D
```

### 6. 初始webpack.base.config.js配置

```
'use strict'

const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

function assetsPath (_path) {
    const assetsSubDirectory = 'static'
    return path.posix.join(assetsSubDirectory, _path)
}

const webpackConfig  = {
    entry: {                 // 入口文件
        app: './src/main.js'
    },
    output: {               // 出口文件
        path: resolve('dist'),
        publicPath: '/',
        filename: assetsPath('js/[name].[chunkhash].js'),  // 公共js文件
        chunkFilename: assetsPath('js/[id].[chunkhash].js') // 模块js文件
    },
    plugins: [               // 插件模块
        new HtmlWebpackPlugin({
            template: './src/index.html', // 模板文件
            filename: 'index.html',       // 最终生成的文件名
            chunks: ['app']               // 对应入口文件app打包的js 
        }),
    ],           
    module: {},              // 处理对应模块
}

module.exports = webpackConfig
```

### 7. 初始运行webpack打包测试
往package.json 添加命令

```
"scripts": {
    "test": "webpack --inline --progress --config build/webpack.base.conf.js"
},
```

```
npm run test

结果：打包成功，当前目录下生成dist文件夹
```

### 8. 使用Babel会将ES6的代码转成ES5的代码

```
当前babel-loader8.x,比较新后续一些插件要与之配合安装。
npm i -D @babel-core babel-loader @babel/preset-env
```

### 9.  webpack.base.conf.js添加babel-loader配置

```
module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')] // 指定转换模块
        },
    ]
},

现在可以在main.js 中使用es6语法了             
```

### 10. webpack.base.conf.js 添加mode属性
详情查看-[webpack mode 文档](https://www.webpackjs.com/concepts/mode/)

```
mode: 'development'    
```

### 11. 引入 @babel/polyfill

```
npm i -S @babel/polyfill
```

> Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码，必须使用babel-polyfill来转换。


webpack.base.conf.js配置

```
entry: {
    app: ['@babel/polyfill','./src/main.js']
},
```

### 12. 转换react语法使用babel-preset-react插件

```
npm i -D @babel/preset-react
```

### 13. 添加配置.babelrc在项目根目录下

```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false,
        "targets": {
          "browsers": ["> 1%", "last 2 versions", "not ie <= 8"],
        },
        "useBuiltIns": "entry"
      }
    ],
    ["@babel/react"]
  ],
  "plugins": []
}

```


### 打包css, less 当然你也可以使用(sass)

```
npm i style-loader css-loader less less-loader -D
```

### 使用mini-css-extract-plugin 提取js|jsx中css

```
npm i -D mini-css-extract-plugin
```

webpack.base.conf.js配置信息

```
plugins: [              
    new ExtractTextPlugin({
        filename: assetsPath('css/[name].[contenthash].css'),
        chunkFilename: assetsPath('css/[id].css'),
    }),
],          
```

### 打包引用的多媒体文件

```
npm i file-loader url-loader -D
```

webpack.base.conf.js配置

```
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
```

### 添加css3前缀

```
npm i postcss-loader autoprefixer -D
```

webpack.base.conf.js

```
{
    test: /\.less$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader','postcss-loader', 'less-loader']  // 从右往左解析
},
{
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
}
```

根目录下添加 postcss.config.js 配置如下:
```
module.exports = {
  plugins:[
    require('autoprefixer')({
      browsers: [
        'last 10 versions',
        'Firefox >= 20',
        'Android >= 4.0',
        'iOS >= 8'
      ]
    })
  ]
}

```


### resolve设置

webpack.base.conf.js配置

```
resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.less'], // 省略后缀名
    alias: {   
        '@': resolve('src'),    // 设置别名
    }
},
```

### 提取公共代码
webpack4之前使用 内置CommonsChunkPlugin, 4之后使用 optimization.splitChunks
 
webpack.base.conf.js配置
```
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

另外这里添加vendor
new HtmlWebpackPlugin({
    template: './src/index.html', // 模板文件
    filename: 'index.html',       // 最终生成的文件名
    chunks: ['app', 'vendor']     // 引入打包js文件
}),
```

### 清除上次编译dist包

```
npm i clean-webpack-plugin -D
```

webpack.base.conf.js

```
let CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

module.exports = {s
    plugins: [
        new CleanWebpackPlugin()  
    ]
}
```


### 编写webpack.dev.conf.js 开启webpack-dev-server 本地web服务器和热更新方便本地开发调试

```
npm install webpack-dev-server --save-dev
```

webpack.dev.conf.js

```
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
    new webpack.HotModuleReplacementPlugin()
  ]
});

```

package.json 添加 script

```
 "scripts": {
    "test": "webpack --inline --progress --config build/webpack.base.conf.js",
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js"
  },
```

执行 npm run dev , 访问localhost:3000


### 开始编写react应用代码了

```
npm i -S react react-dom react-router-dom
```

### 编写路由文件 src/routes/index.js

```
import React from 'react';
import {BrowserRouter,Route,Switch } from 'react-router-dom'

import Index from '@/views/index'
import Home from '@/views/home'

export default class Router extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Index}></Route>
                    <Route path="/home" component={Home}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}
```


### 编写组件 src/views/index.jsx

```
import React from 'react'

export default class Index extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
          <h1>Hi React</h1>
      </div>
    );
  }
}
```

### src/main.js

```
import React from 'react';
import ReactDOM from 'react-dom';
import Router from '@/routes/index'; //路由配置

ReactDOM.render(
    <Router/>,
    document.getElementById('app')
);

```

执行 npm run dev , 访问localhost:3000/index ,localhost:3000/home


### redux 使用

```
npm i -S  redux react-redux
```

### 建立store文件夹(src/store)，并添加一下文件

1. store/states.js

```
export const states = {
    count: 1,
}

```

2. store/actions.js

```
export const ADD_COUNT = 'ADD_COUNT'
export const SUB_COUNT = 'SUB_COUNT'

export function addCount(params) {
    return { type: ADD_COUNT, params }
}
  
export function subCount(params) {
    return { type: SUB_COUNT, params }
}
```

3. store/reducers.js

```
import { combineReducers } from 'redux'
import {
  ADD_COUNT,
  SUB_COUNT,
} from './actions'

function count(state = 0, action) {
  switch (action.type) {
    case ADD_COUNT:
        state++
        console.log(state)
        return state
    case SUB_COUNT:
        state++
        return {}
  default:
    return state
  }
}

const reducers = combineReducers({
  count
})

export default reducers

```

4. store/index.js

```
import { createStore } from 'redux'
import reducers from './reducers'
import {states} from './states'
let store = createStore(reducers,states)
export default store

```


### 调整/views/index.jsx,main.js

main.js

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux'
import Router from '@/routes/index'; //路由配置
import store from '@/store/index'

ReactDOM.render(
    <Provider store={store}>  // 所以组件内能够访问store
        <Router/>
    </Provider>,
    document.getElementById('app')
);
```


views/index.jsx

```
import React from 'react'
import { addCount, subCount} from '@/store/actions';
import { Provider, connect } from 'react-redux'
import store from '@/store/index'

export default class Index extends React.Component{
  constructor(props){
    super(props);
    this.addCount = addCount
  }
  render(){
    return (
      <div>
          <h1>Hi React</h1>
          <div><span>count:</span>{store.getState().count}<span></span></div>
          <button onClick={() =>store.dispatch(addCount(1))}>增加</button>
      </div>
    );
  }
}
```
在组件内容可以直接调用store对象及其方法属性


### 组件内可以访问store方法和属性，但是state值改变了我们需要重新render，数据才会更新。那么就做一个state跟组件props数据的映射。

调整 views/index.jsx

```
import React from 'react'
import { addCount, subCount} from '@/store/actions';
import { Provider, connect } from 'react-redux'
import store from '@/store/index'

class Index extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const {count , addCount, subCount } = this.props
    return (
      <div>
          <h1>Hi React</h1>
          <div><span>count:</span><span>{count}</span></div>
          <button onClick={()=> addCount(1)}>增加</button>
      </div>
    );
  }
}

// 建立state映射
const mapStateToProps = (state) => {
  return {
    count: state.count,
  }
}

// 建立action映射
const mapDispatchToProps = (dispatch) => {
  return {
    addCount: (params)=> {
      dispatch(addCount(params))
    },
    subCount:(params)=> {
      dispatch(subCount(params))
    },
  }
}

// 关键在于connect
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)

```