import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
		fontFamily: {
		  poppins: ["Poppins", "sans-serif"],
		  roboto: ["Roboto", "sans-serif"],
		  mochiy: ["Mochiy Pop One", "sans-serif"],
		  pacifico: ["Pacifico", "cursive"],
		},
		colors: {
		  mycolor: {
			100: "#5FB0CE",
			200: "#1F466F",
			300: "#364149",
			400: "#0D0D11",
			500: "#3E4548",
			600: "#323B44",
			700: "#ffffff",
			800: "#F8DE22",
			900: "#FFD966"
		  },
		},
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
		},
	  },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
