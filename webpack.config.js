const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    popup: './src/popup.jsx',
    content: './src/content.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'manifest.json', to: '.' }, // ✅ copy root manifest.json
        { from: 'src/popup.html', to: '.' }, // ✅ copy HTML used in extension
        { from: 'src/styles', to: 'styles' },
        { from: 'public', to: 'public' } // ✅ copy CSS folder
      ]
    })
  ],
  mode: 'production'
};
