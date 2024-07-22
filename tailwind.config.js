/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  darkMode: true,
  theme: {
    extend: {
      screens: {
        mobile: {
          max: "1023px"
        },
        desktop: "1024px"
      },
      colors: {
        header: {
          background: '#455A64',
          color: '#ECEFF1'
        },
        home: {
          banner: {
            color: '#ECEFF1',
            filter: '#455A64A1'
          }
        },
        borders: {
          color: '#455A64'
        },
        button: {
          primary: {
            background: '#455A64',
            color: '#ECEFF1'
          },
          secondary: {
            background: '#ECEFF1',
            color: '#455A64',
          },
          danger: {
            background: '#cc0a0a',
            color: '#ECEFF1'
          }
        }
      }
    },
  },
  plugins: [],
}

