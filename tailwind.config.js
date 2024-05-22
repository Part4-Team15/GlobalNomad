/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    extend: {
      fontFamily: {
        Pretendard: ['Pretendard'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        black: '#171717',
        'gray-80': '#4B4B4B',
        'gray-70': '#79747E',
        'gray-60': '#A4A1AA',
        'gray-50': '#ADAEB8',
        'gray-40': '#CBC9CF',
        'gray-30': '#DDD',
        'gray-20': '#EEE',
        'gray-10': '#FAFAFA',
        white: '#FFFFFF',
        'red-40': '#FF472E',
        'red-10': '#FFE4E0',  
        'orange-40': '#FF7C1D',
        'orange-10': '#FFF4E8',
        yellow: '#FFC23D',
        'green-80': '#0B3B2D',
        'green-40': '#00AC07',
        'green-10': '#CED8D5',
        'blue-30': '#0085FF',
        'blue-20': '#2EB4FF',
        'blue-10': '#E5F3FF',
      },
    },
  },

  plugins: [],
};