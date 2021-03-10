module.exports = {
  purge: {
    // enabled: true,
    // content: [    
    //   './src/**/*.html',
    //   './src/**/*.vue'
    // ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    borderWidth:{
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
      '10': '10px',
      '12': '12px',
      '14': '14px',
      '16': '16px',
    },
    extend: {
      colors:{
        'normal-green':'#01B552',
        'watch':'#F6C35A',
        'warning':'#FF0000',
        'noData':'#909090', 
        'selected':'#9acffa',
        'custPurple':'#6d4f9e',
        'custGreen':'#2d6577',
        'custPurpleForHeader':'#ccbfdf'
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
