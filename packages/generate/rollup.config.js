
import rollupConfig from '@rioe/common/rollup';

export default rollupConfig.map(config => {
    return  {
      ...config,
      input: './src/index.ts',
      plugins: [...config.plugins]
  };
})