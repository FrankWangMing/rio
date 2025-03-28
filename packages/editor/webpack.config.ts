import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';

export default {
  mode: 'development',
  entry: './src/main.tsx',
  output: {
    path: __dirname + '/dist',
    filename: 'editor.js',
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.tsx', '.json'], // 添加常用扩展名
    alias: {
      '@rioe': path.resolve(__dirname, '../'), // 设置别名
    },
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
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader', // 使用 PostCSS 处理 CSS
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader', // 使用 PostCSS 处理 CSS
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      }
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', to: '' }],
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    // static: {
    //   directory: path.join(__dirname, 'public'),
    // },
    port: 9000,
    hot: true,
  },
  stats: {
    colors: true,
    chunks: false,
    modules: false,
  },
};
