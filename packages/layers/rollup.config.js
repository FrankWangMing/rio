import image from '@svgr/rollup';

import config from '@rio/rollup-config/rollup';

export default {
  ...config,
  input: './src/index.tsx',
  plugins: [...config.plugins, image()],
};
