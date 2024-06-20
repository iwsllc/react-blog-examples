import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import promisePlugin from 'eslint-plugin-promise'
import reactPlugin from 'eslint-plugin-react'
import stylistic from '@stylistic/eslint-plugin'
import nodePlugin from 'eslint-plugin-n'
import globals from 'globals'

const monoRepoPackages = [
	'@potatoes/lib-main',
	'@potatoes/lib-ui'
]

const monoRepoNodeProjects = [
	'apps/app',
	'packages/lib-main'
]

export default [
	...tseslint.config(
		{
			ignores: ['**/node_modules/*', '**/dist/'] // global ignore with single ignore key
		},
		// all projects:
		eslint.configs.recommended,
		...tseslint.configs.recommended,
		{
			files: ['**/*.js', '**/*.jsx', '**/*.cjs'],
			rules: {
				'@typescript-eslint/no-var-requires': 'off'
			}
		},
		{
			plugins: {
				'promise': promisePlugin,
				'@stylistic': stylistic,
				'react': reactPlugin
			},
			languageOptions: {
				ecmaVersion: 2023,
				globals: {
					...globals.browser,
					...globals.node,
					...globals.es2023
				}
			},
			rules: {
				...promisePlugin.configs.recommended.rules,
				...stylistic.configs['recommended-flat'].rules,
				...reactPlugin.configs.recommended.rules,
				...reactPlugin.configs['jsx-runtime'].rules,

				// custom rules here

				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/no-unused-vars': ['error', {
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_'
				}],
				'@stylistic/no-tabs': ['error', { allowIndentationTabs: true }],
				'@stylistic/indent': ['error', 'tab'],
				'@stylistic/jsx-indent': ['error', 'tab'],
				'@stylistic/jsx-indent-props': ['error', 'tab'],
				'@stylistic/comma-dangle': ['error', 'never']
			},

			settings: {
				react: {
					version: 'detect' // You can add this if you get a warning about the React version when you lint
				}
			}
		},
		{
		// node rules
			files: monoRepoNodeProjects.map(path => `${path}/**/*`),
			// files: [],

			plugins: {
				n: nodePlugin
			},

			rules: {
				...nodePlugin.configs['flat/recommended'].rules,

				// custom

				'n/no-extraneous-import': ['error', {
					allowModules: [...monoRepoPackages]
				}]
			}
		}
	)
]
