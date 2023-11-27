/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      backfaceVisibility: {
        hidden: "hidden",
      },
      keyframes: {
        wiggle: {
          "0%": {
            transform: "translateX(0) scale(.3)",
            opacity: "1",
          },

          "25%": {
            transform: "translateX(20px) scale(1)",
            opacity: "0",
          },
          "50%": {
            transform: "translateX(0) scale(.3)",
            opacity: "0",
          },

          "75%": {
            transform: "translateX(-20px) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(0) scale(.3)",
            opacity: "0",
          },
        },
        blinkcaret: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "#000" },
        },
        bouncy: {
          "0%, 20%, 53%, 80%, 100%": {
            "transition-timing-function": "cubic-bezier(0.215, 0.61, 0.355, 1)",
            transform: "translate3d(0, 0, 0)",
          },
          "40%, 43%": {
            "transition-timing-function":
              "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
            transform: "translate3d(0, -30px, 0)",
          },
          "70%": {
            "transition-timing-function":
              "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
            transform: "translate3d(0, -15px, 0)",
          },
          "90%": {
            transform: "translate3d(0, -4px, 0)",
          },
        },
        tada: {
          "0%": {
            transform: "scale3d(1, 1, 1)",
          },
          "10%, 20%": {
            transform: "scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)",
          },
          "30%, 50%, 70%, 90%": {
            transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)",
          },
          "40%, 60%, 80%": {
            transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)",
          },
          "100%": {
            transform: "scale3d(1, 1, 1)",
          },
        },
        rubberBand: {
          "0%": {
            transform: "scale3d(1, 1, 1)",
          },
          "30%": {
            transform: "scale3d(1.05, .70, 1)",
          },
          "40%": {
            transform: "scale3d(.70, 1.25, 1)",
          },
          "50%": {
            transform: "scale3d(1.05, 0.75, 1)",
          },
          "65%": {
            transform: "scale3d(.95, 1.05, 1)",
          },
          "75%": {
            transform: "scale3d(1.05, 0.95, 1)",
          },
          "100%": {
            transform: "scale3d(1, 1, 1)",
          },
        },
        shine: {
          "0%": { left: "-100%" },
          "100%": { left: "100%" },
        },
        falling: {
          "0%": {},
          "100%": {
            transform: "translate3d(-200px, 100vh, 0) scale(.1)",
            opacity: 0,
          },
        },
      },
      animation: {
        shine: "shine 1.3s ease-in-out infinite",
        wiggle: "tada 2s ease-in-out 1",
        falling: "falling 4.2s ease-in-out infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".backface-hidden": {
          "backface-visibility": "hidden",
        },
      });
    },
  ],
};
