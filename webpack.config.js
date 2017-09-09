const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = {
  entry: {
    app: ['./src/app.js'],
  },
  output: {
    filename: './build/bundle.js'
  },
  devServer: {
    inline: true
  }
}

config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");

var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
  hot: true
});
server.listen(8080);


module.exports = config
