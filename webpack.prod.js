const path = require('path');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    app: './src/scripts/form.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  output: {
    filename: 'simpleval.dist.js',
    library: 'SimpleVal',
    libraryExport: 'default',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist')
  }
};