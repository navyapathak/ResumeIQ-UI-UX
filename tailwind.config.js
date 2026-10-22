/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060A14',
          900: '#0A0F1E', // Main deep navy
          850: '#111827',
          800: '#151D33',
          700: '#1E2440', // Muted slate / card border
          600: '#2A3356',
        },
        indigo: {
          50: '#EEF2FF',
          100: '#E0E7FF', // Soft lavender
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1', // Electric indigo
          600: '#4F46E5',
          700: '#4338CA',
        },
        emerald: {
          500: '#10B981',
          600: '#059669',
        },
        amber: {
          500: '#F59E0B',
          600: '#D97706',
        },
        slate: {
          850: '#161F36',
          900: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3)',
        'elevated': '0 10px 30px -5px rgba(10, 15, 30, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'glow-indigo': '0 0 25px -5px rgba(99, 102, 241, 0.25)',
      }
    },
  },
  plugins: [],
}
