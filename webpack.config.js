const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => ({

  entry: {
    'main': './src/index.js',
    'vendor': ['zepto', 'axios']
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js' // 指定分离出来的代码文件的名称
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
        use: JSON.stringify(argv.mode) === '"development"' ? ['style-loader', 'css-loader', 'less-loader'] : ExtractTextPlugin.extract({ 
          fallback: 'style-loader',
          use: [
            { 
              loader: 'css-loader',
              options: {
                minimize: JSON.stringify(argv.mode) !== '"development"' ? true : false
              }
            }, 
            'less-loader',
          ],
        })
      },
      {
        test: /\.(jpg|png|gif)$/,
        include: [
          path.resolve(__dirname, 'src/assets')
        ],
        use: [
          {
            loader: 'file-loader'
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { // 压缩 jpeg 的配置
                progressive: true,
                quality: 65
              },
              optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
                enabled: false,
              },
              pngquant: { // 使用 imagemin-pngquant 压缩 png
                quality: '65-90',
                speed: 4
              },
              gifsicle: { // 压缩 gif 的配置
                interlaced: false,
              },
              webp: { // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
                quality: 75
              },
            }
          }
        ]
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
      path.resolve(__dirname, 'node_modules')
    ],

    extensions: ['.js', '.css', '.json'],

    mainFiles: ['index']

  },

  plugins: [
    // clean dist folder
    new CleanWebpackPlugin(['dist']),
    // global module
    new webpack.ProvidePlugin({
      'log': path.resolve(__dirname, 'src/log')
    }),
    // global const
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(argv.mode)
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      minify: {
        minifyCSS: true,
        minifyJS: true,
        removeComments: JSON.stringify(argv.mode) !== '"development"' ? true : false,
        collapseWhitespace: JSON.stringify(argv.mode) !== '"development"' ? true : false
      }
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: JSON.stringify(argv.mode) === '"development"' ? true : false
    }),
    // HMR plugins
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {

    hot: true,

    before(app){
      app.get('/api', (req, res) => {
        res.send('Zhdate is a module that includes a formatted function for Date.');
      })
    }
    
  },
  // split code
  optimization: {

    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          test: path.resolve(__dirname, 'node_modules'),
          name: "vendor", // 使用 vendor 入口作为公共部分
          enforce: true,
        },
      },
    }

  }

});