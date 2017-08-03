var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',      
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/, 
        loader: 'style-loader!css-loader'
      }
      // { 
      //   test: /\.png$/, 
      //   loader: "url-loader?limit=100000" 
      // },
      // { 
      //   test: /\.jpg$/, 
      //   loader: "file-loader" 
      // },
      // {
      //   test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
      //   loader: 'url?limit=10000&mimetype=application/font-woff'
      // },
      // {
      //   test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
      //   loader: 'url?limit=10000&mimetype=application/octet-stream'
      // },
      // {
      //   test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
      //   loader: 'file'
      // },
      // {
      //   test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
      //   loader: 'url?limit=10000&mimetype=image/svg+xml'
      // }
    ]
  }
};