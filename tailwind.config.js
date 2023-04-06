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
      "global-color-primary": "#334155",
      "global-color-secondary": "#284258",
      "global-color-text": "#64748B",
      "global-color-accent": "#FFC400",
      "global-color-d0f0fef": "#8F9AAB",
      "global-color-d51ca3e": "#BAC0CB",
      "global-color-b339abd": "#DADFF0",
      "global-color-f1ba8c0": "#EAEAEA",
      "global-color-00109ec": "#848EB3",
      "global-color-85bef47": "#DE1A48",
      "global-color-ed09453": "#3B82F6",
    },
    extend: {},
  },
  plugins: [],
}

