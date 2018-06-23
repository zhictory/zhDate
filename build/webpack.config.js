const path = require('path');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const config = {

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: 'babel-loader'
      }
    ]
  },

  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
    extensions: ['.js', '.json']
  },

  plugins: [
    new UglifyPlugin()
  ],

  mode: 'production'

};

webpack(config, function (err, stats) {
  process.stdout.write(stats.toString({
    colors      : true,
    children    : false,
    modules     : false,
    childModules: false,
    chunks      : false
  }));
});