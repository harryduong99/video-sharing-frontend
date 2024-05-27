import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      base: {
        white: "#F8FFFE",
        black: "#0D0E11",
      },
      transparent: "transparent",
      primary: {
        300: "#E6FF94",
        400: "#9DDE8B",
        DEFAULT: "#40A578",
        600: "#006769",
      },
      gray: {
        25: "#FCFCFC",
        50: "#FAFAFA",
        100: "#F5F5F5",
        200: "#E5E5E5",
        300: "#D6D6D6",
        400: "#A3A3A3",
        DEFAULT: "#737373",
        600: "#525252",
        700: "#424242",
        800: "#292929",
        900: "#141414",
      },
      error: {
        DEFAULT: "#F04438",
      },
    },
    extend: {
      fontSize: {
        xs: ["12px", "18px"],
        sm: ["14px", "20px"],
        md: ["16px", "24px"],
        lg: ["18px", "28px"],
        xl: ["20px", "30px"],
        "2xl": ["24px", "32px"],
        "3xl": ["30px", "36px"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
