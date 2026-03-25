/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: {
          primary: '#070b14',
          secondary: '#0d1526',
          card: '#0f1a2e',
          glass: 'rgba(13, 21, 38, 0.6)',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          glow: '#00f5ff',
        },
        purple: {
          400: '#c084fc',
          500: '#a855f7',
        },
        orange: {
          400: '#fb923c',
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(34,211,238,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.03) 1px, transparent 1px)`,
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,211,238,0.08) 0%, transparent 70%)',
        'cyan-glow': 'radial-gradient(circle at center, rgba(34,211,238,0.15) 0%, transparent 70%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'float': 'float 4s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'slide-in-left': 'slideInLeft 0.8s ease forwards',
        'slide-in-right': 'slideInRight 0.8s ease forwards',
        'fade-up': 'fadeUp 0.7s ease forwards',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(34,211,238,0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(34,211,238,0.7), 0 0 40px rgba(34,211,238,0.3)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-40px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(40px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'cyan-sm': '0 0 8px rgba(34,211,238,0.3)',
        'cyan-md': '0 0 20px rgba(34,211,238,0.4)',
        'cyan-lg': '0 0 40px rgba(34,211,238,0.3)',
        'card': '0 4px 30px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}
