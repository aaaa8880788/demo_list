const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: path.resolve(__dirname, "../main"),
	output: {
		filename: '[name]-[contentHash].js',
		path: path.resolve(__dirname, "../dist"),
	},
	module: {
		rules: [
			{
        test: /\.js$/, // 只有js文件会走这个规则
        exclude: /node_modules/,
        use: ['babel-loader']
      },
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: ['babel-loader',],
			},
			{
				test: /\.(png|PNG|jpg|JPG|bmp|BMP|GIF|gif)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 13000
						}
					}
				]
			}, 
			// {
			// 	test: /\.(svg|SVG)$/,
			// 	type: "asset/resource" // 对标到 file-loader
			// 	// type: "asset/source" // 对标到 raw-loader
			// }
		],
	},
	resolve: {
		extensions: [".js", ".jsx"],
		alias: {
			"@": path.resolve(__dirname, "../src")
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的文件名，其实默认就是index.html
      template: path.resolve(__dirname, '../public/index.html') // 引用的模板文件地址
    }) // 使用HTMLWebpackPlugin
	],
};
