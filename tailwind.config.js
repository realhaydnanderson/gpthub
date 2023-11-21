/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastelBlue: '#a7c7e7', // Example pastel blue color
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

