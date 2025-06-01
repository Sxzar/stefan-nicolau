/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{njk,html,js}", "./src/**/*.{njk,html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontFamily: {
        roboto: ["Roboto", "Segoe UI", "Helvetica Neue", "sans-serif"],
        raleway: ["Raleway", "Segoe UI", "Helvetica Neue", "sans-serif"],
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        neutral: "var(--neutral)",
        "base-100": "var(--background)",
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        info: "var(--info)",
      },
      transitionProperty: {
        transform: "transform",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },
};
