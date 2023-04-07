/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      'rokh': ['rokh'],
      'yekan': ['IRANYekanX'],
      'yekan-bakh': ['yekan-bakh']
    },
    colors: {
      transparent: 'transparent',
      "primary-1": "#334155",
      "secondary-2": "#262E39",
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
      'both-2': '0 0px 30px rgba(128, 128, 128, 0.1)',
      'both-3': '0 0px 40px rgba(179, 179, 179, 0.068)',
    },
    borderRadius: {
      "none": '0px',
      "sm": '0.125rem',
      "rounded": '0.25rem',
      "md": '0.375rem',
      "lg": '0.5rem',
      "xl": '0.75rem',
      "2xl": '1rem',
      "3xl": '1.5rem',
      "4xl": '2.5rem',
      "5xl": '3.5rem',
      "6xl": '4.5rem',
      "full": '100%',
      'fifty': '50%',
    },
    extend: {
      lineHeight: {
        '11': '4rem',
        '12': '5rem',
        '13': '6rem',
      },
  },
},
plugins: [],
}



