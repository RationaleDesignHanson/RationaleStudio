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
        border: "var(--border)",
        muted: "var(--muted)",
        // Terminal Gold — utility-page primary accent (used sparingly).
        // For the Studio Monograph aesthetic, prefer `paper` / `ink` / `accent-ink`.
        'terminal-gold': {
          DEFAULT: '#FFD700',
          hover: '#FFE34D',
          dark: '#E5C100',
          light: '#FFF5CC',
        },
        // Studio Monograph palette — paper, ink, hairlines
        paper: {
          DEFAULT: '#F5F1E8',
          deep: '#ECE5D6',
        },
        ink: {
          DEFAULT: '#1F1B17',
          body: '#4A4540',
          muted: '#8A8278',
        },
        hairline: '#D9D2C3',
        // Site default accent (terracotta). Inside <ProjectScope>, `accent`
        // resolves to the per-project ink via the --accent CSS variable.
        accent: 'var(--accent, #A85A40)',
        'accent-ink': '#A85A40',
        // Per-project accent tokens — applied to kicker text, hairlines,
        // small detail elements only. Never large fills. Each is tuned
        // for muted complementarity against the dark monochrome base.
        project: {
          heirloom:  '#C97A4F',  // muted rust (replaces the bright cream/amber)
          'spark-ar':'#5FBFB0',  // muted teal
          orion:     '#7FA9D4',  // muted Meta-blue
          viacom:    '#A87FB8',  // dusk purple
          maker:     '#B89D6E',  // warm sepia
          silly:     '#D67FA8',  // muted pink
          rumi:      '#9B7FD4',  // violet
          fair:      '#7AB87A',  // muted moss
          fubo:      '#D49F4F',  // streaming amber
        },
      },
      // Type families (B+C system: editorial display + sans body + mono ledger)
      fontFamily: {
        display: ['var(--font-newsreader)', 'ui-serif', 'Georgia', 'serif'],
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      // Fluid Typography Tokens (Phase P1)
      fontSize: {
        'h1': 'var(--font-size-h1)',      // clamp(1.75rem, 1.25rem + 1.2vw, 3rem)
        'h2': 'var(--font-size-h2)',      // clamp(1.5rem, 1.125rem + 0.8vw, 2.25rem)
        'h3': 'var(--font-size-h3)',      // clamp(1.25rem, 1rem + 0.5vw, 1.875rem)
        'body': 'var(--font-size-body)',  // clamp(0.9375rem, 0.875rem + 0.2vw, 1.125rem)
        'caption': 'var(--font-size-caption)', // clamp(0.8125rem, 0.75rem + 0.15vw, 0.9375rem)
        // B+C 5-step type scale (display, h1, h2, body, small)
        'display': ['clamp(2rem, 1.25rem + 4vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.75rem, 1.25rem + 2.5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
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
