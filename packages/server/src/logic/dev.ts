import webpack from 'webpack';
import path from 'path';

export const run = async () => {
  const compiler = webpack({
    entry: path.resolve(
      path.dirname("'../../my-web-project/src/index.tsx'")
    ), // 入口文件
    output: {
      filename: 'webpackdist/bundle.js', // 输出文件名
      path: path.resolve(path.dirname('dist')), // 输出目录
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'], // 自动解析文件后缀
    },
    mode: 'production', // 模式（production 或 development）
  });

  console.log('run');
  // 执行构建
  compiler.run((err: any, stats: any) => {
    if (err) {
      console.error('Webpack build failed:', err);
      return;
    }

    console.log(
      stats.toString({
        colors: true, // 输出带颜色的日志
        modules: false, // 隐藏模块信息
        children: false, // 隐藏子级信息
        chunks: false, // 隐藏 chunk 信息
        chunkModules: false, // 隐藏 chunk 模块信息
      })
    );

    if (stats.hasErrors()) {
      console.error('Webpack build completed with errors.');
    } else {
      console.log('Webpack build completed successfully!');
    }
  });
};
