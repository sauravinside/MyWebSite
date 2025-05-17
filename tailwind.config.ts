// tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      colors: {
        terminal: {
          black: '#282a36',
          gray: '#44475a',
          white: '#f8f8f2',
          blue: '#6272a4',
          cyan: '#8be9fd',
          green: '#50fa7b',
          orange: '#ffb86c',
          pink: '#ff79c6',
          purple: '#bd93f9',
          red: '#ff5555',
          yellow: '#f1fa8c',
        },
        aws: '#FF9900',
        gcp: '#4285F4',
        azure: '#0078D4',
        oci: '#F80000',
      },
      animation: {
        'terminal-cursor': 'terminal-cursor 1s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
      keyframes: {
        'terminal-cursor': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('/images/backgrounds/grid-pattern.svg')",
        'terminal-pattern': "linear-gradient(rgba(40, 42, 54, 0.95), rgba(40, 42, 54, 0.95)), url('/images/backgrounds/terminal-bg.svg')",
      },
      boxShadow: {
        'terminal': '0 10px 30px -10px rgba(40, 42, 54, 0.5)',
        'card': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'neon': '0 0 5px theme(colors.terminal.pink), 0 0 20px theme(colors.terminal.purple)',
      },
    },
  },
  plugins: [],
};

export default config;