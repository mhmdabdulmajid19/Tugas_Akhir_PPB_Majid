/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors dari logo AlMajid Batik
        primary: {
          50: '#fdf8f3',
          100: '#f9ede0',
          200: '#f3d9bf',
          300: '#ebc194',
          400: '#e2a567',
          500: '#d98f47',  // Warna emas dari logo
          600: '#c57a3c',
          700: '#a66334',
          800: '#875030',
          900: '#6e4229',
        },
        // Batik color palette sesuai logo
        batik: {
          // Coklat tua dari logo (warna dominan)
          brown: '#5C3317',      // Dark brown
          'brown-light': '#7D4F1E', // Medium brown
          // Emas/Gold dari logo
          gold: '#D4A574',       // Soft gold
          'gold-light': '#E8C9A0', // Light gold
          'gold-dark': '#B8906A',  // Dark gold
          // Cream untuk background dari nuansa logo
          cream: '#F5EEE6',
          'cream-light': '#FAF6F1',
          // Accent colors
          accent: {
            green: '#4A5D3F',    // Hijau dari daun di logo
            'green-light': '#6B7C5E',
          }
        },
        // Secondary colors untuk UI
        secondary: {
          brown: {
            50: '#faf8f5',
            100: '#f3ede4',
            200: '#e5d8c4',
            300: '#d5bf9f',
            400: '#c4a57a',
            500: '#b38f5f',
            600: '#9e7a51',
            700: '#846346',
            800: '#6c523e',
            900: '#5a4535',
          },
          gold: {
            50: '#fdfaf5',
            100: '#f9f1e3',
            200: '#f1e0c1',
            300: '#e7cc9a',
            400: '#dbb46f',
            500: '#d4a574',
            600: '#c08b53',
            700: '#a17145',
            800: '#835c3c',
            900: '#6d4d34',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'spin-slow-reverse': 'spin 10s linear infinite reverse',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 3s ease infinite',
        'shimmer': 'shimmer 2s infinite',
        'fade-in': 'fadeIn 1s ease-in',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'batik-gradient': 'linear-gradient(135deg, #5C3317 0%, #D4A574 100%)',
        'batik-gradient-hover': 'linear-gradient(135deg, #7D4F1E 0%, #E8C9A0 100%)',
        'gold-gradient': 'linear-gradient(135deg, #B8906A 0%, #E8C9A0 100%)',
      },
      // Extend gradient color stops untuk from-* dan to-* utilities
      gradientColorStops: theme => ({
        ...theme('colors'),
        'batik-brown': '#5C3317',
        'batik-brown-light': '#7D4F1E',
        'batik-gold': '#D4A574',
        'batik-gold-light': '#E8C9A0',
      })
    },
  },
  plugins: [],
}