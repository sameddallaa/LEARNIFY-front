/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cyanT: "#ECF0FF",
        blueT: "#80a5ca",
        blueF: "#0D3C8E",
      },
    },
  },
  plugins: [],
};
