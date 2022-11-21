// vite.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		globals: true,
		mockReset: true,
		environment: 'jsdom',
		setupFiles: ['./setupTests.js']
	}
})
