const path = require('path')

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build'
  },
  module: {
    loaders: [
      {
        loader: "babel-loader",
        include: [
          path.resolve(__dirname, "src"),
        ],
        test: /\.jsx?$/,
        query: {
          plugins: [
            'transform-runtime',
            'transform-object-rest-spread'
          ],
          presets: [
            'es2015',
            'stage-0'
          ],
        }
      },
    ]
  }

}
