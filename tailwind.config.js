/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";
export const darkMode = ["class"];
export const content = ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"];
export const theme = {
	extend: {
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)'
		},
		colors: {}
	}
};

export const plugins = [tailwindcssAnimate];

