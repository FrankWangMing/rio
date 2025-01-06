const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;


module.exports = {
  mode: 'development',
  entry: './src/main.tsx',
  output: {
    path: __dirname + '/dist',
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // 支持的文件扩展名
  },
  // devtool:"source-map",
  // optimization: {
  //   minimize: true,
  //   minimizer: [

  //     // new WebpackBundleAnalyzer()
  // ],
  // },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader",
          ],
        exclude: /node_modules/
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:__dirname + "/public/index.html"
    }),
    new TerserPlugin(),
    new CompressionPlugin(),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    // static: {
    //   directory: path.join(__dirname, 'public'),
    // },
    compress: true,
    port: 9000,
    hot:true
  },
  stats:{
    colors:true,
    chunks:false,
    modules:false,
  }
}

