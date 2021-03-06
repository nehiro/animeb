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
      backgroundImage: (theme) => ({
        no1: "url('/images/gold.svg')",
        no2: "url('/images/silver.svg')",
        no3: "url('/images/bronze.svg')",
        searchIcon: "url('/images/search.svg')",
        hero_pc: "url('/images/hero_pc.png')",
        hero_sp: "url('/images/hero_sp.png')",
      }),
      backgroundSize: {
        '50%': '50%',
        16: '4rem',
      },
      minHeight: { 100: '100px' },
      spacing: {
        '30%': '30%',
        '50%': '50%',
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
  variants: {
    backgroundColor: ['first', 'last', 'even'],
    backgroundImage: ['first', 'last', 'even'],
    backgroundImage: ({ before }) => before(['active']),
    backgroundRepeat: ({ before }) => before(['active']),
    position: ({ before }) => before(['active']),
    height: ({ before }) => before(['active']),
    width: ({ before }) => before(['active']),
    inset: ({ before }) => before(['active']),
    margin: ({ before }) => before(['active']),
  },
};
