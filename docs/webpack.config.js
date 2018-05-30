const path = require('path')

module.exports = {
  devtool: 'eval-source-map',
  module: {
    rules: [
      { test: /\.jsx$/, use: 'raw-loader' },
      { test: /\.md$/, use: 'raw-loader' },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    alias: {
      vulpes: path.join(__dirname, '..', 'src'),
    },
  },
}
