import image from '@svgr/rollup';


import rollupConfig from '@rioe/common/rollup';

export default rollupConfig.map(config => {
    return  {
      ...config,
      input: './src/index.tsx',
      plugins: [...config.plugins, image()]
  };
})