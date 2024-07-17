/** @type {import('tailwindcss').Config} */
export default ({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        magenta: {
          500: '#E91E63',
          700: '#C2185B',
        },
        violet: {
          500: '#673AB7',
          700: '#512DA8',
        },
      },
    },
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {}
    },
  ],
})

