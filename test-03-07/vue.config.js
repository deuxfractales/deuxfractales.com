const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    performance: {
      maxAssetSize: 500000,
    },
    plugins: [
    ],
  },
  devServer: {
    proxy: {
      '/db': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/beats': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
}
