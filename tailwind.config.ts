import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        brand: {
          blue: '#2E7BFF',
          'blue-dark': '#1E6BFF',
          'blue-bright': '#4D97FF',
          electric: '#2E7BFF',
          // cyan retired from the accent system — aliased to blue-bright so any
          // leftover `brand-cyan` utility stays on-system instead of leaking.
          cyan: '#4D97FF',
          green: '#34D27B',
          // Pro / multicâmera accent — brand-ref gold (replaces yellow amber).
          gold: '#E3A92C',
          amber: '#E3A92C',
          red: '#E53935',
          purple: '#AB47BC',
        },
        surface: {
          0: '#000000',
          1: '#1C1C1E',
          2: '#2C2C2E',
          3: '#3A3A3C',
        },
        'text-primary': '#FFFFFF',
        'text-secondary': '#B6BCC8',
        'text-tertiary': '#8A909C',
        'text-disabled': '#5A5F69',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        'xs': '6px',
        'sm': '10px',
        'md': '12px',
        'lg': '14px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '32px',
        'pill': '100px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [typography],
};

export default config;
