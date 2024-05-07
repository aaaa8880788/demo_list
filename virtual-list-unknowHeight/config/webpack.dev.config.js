const path = require('path');
const {merge} = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin'); // 引入html-webpack-plugin
const baseConfig = require('./base.config');

module.exports = merge(baseConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1 // 主要是用来处理@import引入的css，如果不加这个，@import引入的css不会被postcss-loader处理
            }
          },
          // 这里因为 postcss.config.js 文件已经配置好,可以简写
          'postcss-loader', // 可以不加配置属性，简写了
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1 // 主要是用来处理@import引入的css，如果不加这个，@import引入的css不会被postcss-loader处理
            }
          },
          // postcss.config.js 没有的话,不能简写
          'postcss-loader', // 可以不加配置属性，简写了
          'less-loader',
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1 // 主要是用来处理@import引入的css，如果不加这个，@import引入的css不会被postcss-loader处理
            }
          },
          'postcss-loader', // 可以不加配置属性，简写了
          'sass-loader',
        ]
      }
    ]
  },
  devServer: {
    hot: true, // 是否热更新
    open: true // 是否自动打开浏览器
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html', // 生成的文件名，其实默认就是index.html
      template: path.resolve(__dirname, '../public/index.html'), // 引用的模板文件地址 
    }) // 使用HTMLWebpackPlugin
  ]
})