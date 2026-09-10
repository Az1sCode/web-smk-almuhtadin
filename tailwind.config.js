/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': ['var(--text-2xs)', { lineHeight: '1rem' }],
      },
      colors: {
        navy: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
          light: 'var(--color-primary-light)',
        },
        azure: {
          DEFAULT: 'var(--color-secondary)',
          light: 'var(--color-secondary-light)',
          soft: 'var(--color-secondary-soft)',
        },
        gold: {
          DEFAULT: 'var(--color-gold)',
          hover: 'var(--color-gold-hover)',
          soft: 'var(--color-gold-soft)',
          badge: 'var(--color-gold-badge)',
        },
        canvas: 'var(--color-canvas)',
        surface: 'var(--color-surface)',
        ink: {
          DEFAULT: 'var(--color-ink-primary)',
          muted: 'var(--color-ink-muted)',
          subtle: 'var(--color-ink-subtle)',
        },
        midnight: 'var(--color-midnight)',
        whatsapp: {
          DEFAULT: 'var(--color-whatsapp)',
          hover: 'var(--color-whatsapp-hover)',
        },
        facebook: 'var(--color-facebook)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      boxShadow: {
        whisper: 'var(--shadow-whisper)',
        elevated: 'var(--shadow-elevated)',
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'xs': 'var(--radius-xs)',
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        '4xl': 'var(--radius-4xl)',
      },
    },
  },
  plugins: [],
}
