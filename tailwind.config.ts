import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        palette: {
          blond: "#F7F5B9",
          cream: "#FFFDD0",
          ivory: "#FFFDF0",
          blueGreenLight: "#89E3CC",
          blueGreenDark: "#3ABFC9",
        },
        brand: {
          "50": "#fff6f1",
          "100": "#ffede3",
          "200": "#ffe4d5",
          "300": "#ffdbc7",
          "400": "#ffd2b8",
          "500": "#ffc8a7",
          "600": "#ffbf96",
          "700": "#ffb684",
          "800": "#ffac6f",
          "900": "#ffa256",
        },
      },
    },
  },
  plugins: [],
};

export default config;
