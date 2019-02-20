const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const serverConfig = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/index.js'],
  target: 'node',
  node: {
    __dirname: true,
  },
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'build/index.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: 'babel-loader'
          },
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    })
  ],
  devtool: 'source-map',
}

module.exports = [serverConfig]