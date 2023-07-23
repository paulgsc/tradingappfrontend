/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      backfaceVisibility: {
        hidden: 'hidden',
      },
      keyframes: {
        wiggle: {
          '0%': {
            transform: 'translateX(0) scale(0.5 )',
            opacity: '0',
            backgroundColor: '#000000'
          },
          '25%': {
            backgroundColor: '#0000'
          },
          '100%': {
            transform: 'translateX(100px) scale(1)',
            opacity: '1',
            backgroundColor: '#FF0000'
          },
        }
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
      });
    },
  ],

  
}

