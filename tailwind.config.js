/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'node_modules/preline/dist/*.js',
	],
	theme: {
		extend: {
			fontFamily: {
				playfair: ['Playfair Display', 'serif'],
				sans: ['Open Sans', 'sans-serif'],
				lobster: ['Lobster', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif'],
			},
			gridTemplateColumns: {
				'sm-auto-fit': 'repeat(auto-fit,minmax(8rem,1fr))',
				'base-auto-fit': 'repeat(auto-fit,minmax(13rem,1fr))',
				'md-auto-fit': 'repeat(auto-fit,minmax(9.30rem,1fr))',
				'links-auto-fit': 'repeat(auto-fit,minmax(11rem,1fr))',
			},
			colors: {
				myWhite: '#DFE8F1',
				main: '#4B0082',
				darkerMain: '#1E1E58',
				lightMain: '#928EB9',
				lightBlue: '#8298e4',
				darkBlue: '#1F4699',
				nude: '#F0D9BD',
				darkerNude: '#DBA879',
				bInput: '#868e96',
				bCard: '#495057',
				placeholder: '#acacac',
			},
			flex: {
				flexBetItCen: 'flex justify-between items-center',
				flexColItCen: 'flex flex-col items-center',
			},
		},
	},
	plugins: [],
};
