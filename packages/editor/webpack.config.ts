
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import path from 'path'

export default {
  mode: 'development',
  entry: './src/main.tsx',
  output: {
    path: __dirname + '/dist',
    filename: 'index.js'
  },
  devtool: "eval-source-map",
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.tsx', '.json'], // 添加常用扩展名
  },
  // devtool:"source-map",
  // optimization: {
  //   minimize: true,
  //   minimizer: [

  //     // new WebpackBundleAnalyzer()
  // ],
  // },
  module: {
    noParse: /@rio/g,
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          'postcss-loader' // 使用 PostCSS 处理 CSS
        ],
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          'postcss-loader' // 使用 PostCSS 处理 CSS
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/public/index.html"
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
    hot: true
  },
  stats: {
    colors: true,
    chunks: false,
    modules: false,
  }
}

