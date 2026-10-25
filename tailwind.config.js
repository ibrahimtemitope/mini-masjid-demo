/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FDFBF7',
          100: '#F8F4EC',
          200: '#EFE8D8',
          300: '#DFD3BC',
          400: '#CBB999',
        },
        olive: {
          50: '#F4F6EF',
          100: '#E7ECDC',
          200: '#CFDBBA',
          500: '#6D7B49',
          600: '#586638',
          700: '#434F2A',
          800: '#2E371C',
          900: '#1D2412',
        },
        dome: {
          300: '#EBD197',
          400: '#D8B365',
          500: '#C39844',
          600: '#9E772B',
        },
        aqsa: {
          500: '#244A8A',
          600: '#1B386B',
          700: '#13274D',
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
        plush: '0 24px 60px -20px rgba(29, 36, 18, 0.12)',
        'plush-lg': '0 34px 80px -24px rgba(29, 36, 18, 0.20)',
        hologram: '0 0 50px -10px rgba(74, 222, 180, 0.32)',
      },
    },
  },
  plugins: [],
};
