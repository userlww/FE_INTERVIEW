const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: {
    index: {
      import: './src/index.js',
      dependOn: 'shared'
    },
    print: {
      import: './src/print.js',
      dependOn: 'shared'
    },
    shared: 'lodash'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'development'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css/i,
        use: [
          'style-loader', 'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif$)/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf$)/i,
        type: 'asset/resource'
      },
      {
        test: /\.(csv|tsv)/,
        use: ['csv-loader']
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader']
      }
    ]
  },
  devServer: {
    static: './dist'
  },
  optimization: {
    runtimeChunk: 'single'
  }
};
