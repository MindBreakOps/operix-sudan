/** @type {import('tailwindcss').Config} */
export default {
  content: [
	"./index.html",
	"./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
	extend: {
	  colors: {
		// Royal Dark Black Palette (Strictly no navy)
		royal: {
		  black: '#000000',      // Pure black
		  dark: '#050505',       // Deepest off-black
		  base: '#0a0a0a',       // Royal dark background
		  surface: '#141414',    // Card/Surface backgrounds
		  border: '#262626',     // Subtle borders
		},
		// Accents maintained from your Next.js components
		brand: {
		  yellow: '#eab308',     // Yellow-500
		  amber: '#fbbf24',      // Amber-400
		}
	  },
	  animation: {
		marquee: 'marquee 25s linear infinite',
	  },
	  keyframes: {
		marquee: {
		  '0%': { transform: 'translateX(0%)' },
		  '100%': { transform: 'translateX(-100%)' },
		},
	  },
	},
  },
  plugins: [],
}