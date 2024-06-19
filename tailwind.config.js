/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        Pretendard: ['Pretendard'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',

        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'custom-tab-gradient':
          'linear-gradient(270deg, #FAFBFC 0%, rgba(250, 251, 252, 0.80) 50%, rgba(250, 251, 252, 0.00) 100%);',
        'custom-mob-gradient':
          'linear-gradient(270deg, #FAFBFC 0%, #FAFBFC 71.87%, rgba(250, 251, 252, 0.00) 100%)',
      },
      backgroundSize: {
        extend: '200%',
      },
      width: {
        pc: '1200px',
        tab: '696px',
        mob: '343px',
      },
      colors: {
        black: '#171717',
        'nomad-black': '#333236',
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

        // 다크모드에서 쓰는 주요 색상변수

        // 10번색은 페이지 배경화면으로 지정해주시면 됩니다
        'darkMode-black-10': '#191919',

        // 20~40번까지는 페이지 배경색 이외에 모달창 색상, 버튼 색상, 페이지와 겹치는 레이어 창의 색상등을 자유롭게 선택하셔서 디자인 하시면 됩니다
        'darkMode-black-20': '#242424',
        'darkMode-black-30': '#1C1C1E',
        'darkMode-black-40': '#2D2D2D',

        // 다크모드에서 사용할 텍스트 색상들입니다 역시 자유롭게 사용하시면됩니다 (hover효과 , active효과 등에도 사용하시면 됩니다)
        'darkMode-white-10': '#FFFFFF',
        'darkMode-white-20': '#F8F8FF',
        'darkMode-white-30': '#E5E4E2',
        'darkMode-gray-10': '#B2BEB5',
        'darkMode-gray-20': '#36454F',
      },
    },
    screens: {
      mob: '500px',
      sm: { max: '768px' },
      md: { min: '769px', max: '1023px' },
      lg: { min: '1024px' },
    },
    boxShadow: {
      custom: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
    animation: {
      shimmer: 'shimmer 1.2s infinite',
    },
  },

  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none', // IE and Edge
          'scrollbar-width': 'none', // Firefox
          '&::-webkit-scrollbar': {
            display: 'none', // Chrome, Safari, Opera
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
