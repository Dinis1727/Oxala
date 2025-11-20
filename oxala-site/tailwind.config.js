/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#C8A46B",
          ink: "#1F1C19",
          parchment: "#F4EEE5",
          line: "#E5DCCB",
          night: "#0F0B07",
          forest: "#2F3C34",
          shell: "#F8F2E8",
          blush: "#E7D0BA",
          smoke: "#6B6258",
        },
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.06)",
      },
      borderRadius: {
        xl2: "1rem",
      },
    },
  },
  plugins: [],
};
