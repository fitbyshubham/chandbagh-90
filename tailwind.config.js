// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      sm: '640px',
    },
    extend: {
      colors: {
        primary: { 500: '#1e3a8a', 600: '#1d4ed8' },
        secondary: { 500: '#0d9488' },
        chandbagh: {
          green: '#0d5c3e',
          greenDark: '#0a4a32',
          gold: '#d4af37',
          goldLight: '#e6c35c',
        },
      },
    },
  },
  plugins: [],
}