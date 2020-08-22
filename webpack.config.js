const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const globals = require('./globals/client')
const serverConfig = require('./config/server.config')
const pathConfig = require('./config/path.config')

module.exports = {
  entry: [
    'react-hot-loader/patch',
    pathConfig.src,
  ],
  devServer: {
    historyApiFallback: true,
    open: true,
    contentBase: pathConfig.build,
    compress: true,
    hot: true,
    host: 'localhost',
    quiet: true,
    port: serverConfig.ports.webpack,
    proxy: {
      "/favicon.ico": `http://localhost:${serverConfig.ports.dev}`
    }
  },
  output: {
    path: pathConfig.build,
    filename: 'js/[name].[hash].js',
    publicPath: '/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: 3
              }],
              '@babel/preset-react',
            ],
          }
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|woff|woff2)/i,
        use: ['file-loader']
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: pathConfig.template
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({ ...globals })
  ]
}