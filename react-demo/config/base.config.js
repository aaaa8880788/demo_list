const path = require('path');

module.exports = {
  entry: {
    index: path.resolve(__dirname, '../index'),
  },
  output: {
    filename: '[name]-[hash].js', // 加入哈希值作文件名称
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 只有js文件会走这个规则
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
				test: /.jsx$/,
				use: [
					// 这里可以直接'babel-loader'的原因：
					// .babelrc里面已经申明了presets，如果没有则需要用下面的写法
					'babel-loader',
					// {
					// 	loader: 'babel-loader',
					// 	options: {
					// 		presets: [
					// 			'@babel/preset-env',
					// 			'@babel/preset-react'
					// 		],
					// 	},
					// },
				],
			},
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader', // 只有一个loader可以这样写
        options: { // 对loader进行配置
          limit: 8 * 1024, // 图片小于8kb，就转成base64
          esModules: false, // 因为url-loader默认用es6模块化语法去解析，而下面的html-loader引入的标签图片是commonjs规范，所以需要把url-loader关闭es6模块化语法，改用commonjs规范
          name: '[hash:10].[ext]', // 默认打包后的图片是个很长的哈希值，可以通过name进行重命名，例子是取前十位，文件格式为原格式
          outputPath: 'images' // 意思是在输出的文件夹内新建个images文件夹，把打包后的图片资源放里面。
        }
      },
      // 因为光靠url-loader，并不能对html便签src引入的文件进行解析，所以需要通过html-loader解析html文件，引入便签对应的img，才能被url-loader处理
      {
        test: /\.html$/,
        loader: 'html-loader' 
      }
    ]
  },
  resolve: { // 声明自动解析 `.ts` 后缀文件，这意味着代码如 `import "./a.ts"` 可以忽略后缀声明，简化为 `import "./a"` 文件
    extensions: ['.ts', '.js', '.jsx'],
    alias: {
      "@":path.resolve(__dirname, "../src") 
    }
  },
  plugins: [
  ]
}