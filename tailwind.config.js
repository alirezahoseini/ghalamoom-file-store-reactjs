/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      'rokh': ['rokh'],
      'yekan': ['yekan'],
      'yekan-bakh': ['yekan-bakh']
    },
    colors: {
      transparent: 'transparent',
      "primary-1": "#334155",
      "secondary-1": "#284258",
      "text-1": "#64748B",
      "gold-1": "#FFC400",
      "gray-5": "#848EB3",
      "gray-4": "#8F9AAB",
      "gray-3": "#BAC0CB",
      "gray-2": "#DADFF0",
      "gray-1": "#EAEAEA",
      "pink": "#DE1A48",
      "blue": "#3B82F6",
      "white": "#fff",
      "black": "#000",
    },
    boxShadow: {
      'both': '0 0px 20px rgba(0, 0, 0, 0.1)',
    },
    extend: {},
  },
  plugins: [],
}

