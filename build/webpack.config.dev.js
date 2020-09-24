const { merge } = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  devServer: {
    port: 3000,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    historyApiFallback: true,
    hot: true,
    progress: true
  },

  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  optimization: {
    noEmitOnErrors: false
  }
})
