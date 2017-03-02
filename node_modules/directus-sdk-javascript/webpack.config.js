const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: [path.join(__dirname, 'src', 'index.js')],
  output: {
    path: __dirname,
    filename: 'index.js',
    library: 'index.js',
    libraryTarget: 'commonjs2'
  },
  debug: false,
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false
      },
      beautify: true
    })
  ],
  externals: nodeExternals(),
  node: {
    __dirname: true,
    fs: 'empty'
  },
  resolve: {
    root: __dirname,
    modulesDirectories: ['./node_modules']
  }
};
