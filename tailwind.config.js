module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: '#7F80F3',
        yellow: '#FFD400',
        lightYellow: '#FFEC8F',
        bgGray: '#F8F8F8',
        breadcrumbs: '#efefef',
        buttonBlack: '#505050',
        google: '#dc4e40',
        facebook: '#3b5998',
        twitter: '#1da1f2',
        line: '#3ACE01',
      },
      backgroundPosition: {
        reviewIcon: 'center 0.5rem',
      },
      gridTemplateColumns: {
        gridResponsive: 'repeat(auto-fit, minmax(206px, 1fr))',
        gridstreaming: '70px auto',
        gridLikes: 'repeat(auto-fit, minmax(48px, 1fr))',
      },
      minWidth: {
        100: '100px',
        146: '146px',
        69: '69px',
        200: '200px',
        180: '180px',
      },
      maxWidth: {
        242: '242px',
      },
      maxHeight: {
        40: '40px',
      },
      inset: {
        3: '3%',
      },
      inset: {
        3: '3%',
        '-4': '-1rem',
      },
      gridTemplateColumns: {
        user: '48px 1fr 1fr',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '2rem',
      },
    },
    listStyleType: {
      disc: 'disc',
      decimal: 'decimal',
      lowerLatin: 'lower-latin',
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
