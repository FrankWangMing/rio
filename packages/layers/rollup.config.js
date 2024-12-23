import image from '@svgr/rollup';

import config from '../../rollup.config.js';
export default config.map(config => {
    return  {
      ...config,
      input: './src/index.ts',
      plugins: [...config.plugins, image()]
  };
})