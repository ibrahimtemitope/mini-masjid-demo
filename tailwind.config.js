/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FBF9F4',
          100: '#F7F3E9', // Signature unified MiniMasjid warm cream background
          200: '#EDE5D4',
          300: '#DDD4BF',
          400: '#C8B99B',
        },
        olive: {
          50: '#F3F6EC',
          100: '#E5ECD6',
          200: '#C9D8AD',
          500: '#738447', // Signature MiniMasjid olive accent
          600: '#5F7038',
          700: '#49572A',
          800: '#344128', // Signature MiniMasjid deep olive text/CTA
          900: '#232C1B',
        },
        dome: {
          50: '#FDF6E4',
          100: '#FAEBCA',
          300: '#E9CC87',
          400: '#D8AE52',
          500: '#C59632', // Standout Accent #2: Warm Dome Gold (stars & highlights)
          600: '#9B731F',
        },
        aqsa: {
          50: '#EEF3FA',
          100: '#DCE6F5',
          500: '#2B5696', // Standout Accent #3: Royal Al-Aqsa Blue (3D & patent tags)
          600: '#1F4175',
          700: '#162F57',
        },
        clay: {
          50: '#FDF0EB',
          100: '#FADCD1',
          500: '#C05D3B', // Standout Accent #4: Warm Terracotta (7.5% giveback & savings)
          600: '#9E482B',
        },
        night: {
          900: '#0D131A',
          950: '#070B10',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        plush: '0 20px 50px -20px rgba(52, 65, 40, 0.11)',
        'plush-lg': '0 28px 70px -24px rgba(52, 65, 40, 0.17)',
      },
    },
  },
  plugins: [],
};
