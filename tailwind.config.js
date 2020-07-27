module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
  ],
  theme: {
    extend: {
      colors: {
        tomato: {
          lighter: '#fa7d6a',
          default: '#FE654F'
        },
        champagne: {
          lighter: '#FED99B',
          default: '#FED18C'
        }
      }
    },
  },
  variants: {},
  plugins: [],
}
