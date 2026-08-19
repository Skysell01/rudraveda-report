/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          900: '#070A12',
          800: '#0B0F19',
          700: '#111726',
          600: '#1B2338',
          500: '#2A3654'
        },
        gold: {
          300: '#FDE68A',
          400: '#F59E0B',
          500: '#D4AF37',
          600: '#B45309',
          700: '#78350F'
        },
        mystic: {
          900: '#1E1B4B',
          800: '#312E81',
          700: '#4338CA',
          500: '#6366F1'
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif']
      },
      boxShadow: {
        'glow-gold': '0 0 20px rgba(212, 175, 55, 0.25)',
        'glow-purple': '0 0 20px rgba(99, 102, 241, 0.25)'
      }
    },
  },
  plugins: [],
}
