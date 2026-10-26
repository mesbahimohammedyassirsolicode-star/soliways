/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./ui-kit/**/*.html",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#25A6AC',
          hover: '#1E878C',
          light: '#E6F6F7',
          glow: 'rgba(37, 166, 172, 0.35)',
        },
        secondary: {
          DEFAULT: '#456BB8',
          hover: '#365696',
          light: '#EEF2FA',
        },
        accent: {
          DEFAULT: '#6554B8',
          hover: '#52429C',
          light: '#F1EFFB',
        },
        dark: {
          DEFAULT: '#101828',
          surface: '#162036',
          card: '#1A2640',
          border: '#22314E',
        },
        surface: {
          light: '#FFFFFF',
          muted: '#F5F8FC',
        }
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 25px -5px rgba(37, 166, 172, 0.45)',
        'glow-accent': '0 0 25px -5px rgba(101, 84, 184, 0.45)',
        'card-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.6)',
        'card-light': '0 15px 35px -10px rgba(16, 24, 40, 0.08)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
}
