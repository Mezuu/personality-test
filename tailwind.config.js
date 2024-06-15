/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'surface': '#121212',
        'text-primary': 'rgba(255, 255, 255, 0.87)',
        'text-secondary': 'rgba(255, 255, 255, 0.6)',
        'text-muted': 'rgba(255, 255, 255, 0.38)',
        'surface-1': 'rgba(255, 255, 255, 0.05)',
        'surface-12': 'rgba(255, 255, 255, 0.14)',
      }
    },
  },
  plugins: [],
}