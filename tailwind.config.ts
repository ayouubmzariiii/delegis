import type { Config } from 'tailwindcss';

/**
 * Delegis design tokens — "Delegis Blue".
 * ink: navy text & dark surfaces · paper: page backgrounds · line: borders
 * go: primary brand blue (actions, links, status) · mark: light blue tint for highlights on dark/light surfaces.
 * Token names are semantic so components never hard-code colours.
 */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0B1B33', 900: '#0B1B33', 800: '#13284A', 700: '#24406B', 600: '#475A78', 500: '#5A6B88', 400: '#94A3BD' },
        paper: { DEFAULT: '#F6F8FC', 50: '#FFFFFF', 100: '#F6F8FC', 200: '#EBF0F8' },
        line: { DEFAULT: '#E3E9F3', strong: '#C9D3E3' },
        go: { DEFAULT: '#2F5BFF', 50: '#EEF2FF', 100: '#DCE4FF', 300: '#8FA8FF', 600: '#2F5BFF', 700: '#1F45E0', 800: '#1834B0', 900: '#0F2378' },
        mark: '#C7D5FF',
        ok: { 50: '#EAF8F1', 600: '#11A46A', 700: '#0B7F52' },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 5vw, 4.25rem)', { lineHeight: '1.04', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2.1rem, 3.8vw, 3.25rem)', { lineHeight: '1.06', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.6rem, 2.6vw, 2.25rem)', { lineHeight: '1.12', letterSpacing: '-0.025em' }],
      },
      maxWidth: { page: '76rem' },
      boxShadow: {
        card: '0 1px 2px rgba(11,27,51,0.05), 0 8px 24px -12px rgba(11,27,51,0.14)',
        lift: '0 2px 6px rgba(11,27,51,0.06), 0 32px 64px -24px rgba(11,27,51,0.30)',
        glow: '0 20px 60px -20px rgba(47,91,255,0.55)',
      },
    },
  },
  plugins: [],
} satisfies Config;
