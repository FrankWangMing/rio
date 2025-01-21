import rollupConfig from '@rioe/common/rollup';


export default rollupConfig.map(config => {
    return  {
      ...config,
      input: './src/index.ts',
      plugins: [
        ...config.plugins],
      watch: {
        include: 'src/**',  // 监听 `src` 目录中的文件
        exclude: 'node_modules/**',  // 排除 `node_modules` 目录
      },
    };
})