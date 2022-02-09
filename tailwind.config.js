// tailwind.config.js
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/**/*.{js,ts,jsx,tsx,mdx,css}',
  ],
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
  theme: {
    colors: {
      primary: '#5E6AD2',
      secondary: '#7bb5b7',
      'tertiary-1': '#eabe7c',
      'tertiary-2': '#533747',
      'tertiary-3': '#dd6031',
      'tertiary-4': '#3c6c6e',
      black: '#03040c',
      current: 'currentColor',
      'grey-1': '#0B0E26',
      'grey-2': '#2D3A9D',
      'grey-3': '#8790DC',
      'grey-4': '#D6D9F3',
      'grey-5': '#F0F1FB',
      transparent: 'transparent',
      white: '#ffffff',
    },
    fontFamily: { sans: ['Poppins', 'Helvetica', 'Arial', 'sans-serif'] },
    extend: {
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-in',
        'fade-in-down': 'fade-in-down 0.5s ease-out',
      },
    },
  },
};
