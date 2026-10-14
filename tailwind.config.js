/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        fintech: {
          dark: '#0a0f0d',
          darker: '#060a08',
          card: '#0f1714',
          cardBorder: '#1c2b25',
          surface: '#131f1a',
          emerald: '#10b981',
          teal: '#14b8a6',
          neon: '#00ff88',
          muted: '#94a3b8',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.35)',
        'glow-teal': '0 0 35px -5px rgba(20, 184, 166, 0.3)',
        '3d-green': '0 10px 30px -10px rgba(16, 185, 129, 0.4)',
        'card-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'trend-glow': 'trendPulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        trendPulse: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 16px rgba(16, 185, 129, 0.8))' },
        }
      }
    },
  },
  plugins: [],
}
