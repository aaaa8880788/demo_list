const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
	mode: "production",
	devtool: false,
	module: {
		rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
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
          MiniCssExtractPlugin.loader,
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
					MiniCssExtractPlugin.loader,
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
	plugins: [
		new MiniCssExtractPlugin({
      filename:'index.css',
    }),
	],
}) 
