module.exports = {
  important: true,
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    backgroundColor: theme => ({
      ...theme('colors'),
      primary: '#385DB8',
      footer: '#475473'
    })
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
