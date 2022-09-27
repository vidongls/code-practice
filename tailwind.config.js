/** @type {import('tailwindcss').Config} */
const baseColor = require("tailwindcss/colors");
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
	theme: {
		extend: {
			colors: {
				...baseColor,
				primary: "#2d8cf0",
				secondary: "#2db7f5",
				tertiary: "#57a3f3",
			},
		},
		backgroundImage: {
			authen: "url('/src/resources/img/login.png')",
		},
		screens: {
			xs: "0",
			// => @media (max-width: 640px) { ... }

			sm: "640px",
			// => @media (min-width: 640px) { ... }

			md: "768px",
			// => @media (min-width: 768px) { ... }

			lg: "1024px",
			// => @media (min-width: 1024px) { ... }

			xl: "1280px",
			// => @media (min-width: 1280px) { ... }

			"2xl": "1536px",
			// => @media (min-width: 1536px) { ... }
		},
	},
	plugins: [],
};

