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
      // Fluid Typography Tokens (Phase P1)
      fontSize: {
        'h1': 'var(--font-size-h1)',      // clamp(1.75rem, 1.25rem + 1.2vw, 3rem)
        'h2': 'var(--font-size-h2)',      // clamp(1.5rem, 1.125rem + 0.8vw, 2.25rem)
        'h3': 'var(--font-size-h3)',      // clamp(1.25rem, 1rem + 0.5vw, 1.875rem)
        'body': 'var(--font-size-body)',  // clamp(0.9375rem, 0.875rem + 0.2vw, 1.125rem)
        'caption': 'var(--font-size-caption)', // clamp(0.8125rem, 0.75rem + 0.15vw, 0.9375rem)
      },
      // Measure constraints for optimal reading
      maxWidth: {
        'measure-narrow': 'var(--measure-narrow)',   // 45ch
        'measure': 'var(--measure-default)',          // 65ch
        'measure-wide': 'var(--measure-wide)',        // 80ch
      },
      // Standardized Breakpoints (Phase P1 - matches globals.css)
      screens: {
        'sm': '480px',   // Mobile → Tablet
        'md': '768px',   // Tablet → Desktop
        'lg': '1024px',  // Desktop → Large
        'xl': '1280px',  // Large → Extra Large
        // Custom orientation breakpoints
        'landscape': { 'raw': '(orientation: landscape) and (max-height: 600px)' },
        'landscape-md': { 'raw': '(orientation: landscape) and (min-width: 768px) and (max-height: 700px)' },
      },
    },
  },
  plugins: [],
};
export default config;
