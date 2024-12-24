import config from '../../rollup.config.js';
export default config.map(config => {
    console.log(config)
    return {...config,input: './src/index.ts',};
})