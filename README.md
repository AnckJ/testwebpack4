# webpack 4 打包vue
 [webpack文档](https://webpack.docschina.org)

## 1、初始化项目
  npm init

## 2、安装核心包
  npm install webpack webpack-cli vue-template-compiler --save-dev
  npm install vue vue-router vuex --save

## 3、创建src目录，添加入口文件index.js和相关的vue文件
```javascript
// index.js
import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'

import './assets/css/global.styl'
import './assets/css/style.css'

export default new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
```

## 4、创建build目录，创建webpack.config.base.js
  ### 4.1 基础配置项：
    mode: 打包模式，可选值 ['development'|'production']
    entry: 入口文件
    output: 打包目录
    module.rules: 处理不同文件类型的规则
    plugins：插件
    optimization：打包优化
  ### 4.2 在package.json中添加运行命令
    "build": "webpack --config webpack.config.base.js" // 前提测试用

## 5、配置module.rules
  ### 5.1 安装需要的loader
    npm install vue-loader css-loader style-loader url-loader file-loader stylus stylus-loader --save-dev
  ### 5.2 根据不同的文件配置不同的loader，每个loader的使用方法可以查询npm
    .vue文件 vue-loader
    .css文件 css-loader style-loader
    .styl文件 stylus-loader css-loader style-loader
    图片文件 url-loader 依赖于 file-loader
  ### 5.3 npm run build 测试配置，中间一些包需要其他的依赖

## 6、配置生产环境
  生产环境下不打包出文件，实现热更新，有利于开发

  ### 6.1 配置webpack-dev-server
    安装 npm install webpack-dev-server webpack-merge --save-dev
    创建 build/webpack.config.dev.js 文件
    webpack-merge可以用来合并webpack配置参数
    devServer基本配置：
      port: String 端口
      host: String 域名
      overlay：出现编译器错误或警告时，在浏览器中全屏覆盖显示。 {
        warnings: Boolean
        errors：Boolean
      }
      hot: Boolean 开启webpack-dev-server热更新，需要配合 webpack.HotModuleReplacementPlugin
      historyApiFallback: Boolean|Object 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。
      open: Boolean 运行时，是否打开浏览器
      proxy: {} 代理
      progress: Boolean 进度输出控制台
  ### 6.2 使用 html-webpack-plugin 添加index.html模板，可使用模板引擎配置模板
  ### 6.3 在package.json中添加运行命令
    "dev": "cross-env NODE_ENV=development webpack-dev-server --config webpack.config.dev.js"
    **需要安装cross-env 来配置NODE_ENV变量**
  ### 6.4 npm run dev 测试配置

## 7、配置autoprefixer
  安装 npm install postcss postcss-loader autoprefix
    添加postcss.config.js文件，配置autoprefix
    在webpack配置样式的loader中插入postcss-loader

## 8、配置babel和jsx
  ### 8.1 安装 npm install babel-loader @babel/core babel-preset-env
    添加.babelrc文件，配置"presets": ["evn"]
  ### 8.2 安装 npm install babel-plugin-transform-vue-jsx babel-plugin-syntax-jsx
    在.babelrc中添加"plugins": ["transform-vue-jsx"]
    在webpack配置的rules添加处理jsx的配置，使用的是babel-loader

## 9、配置生产环境
  生产环境下，将文件打包，优化打包的文件。单独打包css；拆分js文件，将共用和引入的包单独打包。

  ### 9.1 使用 mini-css-extract-plugin 抽出css单独出来一个文件
  ### 9.2 webpack配置项optimization可以优化打包文件，拆分js文件，打包生成vendor和runtime的单独文件
    minimizer：
      使用 optimize-css-assets-webpack-plugin 压缩css文件
      使用 uglifyjs-webpack-plugin 压缩js(需要使用@bate版本才支持es6)
    splitChunks: 根据配置规则，拆分代码块
      chunks: 'all', 选择哪些块进行优化。
      minSize: 20000, 生成块的最小大小
      maxSize: 0,
      minChunks: 1, 拆分前必须共享模块的最小块数。
      maxAsyncRequests: 30, 按需加载时的最大并行请求数。
      maxInitialRequests: 30, 入口点的最大并行请求数。
      automaticNameDelimiter: '~', 使用块的来源和名称生成名称的定界符
      enforceSizeThreshold: 50000, 强制执行拆分的大小阈值和其他限制
      cacheGroups: 缓存组可以继承和/或覆盖splitChunks中的任何选项。
        {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
