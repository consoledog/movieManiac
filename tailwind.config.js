// tailwind.config.js
export default {
  theme: {
    extend: {
      fontFamily:{
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          '"Open Sans"',
          '"Helvetica Neue"',
          'sans-serif',
        ]
      },
      colors: {
        'primary': '#3632a8',
        'primary-light': '#3250a8',
        'text': '#dee2e6',
        'text-dark': '#adb5bd',
        'background-100': '#343a40',
        'background-500': '#2b3035',
        'background-900': '#212529',
        'red': '#fa5252',
        'red-dark': '#e03131',
      },
      boxShadow: {
        'custom-lg': '0 2.4rem 2.4rem rgba(0, 0, 0, 0.1)',
      },
      transitionDuration: {
        300: '300ms',
      },
    },
  },
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [],
};
