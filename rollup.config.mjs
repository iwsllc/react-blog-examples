import { babel } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

export default {
	external: [
		'react',
		'react-dom'
	],
	input: ['src/index.js', 'src/modal/index.js'],
	output: {
		dir: './dist',
		format: 'es',
		preserveModules: true,
		preserveModulesRoot: 'src'
	},
	plugins: [
		peerDepsExternal(),
		nodeResolve({
			extensions: ['.js', '.jsx', '.css']
		}),
		babel({
			exclude: 'node_modules/**',
			babelHelpers: 'bundled',
			presets: ['@babel/env', '@babel/preset-react']
		})
	]
}
