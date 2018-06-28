const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => ({

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

  resolve: {

    modules: [
      path.resolve(__dirname, 'node_modules'),
      'node_modules'
    ],

    extensions: ['.js', '.css', '.json']

  },

  plugins: [
    new webpack.ProvidePlugin({
      'log': path.resolve(__dirname, 'src/log')
    }),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(argv.mode)
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new ExtractTextPlugin('[name].css'),
  ],

  devServer: {

    before(app){
      console.log(env);
      app.get('/api', (req, res) => {
        res.send('Zhdate is a module that includes a formatted function for Date.');
      })
    }
    
  },

});