const path = require('path');

module.exports = {
	entry: './src/index.js',
	target: 'node',
	output: {
		filename: 'bundled.js',
		path: path.resolve(__dirname, 'dist'),
		library: 'react-props-playground',
		libraryTarget: 'umd',
		umdNamedDefine: true,
		globalObject: "typeof self !== 'undefined' ? self : this",
	},
	resolve: {
		extensions: ['.mjs', '.web.js', '.js', '.json', '.web.jsx', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.svg$/,
				use: ['@svgr/webpack', 'url-loader'],
			},
		],
	},
};
