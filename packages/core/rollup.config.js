import config from '../../rollup.config.js';
export default config.map(config => {
    return {...config,input: './src/index.tsx',};
})