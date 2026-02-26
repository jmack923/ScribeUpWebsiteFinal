import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      boxShadow: {
        clean: "0 0 0 1px rgba(0,0,0,0.03), 0 2px 4px rgba(0,0,0,0.05), 0 12px 24px rgba(0,0,0,0.06)",
      },
      backgroundImage: {
        "mesh-light":
          "radial-gradient(40% 30% at 15% 15%, rgba(0,111,238,0.10), transparent 70%), radial-gradient(35% 35% at 85% 25%, rgba(120,40,200,0.08), transparent 70%), radial-gradient(45% 35% at 50% 85%, rgba(23,201,100,0.08), transparent 70%)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floaty: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
