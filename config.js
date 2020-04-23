const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    // print: './src/print.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  module: {
    // loader 让 webpack 能够去处理那些非 JavaScript 文件
    rules: [
      {
        test: /\.css$/,
        // style-loader必须在css-loader之前，因为loader的执行顺序是从右到左，从下往上的
        use: [
          "style-loader",
          "css-loader"
        ],
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[hash].[ext]",
              outputPath: "images/",
            },
          },
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },

    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8090,
    open: true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src')
    }
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.join(__dirname, './src/index.html'),
    filename: 'index.html' // 生成的内存中首页的名称
  })]
}