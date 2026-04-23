import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "Segoe UI", "sans-serif"],
        display: ["var(--font-display)", "Segoe UI", "sans-serif"],
      },
      colors: {
        // Modern gradient color palette
        primary: {
          DEFAULT: "#00627a",      // Teal - main accent
          dark: "#004455",         // Darker teal
          light: "#00a0d0",        // Lighter teal
        },
        secondary: {
          DEFAULT: "#003b8f",      // Dark blue
          dark: "#001f5c",         // Darker blue
          light: "#0066cc",        // Lighter blue
        },
        accent: {
          purple: "#78008a",       // Purple from gradient
          magenta: "#b2008f",      // Magenta from gradient
          teal: "#00627a",
          blue: "#003b8f",
        },
        // Complementary neutrals
        dark: {
          50: "#f9f9fa",
          100: "#f3f3f5",
          200: "#e8e8eb",
          300: "#d8d8dd",
          400: "#b8b8bf",
          500: "#808089",
          600: "#595962",
          700: "#3a3a43",
          800: "#1f1f27",
          900: "#0a0a0f",
        },
      },
      backgroundImage: {
        // Main gradient - 96deg angle
        "gradient-primary": "linear-gradient(var(--rg-gradient-angle, 96deg), #00627a 0%, #003b8f 23.21%, #78008a 63.31%, #b2008f 100%)",
        // Reversed gradient
        "gradient-primary-reverse": "linear-gradient(var(--rg-gradient-angle, 96deg), #b2008f 0%, #78008a 36.69%, #003b8f 76.79%, #00627a 100%)",
        // Vertical gradient
        "gradient-vertical": "linear-gradient(to bottom, #00627a 0%, #003b8f 23.21%, #78008a 63.31%, #b2008f 100%)",
        // Radial gradient
        "gradient-radial": "radial-gradient(ellipse at center, #00627a 0%, #003b8f 30%, #78008a 60%, #b2008f 100%)",
        // Dark to light teal
        "gradient-teal": "linear-gradient(135deg, #004455 0%, #00a0d0 100%)",
      },
      boxShadow: {
        // Gradient-inspired shadows
        "gradient-sm": "0 1px 2px rgba(0, 98, 122, 0.15)",
        "gradient-md": "0 4px 6px rgba(0, 98, 122, 0.1), 0 2px 4px rgba(120, 0, 138, 0.06)",
        "gradient-lg": "0 10px 15px -3px rgba(0, 98, 122, 0.15), 0 4px 6px -2px rgba(120, 0, 138, 0.1)",
        "gradient-xl": "0 20px 25px -5px rgba(0, 98, 122, 0.15), 0 10px 10px -5px rgba(178, 0, 143, 0.1)",
        "gradient-2xl": "0 25px 50px -12px rgba(0, 98, 122, 0.2)",
        "ambient": "0 20px 44px rgba(16, 22, 41, 0.14)",
      },
      textColor: {
        gradient: "transparent",
      },
    },
  },
  plugins: [],
}

export default config
