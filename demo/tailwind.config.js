module.exports = {
	mode: 'jit',
	content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html', '../package/src/**/*.{jsx,js}'],
	theme: {
		extend: {}
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')]
}
