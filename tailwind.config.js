export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FDFBF7',
          100: '#FAF4E8',
          200: '#F2E4C4',
          300: '#E9D29C',
          400: '#DEC073',
          500: '#D4AF37', // Classic metallic gold
          600: '#B89326',
          700: '#927219',
          800: '#6C5311',
          900: '#46350B',
        },
        dark: {
          950: '#07090E',
          900: '#0B0F17',
          850: '#101623',
          800: '#161F30',
          700: '#1E293B',
          600: '#334155',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
