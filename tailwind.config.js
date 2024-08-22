/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#060709',
        'text-2': '#f6f7f9',
        'background': '#fbfcfc',
        'primary': '#63829e',
        'secondary': '#c0a3c6',
        'accent': '#b181a4',
       },
       
    },
  },
  plugins: [],
}

