/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    screens: {
        lg: '1320px',
        md: '780px'
    },

    container: {
      screens: {
        lg: '1320px'
      },
    },

    extend: {

      transitionProperty: {
        'height': 'height',
        'width': 'width',
        'spacing': 'margin, padding',
      },

      colors: {
        dark: {
          1: '#1c1f28',
          2: '#141720',
          3: '#131313',
          4: '#0e1118',
          5: '#23262f',
          6: '#202020',
          // 6: '#151723',
          7: '#121212',
          // 8: 'rgb(26, 26, 32)',
          8: '#121212',
          // 9: '#202020'
          10: '#131313'
        },
        white: {
          1: '#ffffff'
        },
        gray: {
          1: '#8f929b',
          2: 'rgb(58, 58, 66)'
        }
      }
    },
  },
  plugins: [],
}