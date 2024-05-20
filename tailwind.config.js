module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff0000', // Красный цвет для границ
        secondary: '#00ff00', // Зеленый цвет для доп элементов
      },
    },
  },
  plugins: [],
};
