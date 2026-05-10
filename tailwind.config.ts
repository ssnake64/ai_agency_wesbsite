import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#F8FAF0',
          soft: '#EFF4DC',
          dark: '#0A0A0A',
        },
        ink: {
          DEFAULT: '#1A1A1A',
          muted: '#6B6B6B',
          faint: '#A8A8A8',
        },
        accent: {
          DEFAULT: '#C5F04E',
          deep: '#A8D63A',
          soft: '#E8FAB8',
        },
        line: {
          DEFAULT: '#E5E7DB',
          strong: '#1A1A1A',
        },
      },
      fontFamily: {
        display: ['var(--font-anton)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      maxWidth: {
        container: '1200px',
      },
      keyframes: {
        marqueeLeft: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeRight: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.55', transform: 'scale(1.25)' },
        },
      },
      animation: {
        'marquee-left': 'marqueeLeft 35s linear infinite',
        'marquee-right': 'marqueeRight 35s linear infinite',
        'spin-slow': 'spinSlow 20s linear infinite',
        'pulse-dot': 'pulseDot 1.6s ease-in-out infinite',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgba(26,26,26,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,26,26,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-32': '32px 32px',
      },
    },
  },
  plugins: [],
};

export default config;
