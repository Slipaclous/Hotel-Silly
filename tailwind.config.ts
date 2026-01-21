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
          DEFAULT: '#2c3840',
          50: '#f0f2f3',
          100: '#dde1e4',
          200: '#bbc3c9',
          300: '#99a5ae',
          400: '#778793',
          500: '#556978',
          600: '#445560',
          700: '#2c3840',
          800: '#1f2a30',
          900: '#121b20',
        },
        'blanc': {
          DEFAULT: '#f7f5ef',
          50: '#ffffff',
          100: '#f7f5ef',
          200: '#f0ede3',
          300: '#e8e5dd',
          400: '#ddd9cd',
          500: '#c9c4b5',
          600: '#a8a29e',
          700: '#8e8370',
          800: '#6b6558',
          900: '#4a4539',
        },
        'or': {
          DEFAULT: '#C6ad7a',
          50: '#faf8f3',
          100: '#f5f0e6',
          200: '#ede4cd',
          300: '#e5d8b4',
          400: '#ddcc9b',
          500: '#C6ad7a',
          600: '#b39560',
          700: '#8e7549',
          800: '#6a5737',
          900: '#463924',
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