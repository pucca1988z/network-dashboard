module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        'normal-green':'#1dc9b7',
        'watch':'#ffc241',
        'warning':'#fd3995',
        'noData':'#909090', 
        'selected':'#9acffa'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active']
    },
  },
  plugins: [],
}
