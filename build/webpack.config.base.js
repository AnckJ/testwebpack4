const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV,

  entry: path.join(__dirname, '../src/index.js'),

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist')
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: '[name].[hash:8].[ext]'
          }
        }]
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html')
    })
  ],

  optimization: {}
}
