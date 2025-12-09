import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        border: "var(--border)",
        muted: "var(--muted)",
        // Terminal Gold Design Tokens (Phase 4.1)
        'terminal-gold': {
          DEFAULT: '#FFD700',
          hover: '#FFE34D',
          dark: '#E5C100',
          light: '#FFF5CC',
        },
      },
      screens: {
        'landscape': { 'raw': '(orientation: landscape) and (max-height: 600px)' },
        'landscape-md': { 'raw': '(orientation: landscape) and (min-width: 768px) and (max-height: 700px)' },
      },
    },
  },
  plugins: [],
};
export default config;
