const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'demo_d3': './src/demo_d3/index.js',
    'demo_d2b': './src/demo_d2b/index.js',
    'demo_vue_d2b': './src/demo_vue_d2b/index.js',
    'index': './src/index/index.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules:[
      {
        test:/\.(s*)css$/,
        use:['style-loader','css-loader', 'sass-loader'],
        exclude: /node_modules/
      },
      {
        test:/\.js$/,
        use:['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['index'],
      filename: 'index.html',
      template: './src/index/index.html'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['index', 'demo_d3'],
      filename: 'demo_d3.html',
      template: './src/demo_d3/index.html'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['index', 'demo_d2b'],
      filename: 'demo_d2b.html',
      template: './src/demo_d2b/index.html'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['index', 'demo_vue_d2b'],
      filename: 'demo_vue_d2b.html',
      template: './src/demo_vue_d2b/index.html'
    })
  ]
};
