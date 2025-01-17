import path from 'path';
export default {
  entry: path.resolve(process.cwd(), 'my-web-project'), // 入口文件
  output: {
    filename: 'bundle.js', // 输出文件名
    path: path.dirname('dist'), // 输出目录
  },
  mode: 'production', // 模式（production 或 development）
};
