const path = require('path')
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');


module.exports = {
  entry: './src/app.jsx',
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
            'transform-object-rest-spread',
            'transform-flow-strip-types',
            'syntax-flow',
            ['transform-react-jsx'],
            // ['transform-react-jsx', { pragma: 'h' }],
            // ["module-resolver", {
            //   "root": ["."],
            //   "alias": {
            //     "react": "preact-compat",
            //     "react-dom": "preact-compat",
            //     // Not necessary unless you consume a module using `createClass`
            //     "create-react-class": "preact-compat/lib/create-react-class"
            //   }
            // }]
          ],
          presets: [
            'es2015',
            'stage-0',
            'flow'
          ],
        }
      },
      {
        loader: "style-loader",
        test: /\.(sass|scss|css)$/,
      },
      {
        loader: "css-loader",
        test: /\.(sass|scss|css)$/,
      },
      {
        loader: "sass-loader",
        test: /\.(sass|scss|css)$/,
      },
    ]
  },
  plugins: [
    new FlowBabelWebpackPlugin(),
  ]
}
