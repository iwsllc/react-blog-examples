/// <reference types="webpack/module" />

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('node:path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const OUTPUT_DIR = path.join(__dirname, './dist')

function transformSharedToDefine(shared) {
	const result = {}
	Object.keys(shared).forEach((k) => {
		const v = shared[k]
		result[`process.env.${k}`] = JSON.stringify(v)
	})
	return result
}

function buildConfig(argv) {
	const mode = argv.mode || 'development'
	const prodMode = mode === 'production'
	const CI = process.env.CI === 'true' || false

	const sharedEnv = {
		VERSION: require('./package.json').version,
		VERSION_HASH: process.env.GITHUB_SHA?.substring(0, 7),
		REACT_APP_ASSETS_HOST: process.env.REACT_APP_ASSETS_HOST,
		REACT_APP_API_HOST: process.env.REACT_APP_API_HOST,
		REACT_APP_PUBLIC_HOST: process.env.REACT_APP_PUBLIC_HOST ?? '/',
		STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY
	}

	let devtool, plugins = [], sourceMapLoader
	if (!prodMode) {
		devtool = 'source-map'
		sourceMapLoader = {
			test: /\.(m|c|t){0,1}jsx{0,1}$/,
			enforce: 'pre',
			use: ['source-map-loader']
		}
	}
	else {
		if (!CI) { // no bundle analyzer for a CI build
			plugins = [new BundleAnalyzerPlugin({
				openAnalyzer: false,
				analyzerMode: 'static'
			})]
		}
	}

	const config = {
		entry: {
			app: './src/index'
		},
		mode,
		...({ devtool }),
		optimization: {
			minimize: prodMode,
			usedExports: true,
			minimizer: [new TerserPlugin()],
			splitChunks: { chunks: 'all' }
		},
		devServer: {
			historyApiFallback: {
				rewrites: [
					{ from: /^\//, to: '/index.html' }
				]
			},
			host: '0.0.0.0',
			static: [
				{ directory: path.join(__dirname, 'public') },
				{ directory: path.join(__dirname, 'dist/content'), publicPath: '/content' }
			],
			compress: true,
			port: process.env.PORT || 3000
		},
		module: {
			rules: [
				{
					test: /\.(t|mt|ct)sx{0,1}?$/,
					exclude: /node_modules/,
					use: {
						loader: 'ts-loader',
						options: {
							configFile: 'tsconfig.build.json',
							projectReferences: true
						}
					}
				},
				{
					test: /\.css$/i,
					use: [
						prodMode ? MiniCssExtractPlugin.loader : 'style-loader',
						'css-loader',
						'postcss-loader'
					]
				}
			]
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.jsx', '.js', '.json', '.cjs', '.mjs', '.mts', '.cts'],
			extensionAlias: {
				'.js': ['.js', '.ts', '.tsx'],
				'.cjs': ['.cjs', '.cts', '.ctsx'],
				'.mjs': ['.mjs', '.mts', '.mtsx']
			}
		},
		plugins: [
			...plugins,
			new MiniCssExtractPlugin(),
			new HtmlWebpackPlugin({
				filename: 'index.html', // output file name
				template: path.join(__dirname, './src/index.html'),
				templateParameters: sharedEnv,
				hash: true,
				chunks: ['app']
			}),
			new webpack.DefinePlugin(transformSharedToDefine(sharedEnv))
		],
		output: {
			filename: '[name]-[chunkhash].js',
			path: OUTPUT_DIR,
			publicPath: '/'
		}
	}
	if (sourceMapLoader) config.module.rules.push(sourceMapLoader)
	return config
}

module.exports = (env, argv) => {
	return buildConfig(argv)
}
