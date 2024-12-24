import image from '@svgr/rollup';

import config from '../../rollup.config.js';
export default config.map(config => {
    return  {
      ...config,
      input: './src/index.tsx',
      plugins: [...config.plugins, image()]
  };
})