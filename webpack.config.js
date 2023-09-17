const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/stickers.js', // Adjust the path if necessary
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  plugins: [
    new Dotenv()
  ]
};
