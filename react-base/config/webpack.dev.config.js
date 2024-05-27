const path = require("path");
const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
	mode: "development",
	devtool: "eval",
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
              importLoaders: 2 // 主要是用来处理@import引入的css，如果不加这个，@import引入的css不会被postcss-loader处理
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
              importLoaders: 2
            }
          },
					'postcss-loader',
					'sass-loader',
				]
			}
		],
	},
	// 应用资源提供方必须以 http(s) 形式提供服务
	// 所以这里需要使用 devServer 提供 http(s) server 能力
	devServer: {
		port: 8081,
		hot: true,
	},
}) 
