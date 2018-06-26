const path = require('path');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: 'babel-loader'
      },
      {
        test: /\.less/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: ExtractTextPlugin.extract({ 
          fallback: 'style-loader',
          use: [
            'css-loader', 
            'less-loader',
          ],
        })
      },
      {
        test: /\.(jpg|png|gif)$/,
        include: [
          path.resolve(__dirname, 'src/assets')
        ],
        use: 'file-loader'
      },
      {
        test: /\.html$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: 'html-loader'
      }
    ]
  },

  plugins: [
    new UglifyPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new ExtractTextPlugin('[name].css')
  ]

};