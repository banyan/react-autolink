var webpack = require('webpack');

/**
 * This is the Webpack configuration file for production.
 */
module.exports = {
  entry: "./src/react-autolink",

  output: {
    path: __dirname + "/build/",
    filename: "react-autolink.js"
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
