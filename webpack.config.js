const path = require('path')

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build'
  },
  // resolve: {
  //   alias: {
  //     'react': 'preact-compat',
  //     'react-dom': 'preact-compat',
  //     // Not necessary unless you consume a module using `createClass`
  //     'create-react-class': 'preact-compat/lib/create-react-class'
  //   }
  // },
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
            'transform-object-rest-spread',
            ['transform-react-jsx', { pragma: 'h' }],
            ["module-resolver", {
              "root": ["."],
              "alias": {
                "react": "preact-compat",
                "react-dom": "preact-compat",
                // Not necessary unless you consume a module using `createClass`
                "create-react-class": "preact-compat/lib/create-react-class"
              }
            }]
          ],
          presets: [
            'es2015',
            'stage-0'
          ],
        }
      },
      {
        loader: "style-loader",
        test: /\.(sass|scss)$/,
      },
      {
        loader: "css-loader",
        test: /\.(sass|scss)$/,
      },
      {
        loader: "sass-loader",
        test: /\.(sass|scss)$/,
      },
    ]
  }
}
