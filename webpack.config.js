const path = require('path');
const TerserPlugin = require('terser-webpack-plugin')
const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProduction = process.env.NODE_ENV === 'production';
const isProductionUnminified = process.env.NODE_ENV === 'production-unminified';

const outputDir = isProductionUnminified ? 'assets/unminified/js' : 'assets/js';

module.exports = {
	...defaultConfig,
	entry: {
		'adminpage': './src/admin/main.jsx'
	},
	output: {
		path: path.resolve(__dirname, outputDir),
		filename: isProductionUnminified ? '[name].js' : '[name].min.js',
		assetModuleFilename: 'images/[name][ext][query]',
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	devServer:{
		devMiddleware: {
			writeToDisk: true,
		},
		allowedHosts: 'auto',
		host: 'localhost',
		port: 8901,
		proxy: {
			'/build': {
				pathRewrite: {
					'^/build': '',
				},
			},
		},
	},
	plugins: [
        ...defaultConfig.plugins,
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: isProductionUnminified ? '../css/[name].css' : '../css/[name].min.css',
		}),
	],
	optimization: {
        minimize: isProduction,
        minimizer: isProduction
            ? [
                new TerserPlugin({
                    terserOptions: {
                        format: {
                            comments: false,
                        },
                    },
                    extractComments: false,
                }),
            ]
            : [],
    },
};