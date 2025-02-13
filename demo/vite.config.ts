/// <reference types="vitest" />
// import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => ({
	plugins: [react()],
	build: {
		minify: mode === 'production',
		sourcemap: mode !== 'production',
		emptyOutDir: true,
		outDir: './dist'
	},
	server: {
		host: '0.0.0.0',
		port: 3000,
		strictPort: true,
		allowedHosts: ['localhost']
	},
	test: {
		globals: true,
		mockReset: true,
		environment: 'jsdom',
		setupFiles: ['./setupTests']
	}
}))
