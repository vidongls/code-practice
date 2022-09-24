/** @type {import('tailwindcss').Config} */
const baseColor = require("tailwindcss/colors");
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
	theme: {
		extend: {
			colors: {
				...baseColor,
				blue: {
					50: "#2db7f5",
					100: "#57a3f3",
					200: "#2d8cf0",
				},
				sand: {
					50: "#FFFAE7",
				},
			},
		},
	},
	plugins: [],
};

