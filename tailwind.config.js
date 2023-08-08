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
            transform: 'translateX(0) scale(.3)',
            opacity: '1',
   
          },
   
          '25%': {
            transform: 'translateX(20px) scale(1)',
            opacity: '0',
      
          },
          '50%': {
            transform: 'translateX(0) scale(.3)',
            opacity: '0',
      
          },
   
          '75%': {
            transform: 'translateX(-20px) scale(1)',
            opacity: '1',
      
          },
          '100%': {
            transform: 'translateX(0) scale(.3)',
            opacity: '0',
      
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

