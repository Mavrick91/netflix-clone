import type { Config } from "tailwindcss";

const config: Config = {
	mode: "jit",
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		screens: {
			sm: "576px",
			md: "768px",
			lg: "992px",
			xl: "1101px",
			"2xl": "1201px",
		},
		extend: {
			colors: {
				"primary-red": "#e50914",
				"primary-red-hover": "#c11119",
				"primary-white": "#ffffff",
				"primary-white-hover": "#ffffffb3",
			},
		},
	},
	plugins: [],
};
export default config;
