const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./base.config");

module.exports = merge(baseConfig, {
	mode: "production",
	module: {
		rules: [
			{
				test: /.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
						},
					},
					"postcss-loader",
				],
			},
			{
				test: /.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
						},
					},
					"postcss-loader",
					"less-loader",
				],
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader, 
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
						},
					},
					"postcss-loader",
					"sass-loader"
				],
			},
		],
	},
	plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html', // 生成的文件名，其实默认就是index.html
      template: path.resolve(__dirname, '../public/index.html'), // 引用的模板文件地址 
    }) // 使用HTMLWebpackPlugin
  ]
});
