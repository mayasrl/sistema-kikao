/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#B8587D',
          light: '#f5d5e0',
          dark: '#B4264A',
        },
        secondary: {
          DEFAULT: '#B4264A',
        },
        background: {
          DEFAULT: '#fafafa',
          light: '#ffffff',
          pink: '#f5d5e0',
        },
        text: {
          DEFAULT: '#333333',
          light: '#666666',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'sm': '0 0.125rem 0.5rem rgba(0, 0, 0, 0.1)',
        'md': '0 0.25rem 1rem rgba(0, 0, 0, 0.15)',
      },
      transitionDuration: {
        'fast': '300ms',
      },
    },
  },
  plugins: [],
}
