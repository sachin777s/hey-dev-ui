/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";
import tailwindScrollbar from "tailwind-scrollbar";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui(), tailwindScrollbar],
  darkMode: "class",
};
