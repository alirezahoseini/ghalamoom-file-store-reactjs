/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      'rokh': ['rokh'],
      'yekan': ['IRANYekanX'],
      'yekan-bakh': ['yekan-bakh']
    },
    boxShadow: {
      'both-0': '0px 5px 15px rgba(0, 0, 0, 0.1)',
      'both': '0 0px 20px rgba(0, 0, 0, 0.1)',
      'both-2': '0 0px 30px rgba(128, 128, 128, 0.1)',
      'both-3': '0 0px 40px rgba(179, 179, 179, 0.068)',
      "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      "md": "0 4px 6px 1px rgba(0, 0, 0, 0.1)",
      "lg": "0 10px 15px 3px rgba(0, 0, 0, 0.1)",
      "xl": "0 20px 25px 5px rgba(0, 0, 0, 0.1)",
      "2xl": "0 25px 50px 12px rgba(0, 0, 0, 0.25)",
      "inner": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)",
      "none": "0 0 #0000",
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
      colors: {
        "custom-blue": {
          "100": "#DADFF0",
          "200": "#BAC0CB",
          "300": "#8F9AAB",
          "400": "#848EB3",
          "500": "#64748B",
          "600": "#284258",
          "700": "#3B82F6",
        },
        "custom-pink": {
          "100": "#E1A6FF",
          "200": "#d991fd",
        },
        "custom-red": {
          "100": "#ff0000",
        },
        "custom-golbehi": {
          "100": "#F86A68",
        },
        "custom-gold": {
          "100": "#FFC400",
        },
        "custom-primary": {
          "100": "#334155",
          "200": "#262E39",
        },
        "custom-gray": {
          "100": "#EAEAEA",
        },
      }
    },

  },
  plugins: [],
}




