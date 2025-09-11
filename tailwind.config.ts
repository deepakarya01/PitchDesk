// tailwind.config.ts
import type { Config } from 'tailwindcss';
const { fontFamily } = require('tailwindcss/defaultTheme');

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        worksans: ['var(--font-worksans)'],
      },
      colors: {
        primary: '#4c52eb',
        secondary: '#9134ea',
      },
    },
  },

  plugins: [require('tailwindcss-animate')],
};

export default config;

//  #4c52eb,  #9134ea
