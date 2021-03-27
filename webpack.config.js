const path = require('path');


module.exports = {
  entry: "./source/js/main.js",
  output: {
    path:path.resolve(__dirname, "./build/js"),
    filename: "main.bundle.js",
  },
  devtool: 'source-map'
}
