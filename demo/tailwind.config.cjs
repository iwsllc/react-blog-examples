/** @type {import('tailwindcss').Config} */

module.exports = {
	plugins: [require('@tailwindcss/typography')()],
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
		'../package/src/**/*.{js,jsx,ts,tsx}',
		'./src/index.html',
		'../../node_modules/@iwsio/forms/dist/**/*.{jsx,js,tsx,ts}'
	]
}
