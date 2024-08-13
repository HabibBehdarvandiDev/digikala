import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FFFFFF",
            foreground: "#11181C",
            primary: {
              "50": "#fff1f1",
              "100": "#fee5e6",
              "200": "#fdced2",
              "300": "#fba6ad",
              "400": "#f77582",
              "500": "#ef4056",
              "600": "#dc2243",
              "700": "#ba1637",
              "800": "#9b1635",
              "900": "#851633",
              "950": "#4a0717",
              DEFAULT: "#ef4056",
              foreground: "#FFFFFF",
            },
          },
        },
        dark: {
          colors: {
            background: "#000000",
            foreground: "#ECEDEE",
            primary: {
              "50": "#fff1f1",
              "100": "#fee5e6",
              "200": "#fdced2",
              "300": "#fba6ad",
              "400": "#f77582",
              "500": "#ef4056",
              "600": "#dc2243",
              "700": "#ba1637",
              "800": "#9b1635",
              "900": "#851633",
              "950": "#4a0717",
              DEFAULT: "#ef4056",
              foreground: "#FFFFFF",
            },
          },
        },
        /* mytheme: {
          extend: "light",
          colors: {
            primary: {
              DEFAULT: "#BEF264",
              foreground: "#000000",
            },
            focus: "#BEF264",
          },
        }, */
      },
    }),
  ],
};
export default config;
