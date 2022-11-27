import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import commonjs from '@rollup/plugin-commonjs'

export default {
	external: [
		'react',
		'react-dom'
	],
	input: ['src/index.js'],
	output: {
		dir: './dist',
		format: 'es',
		preserveModules: true,
		preserveModulesRoot: 'src'
	},
	plugins: [
		resolve({
			extensions: ['.js', '.jsx', '.css']
		}),
		peerDepsExternal(),
		babel({
			exclude: 'node_modules/**',
			babelHelpers: 'bundled',
			presets: ['@babel/env', '@babel/preset-react']
		}),
		commonjs()
	]
}
