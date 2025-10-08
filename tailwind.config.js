// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      // Only enable mobile and small tablet
      sm: '640px',
      // md, lg, xl are disabled → forces mobile-first design
    },
    extend: {
      colors: {
        primary: { 500: '#1e3a8a', 600: '#1d4ed8' },
        secondary: { 500: '#0d9488' },
      },
    },
  },
  plugins: [],
}