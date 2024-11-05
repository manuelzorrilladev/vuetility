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
       animation:{
          openFlip:'openDoor 0.3s ease-in-out',
          closeFlip:'closeDoor 0.3s ease-in-out',
       },
       keyframes:{
        openDoor: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { 'z-index': '0' },
          '100%': { transform: 'rotateY(-180deg)' },
        },
        closeDoor: {
          '0%': { transform: 'rotateY(-180deg)' },
          '50%': { 'z-index': '99' },
          '100%': { transform: 'rotateY(0deg)' },
        }
       }
    },
  },
  plugins: [],
}

