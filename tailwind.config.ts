import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Cormorant Garamond', 'serif'],
        'body': ['Montserrat', 'sans-serif'],
        'accent': ['Playfair Display', 'serif'],
      },
      colors: {
        'noir': {
          DEFAULT: '#1a1a1a',
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#2d2d2d',
          900: '#1a1a1a',
        },
        'blanc': {
          DEFAULT: '#fafaf9',
          50: '#ffffff',
          100: '#fafaf9',
          200: '#f5f5f4',
          300: '#e7e5e4',
          400: '#d6d3d1',
          500: '#a8a29e',
          600: '#78716c',
          700: '#57534e',
          800: '#44403c',
          900: '#292524',
        },
        'or': {
          DEFAULT: '#b8985f',
          50: '#faf8f3',
          100: '#f5f0e6',
          200: '#e8dcc4',
          300: '#dbc8a2',
          400: '#c8ad7f',
          500: '#b8985f',
          600: '#a07d45',
          700: '#7d6136',
          800: '#5a4627',
          900: '#372b18',
        },
      },
      letterSpacing: {
        'ultra-wide': '0.2em',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;