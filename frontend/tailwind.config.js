export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { navy: { 900: '#0b1f3a', 800: '#12294a', 700: '#1b3a66' }, gold: { 400: '#d4b06a', 500: '#c19a4b', 600: '#a8823a' }, cream: '#f8f5ef' },
      keyframes: { marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } }, fadeUp: { '0%': { opacity: 0, transform: 'translateY(14px)' }, '100%': { opacity: 1, transform: 'none' } } },
      animation: { marquee: 'marquee 28s linear infinite', fadeUp: 'fadeUp .6s ease both' },
      fontFamily: { serif: ['Georgia', 'Cambria', 'serif'], sans: ['Inter', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};
