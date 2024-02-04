/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,tsx,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'share-tech': ['Share Tech', 'sans-serif'],
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#F7F7F7',
      'primary': '#191941',
      'primary-light': '#2D2D4F',
      'secondary': '#CB18B9',
      'tertiary': '#AB8AE7',
    },
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '50%': '50%',
      '16': '4rem',
    }
  },
  plugins: [],
}

