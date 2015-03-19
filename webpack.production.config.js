var webpack = require('webpack');

/**
 * This is the Webpack configuration file for production.
 */
module.exports = {
  entry: "./src/react-autolink",

  output: {
    library: 'ReactAutolink',
    libraryTarget: 'umd',
    path: __dirname + "/dist/",
    filename: "react-autolink.js"
  },

  externals: [
    {
      "react": {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      }
    }
  ],

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
