var path    = require("path");
var webpack = require("webpack");

let vendorModules = /node_modules/;

module.exports = {
  devtool: "eval-source-map",

  entry: {
    app: [
      "./src/main.js",
      "webpack-hot-middleware/client"
    ]
  },

  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "./build"),
    publicPath: "/build/"
  },

  module: {
    loaders: [
      { test: /\.js?$/, loaders: ['babel'], include: path.join(__dirname, 'src'), exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader?sourceMap', include: path.join(__dirname, 'src/styles') },
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
